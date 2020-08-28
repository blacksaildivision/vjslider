/**
 * Helper class for calculating slides position in slider
 */
class Slider {

    /**
     * Slider constructor
     * @param {HTMLElement[]} slides
     * @param {int} numberOfVisibleSlides
     */
    constructor(slides, numberOfVisibleSlides) {
        this.noAnimateClass = 'vjslider__slide--no-animate';
        this.numberOfVisibleSlides = numberOfVisibleSlides;
        this.slides = this._prepareSlides(slides);
        this.pointer = 1;
        this.directions = Object.freeze({
            left: -1,
            right: 1
        });
    }

    /**
     * Wrap HTML elements into objects with additional attributes.
     * x stands for the current position of the slide
     * index is default position of slider
     * @param {HTMLElement[]} slides
     * @return {{el: HTMLElement, x: int, index: int}[]}
     * @private
     */
    _prepareSlides(slides) {
        let index = 0;
        // Wrap HTML elements into object with additional data
        const mappedSlides = slides.map((slide) => {
            this._setMinWidth(slide);
            return {
                el: slide,
                x: 0,
                index: ++index
            };
        });

        // Return reordered slides
        return this._pushLastSlideToBeginning(mappedSlides);
    }

    /**
     * Calculate slide min-width property based on number of slides that should be visible in the viewport
     * @param {HTMLElement} slide
     * @private
     */
    _setMinWidth(slide) {
        slide.style.minWidth = `${100 / this.numberOfVisibleSlides}%`;
    }

    /**
     * Transition last slide to beginning of array without animation
     * @param {{el: HTMLElement, x: int, index: int}[]} slides
     * @return {{el: HTMLElement, x: int, index: int}[]}
     * @private
     */
    _pushLastSlideToBeginning(slides) {
        const lastSlide = slides.pop();
        lastSlide.el.classList.add(this.noAnimateClass);
        lastSlide.x = (-slides.length - 1) * 100;
        lastSlide.el.style.transform = `translate3d(${lastSlide.x}%, 0, 0)`;
        lastSlide.el.offsetHeight;
        lastSlide.el.classList.remove(this.noAnimateClass);
        slides.unshift(lastSlide);
        return slides;
    }

    /**
     * Push slider to next slide
     */
    next() {
        // Increment pointer so it can point to next slide
        this.pointer += 1;

        // If there is no next slide reorder slides
        if (this.slides[this.pointer + this.numberOfVisibleSlides] === undefined) {

            // Get currently displayed slide
            const lastSlide = this.slides[this.pointer - 1 + this.numberOfVisibleSlides];

            // Remove slides from the beginning of array leaving only 2 slides
            const removedSlides = this.slides.splice(0, this.slides.length - this.numberOfVisibleSlides - 1);

            let moved = 0;
            removedSlides.forEach(removedSlide => {

                // If removed slide index is greater that last slide use the same x value
                if (removedSlide.index > lastSlide.index) {
                    removedSlide.x = lastSlide.x;
                    moved++;
                } else {
                    // Number of moved slides + current slide in viewport + number of slides visible in the viewport
                    removedSlide.x = (moved + this.numberOfVisibleSlides + 1) * 100;
                }

                // Add class to hide transition when elements are moved
                removedSlide.el.classList.add(this.noAnimateClass);
            });

            // Reset pointer and reorder slides
            this.pointer = 1;
            this.slides = [...this.slides, ...removedSlides];
        }

        // Move slides to proper direction
        this._move(this.directions.right);
    }

    /**
     * Push slider to previous slide
     */
    prev() {
        // Decrement pointer so it can point to previous slide
        this.pointer -= 1;

        // If there is no previous slide
        if (this.slides[this.pointer - 1] === undefined) {
            // Remove all slides but the slides from the end of the number of visible slides + 1
            const removedSlides = this.slides.splice(this.pointer + this.numberOfVisibleSlides + 1);

            // Calculate position of moved slides
            removedSlides.reverse().forEach(removedSlide => {
                removedSlide.x -= (100 * (this.numberOfVisibleSlides + removedSlides.length + 1));
                removedSlide.el.classList.add(this.noAnimateClass);
            });

            // Merge slides back and calculate new position
            this.slides = [...removedSlides.reverse(), ...this.slides];
            this.pointer = removedSlides.length;
        }

        // Move slides to proper direction
        this._move(this.directions.left);
    }

    /**
     * Update each slides position
     * @param {int} direction
     * @private
     */
    _move(direction) {
        this.slides.forEach((slide) => {
            slide.x -= direction * 100;
            slide.el.style.transform = `translate3d(${slide.x}%, 0, 0)`;
            // If element has no animate class it should be moved to either end of the slider without animation
            if (slide.el.classList.contains(this.noAnimateClass)) {
                slide.el.offsetHeight;
                slide.el.classList.remove(this.noAnimateClass);
            }
        });
    }
}

module.exports = Slider;
