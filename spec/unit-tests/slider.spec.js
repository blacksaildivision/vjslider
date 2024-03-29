import Slider from './../../src/js/slider';

describe('Slider', () => {
    document.body.innerHTML = `
        <ul class="slider">
            <li data-id="4"><a href="#">4</a></li>
            <li data-id="1"><button>1</button></li>
            <li data-id="2"><a href="#">2</a></li>
            <li data-id="3"><button>3</button></li>
            <li data-id="4"><a href="#">4</a></li>
            <li data-id="1"><button>1</button></li>
        </ul>
           `;
    const slides = [...document.querySelectorAll('.slider li')];
    const slider = new Slider(document.querySelector('.slider'), slides, 2);

    describe('constructor', () => {
        test('slider properties', () => {
            expect(slider).toHaveProperty('slider', document.querySelector('.slider'));
            expect(slider).toHaveProperty('slides', [...document.querySelectorAll('.slider li')]);
            expect(slider).toHaveProperty('numberOfVisibleSlides', 2);
            expect(slider).toHaveProperty('currentSlide', 1);
            expect(slider).toHaveProperty('isAnimating', false);
            expect(slider).toHaveProperty('animateClassName', 'vjslider__slider--animate');
            expect(slider).toHaveProperty('focusableElementsSelector', 'a[href],button');
        });
    });

    describe('_addStyles', () => {
        test('it should add proper flex basis to each slide', () => {
            [...document.querySelectorAll('.slider li')].forEach(slide => {
                expect(slide.style.flexBasis).toBe('50%');
            });
        });

        test('it should add proper width to slider element', () => {
            expect(document.querySelector('.slider').style.width).toBe('300%');
        });
    });

    describe('_updateSliderPosition', () => {
        test.each([
            {slideIndex: 1, expectedPosition: '-33.333333333333336%'},
            {slideIndex: 2, expectedPosition: '-50%'},
            {slideIndex: 3, expectedPosition: '-66.66666666666667%'},
            {slideIndex: 4, expectedPosition: '-83.33333333333333%'},
            {slideIndex: 5, expectedPosition: '-100%'},
        ])('it should set proper position when current slide is set to $slideIndex',
            ({slideIndex, expectedPosition}) => {
                slider.currentSlide = slideIndex;
                slider._updateSliderPosition();
                expect(document.querySelector('.slider').style.transform).toBe(`translate3d(${expectedPosition},0,0)`);
            });
    });

    describe('_animationEnd', () => {
        beforeEach(() => document.querySelector('.slider').classList.add(slider.animateClassName));

        test('it should move to the first slide when there is no more slides at the end of the slider', () => {
            slider.currentSlide = 5;
            document.querySelector('.slider').dispatchEvent(new Event('transitionend'));
            expect(slider.currentSlide).toBe(1);
            expect(document.querySelector('.slider').style.transform).toBe('translate3d(-33.333333333333336%,0,0)');
            expect(document.querySelector('.slider').classList.contains(slider.animateClassName)).toBe(false);
        });

        test('it should move to the last slide when there is no more slides at the beginning of the slider', () => {
            slider.currentSlide = 0;
            document.querySelector('.slider').dispatchEvent(new Event('transitionend'));
            expect(slider.currentSlide).toBe(2);
            expect(document.querySelector('.slider').style.transform).toBe('translate3d(-50%,0,0)');
            expect(document.querySelector('.slider').classList.contains(slider.animateClassName)).toBe(false);
        });
    });

    describe('move', () => {
        beforeAll(() => slider.currentSlide = 1);

        test('it should not update the slider if previous animation did not finish', () => {
            document.querySelector('.slider').dispatchEvent(new Event('transitionstart'));
            expect(slider.currentSlide).toBe(1);
            slider.move(1);
            expect(slider.currentSlide).toBe(1);
        });

        test('it should move slider to the next slide when positive value is given', () => {
            document.querySelector('.slider').dispatchEvent(new Event('transitionend'));
            expect(slider.currentSlide).toBe(1);
            slider.move(1);
            expect(slider.currentSlide).toBe(2);
            expect(document.querySelector('.slider').style.transform).toBe('translate3d(-50%,0,0)');
        });

        test('it should move slider to the previous slide when negative value is given', () => {
            expect(slider.currentSlide).toBe(2);
            slider.move(-1);
            expect(slider.currentSlide).toBe(1);
            expect(document.querySelector('.slider').style.transform).toBe('translate3d(-33.333333333333336%,0,0)');
        });
    });

    describe('_updateTabindex', () => {
        beforeAll(() => {
            slider.currentSlide = 1;
            slider._updateTabindex();
        });

        test('visible slides should not have tabindex nor aria-hidden attributes', () => {
            expect(document.querySelector('.slider li:nth-child(3)').getAttribute('aria-hidden')).toBeNull();
            expect(document.querySelector('.slider li:nth-child(4)').getAttribute('aria-hidden')).toBeNull();
            expect(document.querySelector('.slider li:nth-child(3) a').getAttribute('tabindex')).toBeNull();
            expect(document.querySelector('.slider li:nth-child(4) button').getAttribute('tabindex')).toBeNull();
        });

        test('hidden slides should have negative tabindex and aria-hidden attributes', () => {
            expect(document.querySelectorAll('.slider li[aria-hidden="true"]').length).toBe(4);
            expect(document.querySelectorAll('.slider li *[tabindex="-1"]').length).toBe(4);
        });
    });

    describe('destroy', () => {
        beforeAll(() => slider.destroy());

        test('it should clean up slides elements', () => {
            [...document.querySelectorAll('.slider li')].forEach(slide => {
                expect(slide.hasAttribute('style')).toBe(false);
                expect(slide.hasAttribute('aria-hidden')).toBe(false);
            });
            expect(document.querySelectorAll('.slider li *[tabindex="-1"]').length).toBe(0);
            expect(slider.slides.length).toBe(0);
        });

        test('it should clean up slider element', () => {
            expect(document.querySelector('.slider').hasAttribute('style')).toBe(false);
            expect(document.querySelector('.slider').classList.contains(slider.animateClassName)).toBe(false);
            expect(slider.slider).toBeNull();
        });
    });
});
