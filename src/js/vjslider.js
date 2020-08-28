import './../scss/vjslider.scss';
import Clones from './clones';
import Slider from './slider';
import Swipe from './swipe';
import SlideAnimation from './slide-animation';

export default class VJSlider {
    constructor(sliderElement, sliderOptions = {}) {
        this.sliderElement = sliderElement;
        this.init(sliderOptions);
    }

    /**
     * Build whole VJSlider
     *
     * @param {Object} sliderOptions
     */
    init(sliderOptions) {
        // Convert DOM elements to array for easier access from JS
        // Remove all invisible slides - (display: none;) to avoid empty spacing
        this.slides = Array.prototype.slice.call(this.sliderElement.children).filter((slide) => {
            return window.getComputedStyle(slide).display !== 'none';
        });

        // Make sure that there are some slides inside the slider
        if (this.slides.length === 0) {
            throw new DOMException('Slider does not contain any children (slides)');
        }

        // Parse options
        this.options = this._getOptions(sliderOptions);

        // Clone slides if it's necessary
        this.clones = new Clones(this.sliderElement);
        this.slides = this.clones.clone(this.slides, this.options.numberOfVisibleSlides);

        // Add classes to elements
        this._addClasses();

        // Attach swipe actions to slider
        if (this.options.touchFriendly === true) {
            this.swipe = new Swipe(this.sliderElement, () => this.prev(), () => this.next());
            this.swipe.init();
        }

        // Attach waiting for animation end
        if (this.options.waitForAnimationEnd === true) {
            this.slideAnimation = new SlideAnimation(this.sliderElement);
        }

        // Add ability to slide slides
        this.slider = new Slider(this.slides, this.options.numberOfVisibleSlides);
    }

    /**
     * Move slider to next slide
     */
    next() {
        if (this.options.waitForAnimationEnd === true && this.slideAnimation.hasEnded() === false) {
            return;
        }
        this.slider.next();
    }

    /**
     * Move slider to previous slide
     */
    prev() {
        if (this.options.waitForAnimationEnd === true && this.slideAnimation.hasEnded() === false) {
            return;
        }
        this.slider.prev();
    }

    /**
     * Revert HTML to original state from before VJSlider
     * @returns {VJSlider}
     */
    destroy() {
        // Remove class from slider element
        this.sliderElement.classList.remove('vjslider');

        // Remove style attribute
        this.sliderElement.removeAttribute('style');

        // Remove clones
        this.clones.remove();

        // Remove classes and attributes from slides
        this.slides.forEach((slide) => {
            slide.classList.remove('vjslider__slide');
            slide.removeAttribute('style');
        });

        // If swipe is attached, destroy it
        if (this.swipe !== undefined) {
            this.swipe.destroy();
        }

        // If slide animation is attached, destroy it
        if (this.slideAnimation !== undefined) {
            this.slideAnimation.destroy();
        }

        return this;
    }

    /**
     * Reload whole slider.
     * It is possible to pass alternative options
     *
     * @param {Object|null} alternativeOptions
     */
    reload(alternativeOptions = null) {
        // If alternative options are used, replace old one. Otherwise use current options.
        const options = (alternativeOptions !== null) ? alternativeOptions : this.options;
        this.destroy().init(options);
    }

    /**
     * Add necessary classes to DOM elements
     * @private
     */
    _addClasses() {
        // Add slider class to main elements
        this.sliderElement.classList.add('vjslider');

        // Add slide class each slide
        this.slides.forEach((slide) => {
            slide.classList.add('vjslider__slide');
        });
    }

    /**
     * Parse options. Fill missing defaults and validate given options if they are correct or not
     * @param {Object} options
     * @returns {Object}
     * @private
     */
    _getOptions(options) {
        const defaultOptions = {
            numberOfVisibleSlides: 1,
            touchFriendly: true,
            waitForAnimationEnd: true
        };
        return Object.assign(defaultOptions, options);
    }
}

