import SlideAnimation from './../../src/js/slide-animation';

describe('SlideAnimation', () => {
    // Prepare dummy element for testing
    const element = jest.fn();
    const attachedListeners = [];
    element.addEventListener = type => attachedListeners.push(type);
    element.removeEventListener = type => attachedListeners.splice(type, 1);
    const slideAnimation = new SlideAnimation(element);

    describe('constructor', () => {
        test('constructed properties', () => {
            expect(slideAnimation).toHaveProperty('element');
            expect(slideAnimation).toHaveProperty('isAnimating');
            expect(slideAnimation).toHaveProperty('startAnimating');
            expect(slideAnimation).toHaveProperty('stopAnimating');

            expect(slideAnimation.element).not.toBeNull();
            expect(slideAnimation.isAnimating).toBe(false);
            expect(slideAnimation.startAnimating).not.toBeNull();
            expect(slideAnimation.stopAnimating).not.toBeNull();
        });

        test('bindable animating functions', () => {
            expect(slideAnimation.isAnimating).toBe(false);
            slideAnimation.startAnimating();
            expect(slideAnimation.isAnimating).toBe(true);
            slideAnimation.stopAnimating();
            expect(slideAnimation.isAnimating).toBe(false);
        });
    });

    describe('init & destroy', () => {
        test('attached listeners', () => {
            expect(attachedListeners).toEqual(expect.arrayContaining([
                'MSTransitionStart',
                'msTransitionStart',
                'transitionstart',
                'webkitTransitionStart',
                'MSTransitionEnd',
                'msTransitionEnd',
                'transitionend',
                'webkitTransitionEnd'
            ]));
        });

        test('removing listeners', () => {
            slideAnimation.destroy();
            expect(attachedListeners.length).toBe(0);
        });
    });

    describe('events', () => {
        test('animation start events', () => {
            const startEvents = slideAnimation._startEvents();
            expect(startEvents.length).toBe(4);
            expect(startEvents).toEqual(expect.arrayContaining([
                'MSTransitionStart',
                'msTransitionStart',
                'transitionstart',
                'webkitTransitionStart'
            ]));
        });

        test('animation end events', () => {
            const endEvents = slideAnimation._endEvents();
            expect(endEvents.length).toBe(4);
            expect(endEvents).toEqual(expect.arrayContaining([
                'MSTransitionEnd',
                'msTransitionEnd',
                'transitionend',
                'webkitTransitionEnd'
            ]));
        });
    });

    describe('hasEnded()', () => {
        test('check if animation has ended', () => {
            expect(slideAnimation.hasEnded()).toBe(true);
            slideAnimation.startAnimating();
            expect(slideAnimation.hasEnded()).toBe(false);
            slideAnimation.stopAnimating();
            expect(slideAnimation.hasEnded()).toBe(true);
        });
    });
});
