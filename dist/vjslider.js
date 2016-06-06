var VJSlider = function (sliderElement) {
    this.sliderElement = sliderElement.children[0];
    this.slides = this.sliderElement.children;
    this.slidesCount = this.slides.length;
    this.currentSlide = 0;
    this.init();
};

VJSlider.prototype = {
    init: function () {
        this._createCarouselPadding();
        this.sliderElement.style.width = this.slides.length * 100 + '%';
        this.slide(2);
    },
    _createCarouselPadding: function () {
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
    },
    slide: function (index) {
        this.currentSlide = index;
        this.sliderElement.classList.add('vjslider__container--animate');
        this.sliderElement.style.transform = 'translate3d(-' + (100 * index / (this.slides.length)) + '%, 0, 0)';
        var self = this;
        if (index > this.slidesCount) {
            setTimeout(function () {
                self.sliderElement.style.transition = 'all 0s';
                self.sliderElement.classList.remove('vjslider__container--animate');
                self.sliderElement.style.transform = 'translate3d(-' + (100 / self.slides.length ) + '%, 0, 0)';
                self.currentSlide = 1;
            }, 300);
        } else {
            if (index <= 0) {
                console.log('mniejsza');
                setTimeout(function () {
                    self.sliderElement.style.transition = 'all 0s';
                    self.sliderElement.classList.remove('vjslider__container--animate');
                    self.sliderElement.style.transform = 'translate3d(-' + (100 * (self.slidesCount) / self.slides.length ) + '%, 0, 0)';
                    self.currentSlide = self.slidesCount;
                }, 300);
            }
        }
    },
    next: function () {
        this.sliderElement.style.transition = 'all 0.3s';
        this.slide(this.currentSlide + 1);

    },
    prev: function () {
        this.sliderElement.style.transition = 'all 0.3s';
        this.slide(this.currentSlide - 1);
    }
};