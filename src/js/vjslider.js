class VJSlider { // eslint-disable-line no-unused-vars
    constructor(sliderElement) {
        this.sliderElement = sliderElement;
        this.slides = Array.prototype.slice.call(this.sliderElement.children);
        this.slidesCount = this.slides.length;
        if (this.slidesCount === 0) {
            throw new DOMException("Slider does not contain any children (slides)");
        }
        this.currentSlide = 0;
        this.numberOfClones = 0;
        this.transitionEndCallback = null;

        this.init();

    }


    init() {
        this._build();
        this.numberOfClones = this._createSlideClones(2);
        this._transitionEnd();
        this.sliderElement.style.width = (this.slides.length + this.numberOfClones * 2) * 100 + "%";
        this.slide(1);
    }

    /**
     * Slide to given slide number
     *
     * @param {int} index Number of slide to go to
     * @return {int} current slide index
     */
    slide(index) {
        this.currentSlide = index;

        // Add class that enables animations
        this.sliderElement.classList.add("vjslider__slider--animate");

        // Move slider position to show given slide
        this._moveTo(this.currentSlide);

        // If slider is outside of the slides range, take care of infinite sliding
        if (this.currentSlide > this.slidesCount) {
            this.transitionEndCallback = () => {
                this.currentSlide = 1;
            };

            return this.currentSlide;
        }
        if (this.currentSlide <= 0) {
            this.transitionEndCallback = () => {
                this.currentSlide = this.slidesCount;
            };
        }

        return this.currentSlide;
    }

    /**
     * Move slider to next slide
     *
     * @return {int} current slide index
     */
    next() {
        return this.slide(this.currentSlide + 1);
    }


    /**
     * Move slider to previous slide
     *
     * @return {int} current slide index
     */
    prev() {
        return this.slide(this.currentSlide - 1);
    }


    /**
     * Create necessary HTML elements around slider
     * Add necessary CSS classes to all elements
     *
     * @return {undefined}
     * @private
     */
    _build() {
        // Prepare slider wrapper
        const parentElement = this.sliderElement.parentNode,
            sliderWrapper = document.createElement("div");
        sliderWrapper.className = "vjslider";

        // Insert whole carousel into the wrapper
        parentElement.replaceChild(sliderWrapper, this.sliderElement);
        sliderWrapper.appendChild(this.sliderElement);

        // Add slider class to moving element
        this.sliderElement.classList.add("vjslider__slider");

        // Add slide class to each slide
        this.slides.forEach((slide) => slide.classList.add("vjslider__slide"));
    }


    /**
     * Create clones of slides required for infinite animation
     * @param {int} numberOfClones Number of clones to create at the beginning and at the end of the slides.
     * So total number of clones is numberOfClones * 2
     * @return {int} number of clones created on one side of the slider. Will always be the same as numberOfClones
     * @private
     */
    _createSlideClones(numberOfClones) {
        // Get first and last n elements
        let firstElements = this.slides.slice(0, numberOfClones),
            lastElements = this.slides.slice(-1 * numberOfClones);
        // Make sure that arrays with elements contains exact number of clones.
        // For instances if numberOfClones = 2 but this.slides.length = 1
        firstElements = this._fillMissing(firstElements, numberOfClones, this.slides[0]);
        lastElements = this._fillMissing(lastElements, numberOfClones, this.slides[this.slides.length - 1]);

        // Prepend clones at the beginning of slider
        firstElements.forEach((el) => {
            const clone = el.cloneNode(true);
            clone.classList.add("vjslider__clone");
            this.sliderElement.appendChild(clone);
        });

        // Append clones at the end of the slider
        lastElements.reverse().forEach((el) => {
            const clone = el.cloneNode(true);
            clone.classList.add("vjslider__clone");
            this.sliderElement.insertBefore(clone, this.sliderElement.firstChild);
        });

        return numberOfClones;
    }

    /**
     * Fill array to given length with given element
     * This is helper function for the clones.
     * @param {Array} arr Array to fill
     * @param {int} filledArrayLength Number of elements that arr should contain
     * @param {*} fillElement Value pushed to array if there are missing elements
     * @returns {Array} Array with length = filledArrayLength
     * @private
     */
    _fillMissing(arr, filledArrayLength, fillElement) {
        while (arr.length < filledArrayLength) {
            arr.push(fillElement);
        }

        return arr;
    }

    /**
     * Attach event listener to slider element
     *
     * @return {undefined}
     * @private
     */
    _transitionEnd() {
        const eventList = [
            "oTransitionEnd",
            "MSTransitionEnd",
            "msTransitionEnd",
            "transitionend",
            "webkitTransitionEnd"
        ];
        eventList.forEach((event) => {
            this.sliderElement.addEventListener(event, () => {
                if (this._isFunction(this.transitionEndCallback)) {
                    // Clear the callback if needed. We want to make sure that it"s executed only once.
                    this.transitionEndCallback = this.transitionEndCallback();

                    // Remove animating class and do magic for infinite sliding.
                    this.sliderElement.classList.remove("vjslider__slider--animate");
                    this._moveTo(this.currentSlide);
                }
            });
        });
    }

    /**
     * Check if passed object is a function
     *
     * @param {*} obj object to check whether it"s callable or not
     * @returns {boolean} true if given object is a function, false otherwise
     * @private
     */
    _isFunction(obj) {
        return Boolean(obj && obj.constructor && obj.call && obj.apply);
    }

    /**
     * Move to given slide by setting position of slider via translate3d
     *
     * @param {int} index slide number
     * @return {undefined}
     * @private
     */
    _moveTo(index) {
        this.sliderElement.style.transform = "translate3d(-" + this._calculatePosition(index) + "%, 0, 0)";
    }


    /**
     * Calculate percentage position for translate
     *
     * @param {int} index slide number
     * @returns {number} percentage position for translate animation
     * @private
     */
    _calculatePosition(index) {
        // 100 * ( slide position ) / ( number of elements in slider )
        return 100 * (index + this.numberOfClones - 1) / (this.slidesCount + this.numberOfClones * 2);
    }


}

module.exports = VJSlider;
