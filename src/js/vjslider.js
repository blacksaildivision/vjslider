class VJSlider { // eslint-disable-line no-unused-vars
    constructor(sliderElement) {
        this.sliderElement = sliderElement;
        this.slides = Array.prototype.slice.call(this.sliderElement.children);
        this.slidesCount = this.slides.length;
        this.currentSlide = 0;
        this.init();
    }


    init() {
        this.build();
        this._createCarouselPadding();
        this.sliderElement.style.width = (this.slides.length + 4) * 100 + '%';
        this.slide(2);
    }

    /**
     * Create necessary HTML elements around slider
     * Add necessary CSS classes to all elements
     */
    build() {
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

    _createCarouselPadding() {
        var firstTwoElements = Array.prototype.slice.call(this.slides, 0, 2),
            lastTwoElements = Array.prototype.slice.call(this.slides, -2),
            self = this;
        firstTwoElements.forEach(function (el) {
            var clone = el.cloneNode(true);
            clone.classList.add('clone');
            self.sliderElement.appendChild(clone);
        });

        lastTwoElements.reverse().forEach(function (el) {
            var clone = el.cloneNode(true);
            clone.classList.add('clone');
            self.sliderElement.insertBefore(clone, self.sliderElement.firstChild);
        });
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