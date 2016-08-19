var VJSlider =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var VJSlider = function () {
	    // eslint-disable-line no-unused-vars
	    function VJSlider(sliderElement) {
	        _classCallCheck(this, VJSlider);

	        this.sliderElement = sliderElement;
	        this.slides = Array.prototype.slice.call(this.sliderElement.children);
	        this.slidesCount = this.slides.length;
	        if (this.slidesCount === 0) {
	            throw new DOMException('Slider does not contain any children (slides)');
	        }
	        this.currentSlide = 0;
	        this.numberOfClones = 0;
	        this.transitionEndCallback = null;

	        this.init();
	    }

	    _createClass(VJSlider, [{
	        key: 'init',
	        value: function init() {
	            this._build();
	            this.numberOfClones = this._createSlideClones(2);
	            this._transitionEnd();
	            this.sliderElement.style.width = (this.slides.length + this.numberOfClones * 2) * 100 + '%';
	            this.slide(1);
	        }

	        /**
	         * Slide to given slide number
	         *
	         * @param {int} index Number of slide to go to
	         * @return {int} current slide index
	         */

	    }, {
	        key: 'slide',
	        value: function slide(index) {
	            var _this = this;

	            this.currentSlide = index;

	            // Add class that enables animations
	            this.sliderElement.classList.add('vjslider__slider--animate');

	            // Move slider position to show given slide
	            this._moveTo(this.currentSlide);

	            // If slider is outside of the slides range, take care of infinite sliding
	            if (this.currentSlide > this.slidesCount) {
	                this.transitionEndCallback = function () {
	                    _this.currentSlide = 1;
	                };

	                return this.currentSlide;
	            }
	            if (this.currentSlide <= 0) {
	                this.transitionEndCallback = function () {
	                    _this.currentSlide = _this.slidesCount;
	                };
	            }

	            return this.currentSlide;
	        }

	        /**
	         * Move slider to next slide
	         *
	         * @return {int} current slide index
	         */

	    }, {
	        key: 'next',
	        value: function next() {
	            return this.slide(this.currentSlide + 1);
	        }

	        /**
	         * Move slider to previous slide
	         *
	         * @return {int} current slide index
	         */

	    }, {
	        key: 'prev',
	        value: function prev() {
	            return this.slide(this.currentSlide - 1);
	        }

	        /**
	         * Create necessary HTML elements around slider
	         * Add necessary CSS classes to all elements
	         *
	         * @return {undefined}
	         * @private
	         */

	    }, {
	        key: '_build',
	        value: function _build() {
	            // Prepare slider wrapper
	            var parentElement = this.sliderElement.parentNode,
	                sliderWrapper = document.createElement('div');
	            sliderWrapper.className = 'vjslider';

	            // Insert whole carousel into the wrapper
	            parentElement.replaceChild(sliderWrapper, this.sliderElement);
	            sliderWrapper.appendChild(this.sliderElement);

	            // Add slider class to moving element
	            this.sliderElement.classList.add('vjslider__slider');

	            // Add slide class to each slide
	            this.slides.forEach(function (slide) {
	                return slide.classList.add('vjslider__slide');
	            });
	        }

	        /**
	         * Create clones of slides required for infinite animation
	         * @param {int} numberOfClones Number of clones to create at the beginning and at the end of the slides.
	         * So total number of clones is numberOfClones * 2
	         * @return {int} number of clones created on one side of the slider. Will always be the same as numberOfClones
	         * @private
	         */

	    }, {
	        key: '_createSlideClones',
	        value: function _createSlideClones(numberOfClones) {
	            var _this2 = this;

	            // Get first and last n elements
	            var firstElements = this.slides.slice(0, numberOfClones),
	                lastElements = this.slides.slice(-1 * numberOfClones);
	            // Make sure that arrays with elements contains exact number of clones.
	            // For instances if numberOfClones = 2 but this.slides.length = 1
	            firstElements = this._fillMissing(firstElements, numberOfClones, this.slides[0]);
	            lastElements = this._fillMissing(lastElements, numberOfClones, this.slides[this.slides.length - 1]);

	            // Prepend clones at the beginning of slider
	            firstElements.forEach(function (el) {
	                var clone = el.cloneNode(true);
	                clone.classList.add('vjslider__clone');
	                _this2.sliderElement.appendChild(clone);
	            });

	            // Append clones at the end of the slider
	            lastElements.reverse().forEach(function (el) {
	                var clone = el.cloneNode(true);
	                clone.classList.add('vjslider__clone');
	                _this2.sliderElement.insertBefore(clone, _this2.sliderElement.firstChild);
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

	    }, {
	        key: '_fillMissing',
	        value: function _fillMissing(arr, filledArrayLength, fillElement) {
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

	    }, {
	        key: '_transitionEnd',
	        value: function _transitionEnd() {
	            var _this3 = this;

	            var eventList = ['oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd', 'transitionend', 'webkitTransitionEnd'];
	            eventList.forEach(function (event) {
	                _this3.sliderElement.addEventListener(event, function () {
	                    if (_this3._isFunction(_this3.transitionEndCallback)) {
	                        // Clear the callback if needed. We want to make sure that it's executed only once.
	                        _this3.transitionEndCallback = _this3.transitionEndCallback();

	                        // Remove animating class and do magic for infinite sliding.
	                        _this3.sliderElement.classList.remove('vjslider__slider--animate');
	                        _this3._moveTo(_this3.currentSlide);
	                    }
	                });
	            });
	        }

	        /**
	         * Check if passed object is a function
	         *
	         * @param {*} obj object to check whether it's callable or not
	         * @returns {boolean} true if given object is a function, false otherwise
	         * @private
	         */

	    }, {
	        key: '_isFunction',
	        value: function _isFunction(obj) {
	            return Boolean(obj && obj.constructor && obj.call && obj.apply);
	        }

	        /**
	         * Move to given slide by setting position of slider via translate3d
	         *
	         * @param {int} index slide number
	         * @return {undefined}
	         * @private
	         */

	    }, {
	        key: '_moveTo',
	        value: function _moveTo(index) {
	            this.sliderElement.style.transform = 'translate3d(-' + this._calculatePosition(index) + '%, 0, 0)';
	        }

	        /**
	         * Calculate percentage position for translate
	         *
	         * @param {int} index slide number
	         * @returns {number} percentage position for translate animation
	         * @private
	         */

	    }, {
	        key: '_calculatePosition',
	        value: function _calculatePosition(index) {
	            // 100 * ( slide position ) / ( number of elements in slider )
	            return 100 * (index + this.numberOfClones - 1) / (this.slidesCount + this.numberOfClones * 2);
	        }
	    }]);

	    return VJSlider;
	}();

	module.exports = VJSlider;

/***/ }
/******/ ]);