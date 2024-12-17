/**
 * Helper class for calculating slide positions
 */
export default class Slider {

    /**
     * Slider constructor
     * @param {HTMLElement} sliderEl
     * @param {HTMLElement[]} slides
     * @param {number} numberOfVisibleSlides
     */
    constructor(sliderEl, slides, numberOfVisibleSlides) {
        this.slider = sliderEl;
        this.slides = slides;
        this.numberOfVisibleSlides = numberOfVisibleSlides;
        this.currentSlide = 1;
        this.isAnimating = false;
        this.animateClassName = 'vjslider__slider--animate';
        this.focusableElementsSelector = 'a[href],button';
        this.animationStartEvent = this._animationStart.bind(this);
        this.animationEndEvent = this._animationEnd.bind(this);
        this._addStyles();
        this._updateSliderPosition();
        this.slider.addEventListener('transitionstart', this.animationStartEvent);
        this.slider.addEventListener('transitionend', this.animationEndEvent);
    }

    /**
     * Add inline styles to various elements
     * @private
     */
    _addStyles() {
        const basis = 100 / this.numberOfVisibleSlides;
        this.slides.forEach(slide => slide.style.flexBasis = `${basis}%`);
        this.slider.style.width = `${this.slides.length / this.numberOfVisibleSlides * 100}%`;
    }

    /**
     * Update slider position on the screen
     * @private
     */
    _updateSliderPosition() {
        // 100 * ( slide position ) / ( number of elements in slider )
        const position = 100 * (this.currentSlide + this.numberOfVisibleSlides - 1) / (this.slides.length);
        this.slider.style.transform = `translate3d(-${position}%,0,0)`;
        this._updateTabindex();
    }

    /**
     * Handler for transitionstart event on slider element
     * @private
     */
    _animationStart() {
        this.isAnimating = true;
    }

    /**
     * Handler for transitionend event on slider element
     * @private
     */
    _animationEnd() {
        this.isAnimating = false;
        // Move to the first slide if there are no more slides at the end of the slider (next action)
        if (this.currentSlide > (this.slides.length - 2 * this.numberOfVisibleSlides)) {
            this.slider.classList.remove(this.animateClassName);
            this.currentSlide = 1;
            this._updateSliderPosition();
        }
        // Move to the last slide if there are no more slides at the beginning of the slider (prev action)
        if (this.currentSlide <= 0) {
            this.slider.classList.remove(this.animateClassName);
            this.currentSlide = this.slides.length - 2 * this.numberOfVisibleSlides;
            this._updateSliderPosition();
        }
    }

    /**
     * Move slider to the next/previous slide.
     * Positive value like 1,2 will move the slider to the next slide.
     * Negative value like -1,-2 will move the slider to the previous slide.
     * @param {number} currentSlideModifier
     */
    move(currentSlideModifier) {
        // Do not execute any action if the previous animation did not finish
        if (this.isAnimating === true) {
            return;
        }
        this.slider.classList.add(this.animateClassName);
        this.currentSlide += currentSlideModifier;
        this._updateSliderPosition();
    }

    /**
     * Add tabindex=-1 to all hidden slides with focusable elements
     * @private
     */
    _updateTabindex() {
        const visibleSlides = this.slides.slice(this.currentSlide + this.numberOfVisibleSlides - 1, this.currentSlide + 2 * this.numberOfVisibleSlides - 1);
        const hiddenSlides = this.slides.filter(x => visibleSlides.indexOf(x) === -1);
        visibleSlides.forEach((visibleSlide) => {
            visibleSlide.removeAttribute('aria-hidden');
            visibleSlide.querySelectorAll(this.focusableElementsSelector).forEach(focusableElement => {
                focusableElement.removeAttribute('tabindex');
            });
        });
        hiddenSlides.forEach((hiddenSlide) => {
            hiddenSlide.setAttribute('aria-hidden', 'true');
            hiddenSlide.querySelectorAll(this.focusableElementsSelector).forEach(focusableElement => {
                focusableElement.tabIndex = -1;
            });
        });
    }

    /**
     * Destroy the slider
     */
    destroy() {
        // Remove classes and style attributes
        this.slides.forEach(slide => {
            slide.removeAttribute('style');
            slide.removeAttribute('aria-hidden');
            slide.querySelectorAll(this.focusableElementsSelector).forEach(focusableElement => {
                focusableElement.removeAttribute('tabindex');
            });
        });
        this.slider.removeAttribute('style');
        this.slider.classList.remove(this.animateClassName);
        // Clean up variables
        this.slides = [];
        this.slider.removeEventListener('transitionstart', this.animationStartEvent);
        this.slider.removeEventListener('transitionend', this.animationEndEvent);
        this.slider = null;
    }
}
