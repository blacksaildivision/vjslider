class VJSlider { // eslint-disable-line no-unused-vars
    constructor(sliderElement) {
        this.sliderElement = sliderElement;
        this.slides = Array.prototype.slice.call(this.sliderElement.children);
        this.slidesCount = this.slides.length;
        this.currentSlide = 0;
        this.init();
    }


    init() {
        this._build();
        this._createSlideClones(2);
        this.sliderElement.style.width = (this.slides.length + 4) * 100 + '%';
        this.slide(2);
    }

    /**
     * Create necessary HTML elements around slider
     * Add necessary CSS classes to all elements
     * @return {undefined}
     * @private
     */
    _build() {
        // Prepare slider wrapper
        const parentElement = this.sliderElement.parentNode,
            sliderWrapper = document.createElement('div');
        sliderWrapper.className = 'vjslider';

        // Insert whole carousel into the wrapper
        parentElement.replaceChild(sliderWrapper, this.sliderElement);
        sliderWrapper.appendChild(this.sliderElement);

        // Add slider class to moving element
        this.sliderElement.classList.add('vjslider__slider');

        // Add slide class to each slide
        this.slides.forEach((slide) => {
            slide.classList.add('vjslider__slide');
        });
    }

    /**
     * Create clones of slides required for infinite animation
     * @param {int} numberOfClones Number of clones to create at the beginning and at the end of the slides.
     * So total number of clones is numberOfClones * 2
     * @return {undefined}
     * @private
     */
    _createSlideClones(numberOfClones) {
        // Get first and last n elements
        let firstElements = this.slides.slice(0, numberOfClones),
            lastElements = this.slides.slice(-1 * numberOfClones);
        // Make sure that arrays with elements contains exact number of clones.
        // For instances if numberOfClones = 2 but this.slides.length = 1
        firstElements = this._fillMissing(firstElements, this.slides[0], numberOfClones);
        lastElements = this._fillMissing(lastElements, this.slides[this.slides.length - 1], numberOfClones);

        // Prepend clones at the beginning of slider
        firstElements.forEach((el) => {
            const clone = el.cloneNode(true);
            clone.classList.add('vjslider__clone');
            this.sliderElement.appendChild(clone);
        });

        // Append clones at the end of the slider
        lastElements.reverse().forEach((el) => {
            const clone = el.cloneNode(true);
            clone.classList.add('vjslider__clone');
            this.sliderElement.insertBefore(clone, this.sliderElement.firstChild);
        });
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

    slide(index) {
        this.currentSlide = index;
        this.sliderElement.classList.add('vjslider__slider--animate');
        this.sliderElement.style.transform = 'translate3d(-' + (100 * index / (this.slides.length + 4)) + '%, 0, 0)';
        var self = this;
        if (index > this.slidesCount) {
            setTimeout(function () {
                self.sliderElement.style.transition = 'all 0s';
                self.sliderElement.classList.remove('vjslider__slider--animate');
                self.sliderElement.style.transform = 'translate3d(-' + (100 / (self.slides.length + 4) ) + '%, 0, 0)';
                self.currentSlide = 1;
            }, 300);
        } else {
            if (index <= 0) {
                setTimeout(function () {
                    self.sliderElement.style.transition = 'all 0s';
                    self.sliderElement.classList.remove('vjslider__slider--animate');
                    self.sliderElement.style.transform = 'translate3d(-' + (100 * (self.slidesCount) / (self.slides.length + 4) ) + '%, 0, 0)';
                    self.currentSlide = self.slidesCount;
                }, 300);
            }
        }
    }

    next() {
        this.sliderElement.style.transition = 'all 0.3s';
        this.slide(this.currentSlide + 1);
    }

    prev() {
        this.sliderElement.style.transition = 'all 0.3s';
        this.slide(this.currentSlide - 1);
    }
}