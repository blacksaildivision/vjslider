require('./../scss/vjslider.scss');
import Swipe from './swipe';
import Clones from './clones';
import Slider from './slider';

export default class VJSlider { // eslint-disable-line no-unused-vars

    /**
     * VJSlider constructor
     * @param {HTMLElement} domElement
     * @param {object} sliderOptions
     */
    constructor(domElement, sliderOptions = {}) {
        this.el = domElement;
        this.sliderEl = this.el.querySelector('.vjslider__slider');
        this.transitionEndCallback = null;
        this.init(sliderOptions);
    }

    /**
     * Build whole VJSlider
     * @param {Object} sliderOptions
     */
    init(sliderOptions) {
        // Get all slides
        this.slides = [].slice.call(this.sliderEl.querySelectorAll('.vjslider__slide'));
        if (this.slides.length === 0) {
            throw new DOMException('Slider does not contain any slides (.vjslider__slide)');
        }

        // Parse options
        this.options = this._getOptions(sliderOptions);

        // Prepare clones for infinite slider
        this.clones = new Clones(this.sliderEl);
        this.slides = this.clones.clone(this.slides, this.options.numberOfVisibleSlides);

        // Prepare the slider itself
        this.slider = new Slider(this.sliderEl, this.slides,  this.options.numberOfVisibleSlides);

        // Attach swipe actions to slider
        if (this.options.touchFriendly === true) {
            this.swipe = new Swipe(this.sliderEl, () => this.prev(), () => this.next());
            this.swipe.init();
        }
    }

    /**
     * Move slider to next slide
     */
    next() {
        this.slider.move(1);
    }

    /**
     * Move slider to previous slide
     */
    prev() {
        this.slider.move(-1);
    }

    /**
     * Revert HTML to original state from before VJSlider
     * @returns {VJSlider}
     */
    destroy() {
        // Destroy helper modules
        this.clones.destroy();
        this.slider.destroy();


        // If swipe is attached, destroy it
        if (this.swipe !== undefined) {
            this.swipe.destroy();
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
        // If alternative options are used, replace old one. Otherwise, use current options.
        const options = (alternativeOptions !== null) ? alternativeOptions : this.options;
        this.destroy().init(options);
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
        };
        return Object.assign(defaultOptions, options);
    }
}
