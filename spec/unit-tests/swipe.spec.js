import Swipe from './../../src/js/swipe';

describe('Swipe', () => {
    document.body.innerHTML = '<div class="element">Test</div>';
    const swipeLeftMock = jest.fn();
    const swipeRightMock = jest.fn();
    const swipe = new Swipe(document.querySelector('.element'), swipeLeftMock, swipeRightMock);

    describe('constructor', () => {
        test('swipe properties', () => {
            expect(swipe).toHaveProperty('element');
            expect(swipe).toHaveProperty('swipeLeftEvent');
            expect(swipe).toHaveProperty('swipeRightEvent');
            expect(swipe).toHaveProperty('x');
            expect(swipe).toHaveProperty('pointerDownCallback');
            expect(swipe).toHaveProperty('pointerUpCallback');
            expect(swipe).toHaveProperty('isPassiveSupported');

            expect(swipe.element).not.toBeNull();
            expect(swipe.swipeLeftEvent).not.toBeNull();
            expect(swipe.swipeRightEvent).not.toBeNull();
            expect(swipe.x).toBe(0);
            expect(swipe.pointerDownCallback).not.toBeNull();
            expect(swipe.pointerUpCallback).not.toBeNull();
            expect(swipe.isPassiveSupported).toBe(true);
        });
    });

    describe('init & destroy', () => {
        const elementMock = jest.fn();
        const attachedListeners = [];
        elementMock.addEventListener = type => attachedListeners.push(type);
        elementMock.removeEventListener = type => attachedListeners.splice(type, 1);
        swipe.element = elementMock;

        test('attaching listeners', () => {
            swipe.init();
            expect(attachedListeners).toEqual(expect.arrayContaining(['touchstart', 'touchend', 'mousedown', 'mouseup']));
        });

        test('removing listeners', () => {
            swipe.destroy();
            expect(attachedListeners).toEqual(expect.not.arrayContaining(['touchstart', 'touchend', 'mousedown', 'mouseup']));
            expect(attachedListeners.length).toBe(0);
        });
    });

    describe('_getClientX', () => {
        test('getting clientX on touch event', () => {
            const dummyEvent = {
                changedTouches: [{
                    clientX: 100
                }, {
                    clientX: 200
                }]
            };
            expect(swipe._getClientX(dummyEvent)).toBe(100);
        });

        test('getting clientX on mouse event', () => {
            const dummyEvent = {
                clientX: 300
            };
            expect(swipe._getClientX(dummyEvent)).toBe(300);
        });
    });

    describe('_pointerDown', () => {
        test('setting x property on pointer down action', () => {
            swipe._pointerDown({
                clientX: 400
            });
            expect(swipe.x).toBe(400);
        });
    });

    describe('_pointerUp', () => {
        test('swiping left when there is not enough swipe movement', () => {
            swipe._pointerUp({
                clientX: 450
            });
            expect(swipeLeftMock.mock.calls.length).toBe(0);
            expect(swipeRightMock.mock.calls.length).toBe(0);
        });

        test('swiping left', () => {
            swipe._pointerUp({
                clientX: 650
            });
            expect(swipeLeftMock.mock.calls.length).toBe(1);
            expect(swipeRightMock.mock.calls.length).toBe(0);
        });

        test('swiping right when there is not enough swipe movement', () => {
            swipe._pointerUp({
                clientX: 380
            });
            expect(swipeLeftMock.mock.calls.length).toBe(1);
            expect(swipeRightMock.mock.calls.length).toBe(0);
        });

        test('swiping right', () => {
            swipe._pointerUp({
                clientX: 100
            });
            expect(swipeLeftMock.mock.calls.length).toBe(1);
            expect(swipeRightMock.mock.calls.length).toBe(1);
        });
    });

    describe('_getPassiveSupport', () => {
        test('supported passive option', () => {
            expect(swipe._getPassiveSupport()).toBe(true);
        });

        test('unsupported passive option', () => {
            window.addEventListener = jest.fn().mockImplementation(() => {
                throw new Error('Unsupported');
            });
            expect(swipe._getPassiveSupport()).toBe(false);
            window.addEventListener.mockClear();
        });
    });

    describe('_getEventListenerOptions', () => {
        test('options for browsers with passive support', () => {
            swipe.isPassiveSupported = true;
            expect(swipe._getEventListenerOptions()).toStrictEqual({passive: true});
        });

        test('options for browsers without passive support', () => {
            swipe.isPassiveSupported = false;
            expect(swipe._getEventListenerOptions()).toBe(false);
        });
    });
});
