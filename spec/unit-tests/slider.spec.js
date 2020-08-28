import Slider from './../../src/js/slider';

describe('Slider', () => {
    document.body.innerHTML = `
        <ul class="slider">
            <li data-id="1">1</li>
            <li data-id="2">2</li>
            <li data-id="3">3</li>
            <li data-id="4">4</li>
            <li data-id="5">5</li>
        </ul>
           `;
    const slides = [...document.querySelectorAll('.slider li')];
    const slider = new Slider(slides, 2);

    describe('constructor', () => {
        test('slider properties', () => {
            expect(slider).toHaveProperty('numberOfVisibleSlides');
            expect(slider).toHaveProperty('slides');
            expect(slider).toHaveProperty('pointer');
            expect(slider).toHaveProperty('noAnimateClass');
            expect(slider).toHaveProperty('directions');
            expect(slider.numberOfVisibleSlides).toBe(2);
            expect(slider.slides.length).toBe(5);
            expect(slider.pointer).toBe(1);
            expect(slider.noAnimateClass).toBe('vjslider__slide--no-animate');
            expect(slider.directions).toHaveProperty('left');
            expect(slider.directions).toHaveProperty('right');
            expect(slider.directions.left).toBe(-1);
            expect(slider.directions.right).toBe(1);
        });
    });

    describe('_setMinWidth', () => {
        let slide;
        beforeAll(() => {
            slide = document.createElement('div');
        });

        afterAll(() => {
            slider.numberOfVisibleSlides = 2;
        });

        test('calculate width for given number of visible slides', () => {
            for (let i = 1; i <= 10; i++) {
                slider.numberOfVisibleSlides = i;
                slider._setMinWidth(slide);
                expect(slide.style.minWidth).toBe(`${100 / i}%`);
            }
        });
    });

    describe('_pushLastSlideToBeginning', () => {
        let slide1, slide2, slides;
        beforeAll(() => {
            slide1 = document.createElement('div');
            slide2 = document.createElement('div');
            slides = [
                {el: slide1, x: 0, index: 1},
                {el: slide2, x: 0, index: 2},
            ];
        });

        test('if elements are not reordered before function call', () => {
            expect(slides[0].el).toBe(slide1);
            expect(slides[1].el).toBe(slide2);
        });

        test('if elements are reordreded after function call', () => {
            slides = slider._pushLastSlideToBeginning(slides);
            expect(slides[0].el).toBe(slide2);
            expect(slides[1].el).toBe(slide1);
        });

        test('it should recalculate x position for last slide moved to beginning', () => {
            expect(slides[0].x).toBe(-200);
        });

        test('it should set proper translate3d property', () => {
            expect(slides[0].el.style.transform).toBe('translate3d(-200%, 0, 0)');
        });
    });

    describe('_prepareSlides', () => {
        let slides;
        beforeAll(() => {
            slides = [1, 1, 1].fill(document.createElement('div'));
            slides = slider._prepareSlides(slides);
        });

        test('it should move last slide to the beginning of array', () => {
            expect(slides[0].index).toBe(3);
        });

        test('it should set min-width for each slide', () => {
            slides.forEach(slide => expect(slide.el.style.minWidth).toBe('50%'));
        });

        test('it should have required properties', () => {
            slides.forEach(slide => {
                expect(slide).toHaveProperty('el');
                expect(slide).toHaveProperty('x');
                expect(slide).toHaveProperty('index');
            });
        });
    });

    describe('next', () => {
        test('it should have proper slides order', () => {
            expect(slider.slides[0].x).toBe(-500);
            expect(slider.slides[0].index).toBe(5);
            expect(slider.slides[1].x).toBe(0);
            expect(slider.slides[1].index).toBe(1);
            expect(slider.slides[2].x).toBe(0);
            expect(slider.slides[2].index).toBe(2);
            expect(slider.slides[3].x).toBe(0);
            expect(slider.slides[3].index).toBe(3);
            expect(slider.slides[4].x).toBe(0);
            expect(slider.slides[4].index).toBe(4);
            expect(slider.pointer).toBe(1);
        });

        test('it should move the slides to the next without reordering', () => {
            slider.next();
            expect(slider.slides[0].x).toBe(-600);
            expect(slider.slides[0].index).toBe(5);
            expect(slider.slides[1].x).toBe(-100);
            expect(slider.slides[1].index).toBe(1);
            expect(slider.slides[2].x).toBe(-100);
            expect(slider.slides[2].index).toBe(2);
            expect(slider.slides[3].x).toBe(-100);
            expect(slider.slides[3].index).toBe(3);
            expect(slider.slides[4].x).toBe(-100);
            expect(slider.slides[4].index).toBe(4);
            expect(slider.pointer).toBe(2);
        });

        test('it should move the slides to the next with reordering', () => {
            slider.next();
            expect(slider.slides[0].x).toBe(-200);
            expect(slider.slides[0].index).toBe(2);
            expect(slider.slides[1].x).toBe(-200);
            expect(slider.slides[1].index).toBe(3);
            expect(slider.slides[2].x).toBe(-200);
            expect(slider.slides[2].index).toBe(4);
            expect(slider.slides[3].x).toBe(-200);
            expect(slider.slides[3].index).toBe(5);
            expect(slider.slides[4].x).toBe(300);
            expect(slider.slides[4].index).toBe(1);
            expect(slider.pointer).toBe(1);
        });
    });

    describe('prev', () => {
        test('it should reorder slides on moving slider to previous slide', () => {
            slider.prev();
            expect(slider.slides[0].x).toBe(-600);
            expect(slider.slides[0].index).toBe(5);
            expect(slider.slides[1].x).toBe(-100);
            expect(slider.slides[1].index).toBe(1);
            expect(slider.slides[2].x).toBe(-100);
            expect(slider.slides[2].index).toBe(2);
            expect(slider.slides[3].x).toBe(-100);
            expect(slider.slides[3].index).toBe(3);
            expect(slider.slides[4].x).toBe(-100);
            expect(slider.slides[4].index).toBe(4);
            expect(slider.pointer).toBe(2);
        });

        test('it should not reorder slides if the element before is present', () => {
            slider.prev();
            expect(slider.slides[0].x).toBe(-500);
            expect(slider.slides[0].index).toBe(5);
            expect(slider.slides[1].x).toBe(0);
            expect(slider.slides[1].index).toBe(1);
            expect(slider.slides[2].x).toBe(0);
            expect(slider.slides[2].index).toBe(2);
            expect(slider.slides[3].x).toBe(0);
            expect(slider.slides[3].index).toBe(3);
            expect(slider.slides[4].x).toBe(0);
            expect(slider.slides[4].index).toBe(4);
            expect(slider.pointer).toBe(1);
        });
    });

    describe('_move', () => {
        let slides;
        beforeAll(() => {
            const slide1 = document.createElement('div');
            slide1.classList.add('vjslider__slide--no-animate');
            const slide2 = document.createElement('div');
            slides = [
                {el: slide1, x: 0, index: 1},
                {el: slide2, x: 100, index: 2},
            ];
            slider.slides = slides;
        });

        test('updating slide position for next slide', () => {
            slider._move(slider.directions.right);
            expect(slides[0].x).toBe(-100);
            expect(slides[1].x).toBe(0);
            expect(slides[0].el.style.transform).toBe('translate3d(-100%, 0, 0)');
            expect(slides[1].el.style.transform).toBe('translate3d(0%, 0, 0)');
        });

        test('removing no animation classes', () => {
            expect(slides[0].el.classList.contains('vjslider__slide--no-animate')).toBe(false);
        });

        test('updating slide position for previous slide', () => {
            slider._move(slider.directions.left);
            expect(slides[0].x).toBe(0);
            expect(slides[1].x).toBe(100);
            expect(slides[0].el.style.transform).toBe('translate3d(0%, 0, 0)');
            expect(slides[1].el.style.transform).toBe('translate3d(100%, 0, 0)');
        });
    });
});
