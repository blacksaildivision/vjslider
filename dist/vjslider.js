var VJSlider=function(e){var t={};function i(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(n,s,function(t){return e[t]}.bind(null,s));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){function n(){return(n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e}).apply(this,arguments)}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}i(1);var l=i(2),o=i(3),a=function(){function e(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};s(this,e),this.sliderElement=t,this.transitionEndCallback=null,this.init(i)}var t,i,a;return t=e,(i=[{key:"init",value:function(e){var t=this;if(this.slides=Array.prototype.slice.call(this.sliderElement.children).filter((function(e){return"none"!==window.getComputedStyle(e).display})),this.slidesCount=this.slides.length,0===this.slidesCount)throw new DOMException("Slider does not contain any children (slides)");this.currentSlide=0,this.options=this._getOptions(e),this.numberOfClones=this.options.numberOfVisibleSlides+1,this._build(),this._createSlideClones(this.numberOfClones),this._transitionEnd(),this.sliderElement.style.width=(this.slides.length+2*this.numberOfClones)/this.options.numberOfVisibleSlides*100+"%",!0===this.options.touchFriendly&&(this.swipe=new l(this.sliderElement,(function(){return t.prev()}),(function(){return t.next()})),this.swipe.init()),!0===this.options.waitForAnimationEnd&&(this.slideAnimation=new o(this.sliderElement)),this.slide(1)}},{key:"slide",value:function(e){var t=this;return!0===this.options.waitForAnimationEnd&&!1===this.slideAnimation.hasEnded()?this.currentSlide:(this.currentSlide=e,this.sliderElement.classList.add("vjslider__slider--animate"),this._moveTo(this.currentSlide),this.currentSlide>this.slidesCount?(this.transitionEndCallback=function(){t.currentSlide=1},this.currentSlide):(this.currentSlide<=0&&(this.transitionEndCallback=function(){t.currentSlide=t.slidesCount}),this.currentSlide))}},{key:"next",value:function(){return this.slide(this.currentSlide+1)}},{key:"prev",value:function(){return this.slide(this.currentSlide-1)}},{key:"destroy",value:function(){var e=this.sliderElement.parentNode,t=e.parentNode;return t.insertBefore(e.firstChild,e),t.removeChild(e),this.sliderElement.classList.remove("vjslider__slider"),this.sliderElement.classList.remove("vjslider__slider--animate"),this.sliderElement.removeAttribute("style"),[].forEach.call(this.sliderElement.querySelectorAll(".vjslider__clone"),(function(e){return e.remove()})),this.slides.forEach((function(e){e.classList.remove("vjslider__slide"),e.removeAttribute("style")})),void 0!==this.swipe&&this.swipe.destroy(),void 0!==this.slideAnimation&&this.slideAnimation.destroy(),this}},{key:"reload",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=null!==e?e:this.options;this.destroy().init(t)}},{key:"_build",value:function(){var e=this.sliderElement.parentNode,t=document.createElement("div");t.className="vjslider",e.replaceChild(t,this.sliderElement),t.appendChild(this.sliderElement),this.sliderElement.classList.add("vjslider__slider");var i=100/(2*this.numberOfClones+this.slidesCount);this.slides.forEach((function(e){e.classList.add("vjslider__slide"),e.style.flexBasis=i+"%"}))}},{key:"_createSlideClones",value:function(e){for(var t=this;this.options.numberOfVisibleSlides>this.slides.length;)this._cloneNodes(this.slides),this.slides=this.slides.concat(this.slides),this.slidesCount=this.slides.length;var i=this.slides.slice(0,e),n=this.slides.slice(-1*e);return i=this._fillMissing(i,e,this.slides[0]),n=this._fillMissing(n,e,this.slides[this.slides.length-1]),this._cloneNodes(i),n.reverse().forEach((function(e){var i=e.cloneNode(!0);i.classList.add("vjslider__clone"),t.sliderElement.insertBefore(i,t.sliderElement.firstChild)})),e}},{key:"_cloneNodes",value:function(e){var t=this;e.forEach((function(e){var i=e.cloneNode(!0);i.classList.add("vjslider__clone"),t.sliderElement.appendChild(i)}))}},{key:"_fillMissing",value:function(e,t,i){for(;e.length<t;)e.push(i);return e}},{key:"_transitionEnd",value:function(){var e=this;["MSTransitionEnd","msTransitionEnd","transitionend","webkitTransitionEnd"].forEach((function(t){e.sliderElement.addEventListener(t,(function(){e._isFunction(e.transitionEndCallback)&&(e.transitionEndCallback=e.transitionEndCallback(),e.sliderElement.classList.remove("vjslider__slider--animate"),e._moveTo(e.currentSlide))}))}))}},{key:"_isFunction",value:function(e){return Boolean(e&&e.constructor&&e.call&&e.apply)}},{key:"_moveTo",value:function(e){this.sliderElement.style.transform="translate3d(-"+this._calculatePosition(e)+"%, 0, 0)"}},{key:"_calculatePosition",value:function(e){return 100*(e+this.numberOfClones-1)/(this.slidesCount+2*this.numberOfClones)}},{key:"_getOptions",value:function(e){return n({numberOfVisibleSlides:1,touchFriendly:!0,waitForAnimationEnd:!0},e)}}])&&r(t.prototype,i),a&&r(t,a),e}();e.exports=a},function(e,t,i){},function(e,t){function i(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var n=function(){function e(t,i,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.element=t,this.swipeLeftEvent=i,this.swipeRightEvent=n,this.x=0,this.pointerDownCallback=this._pointerDown.bind(this),this.pointerUpCallback=this._pointerUp.bind(this),this.isPassiveSupported=this._getPassiveSupport()}var t,n,s;return t=e,(n=[{key:"init",value:function(){var e=this._getEventListenerOptions();this.element.addEventListener("touchstart",this.pointerDownCallback,e),this.element.addEventListener("mousedown",this.pointerDownCallback),this.element.addEventListener("touchend",this.pointerUpCallback,e),this.element.addEventListener("mouseup",this.pointerUpCallback)}},{key:"destroy",value:function(){var e=this._getEventListenerOptions();this.element.removeEventListener("touchstart",this.pointerDownCallback,e),this.element.removeEventListener("mousedown",this.pointerDownCallback),this.element.removeEventListener("touchend",this.pointerUpCallback,e),this.element.removeEventListener("mouseup",this.pointerUpCallback)}},{key:"_getClientX",value:function(e){return void 0!==e.changedTouches?e.changedTouches[0].clientX:e.clientX}},{key:"_pointerDown",value:function(e){this.x=this._getClientX(e)}},{key:"_pointerUp",value:function(e){var t=this._getClientX(e)-this.x;t>100&&this.swipeLeftEvent(),t<-100&&this.swipeRightEvent()}},{key:"_getPassiveSupport",value:function(){var e=!1;try{window.addEventListener("passiveTest",null,Object.defineProperty({},"passive",{get:function(){e=!0}}))}catch(t){e=!1}return e}},{key:"_getEventListenerOptions",value:function(){return!0===this.isPassiveSupported&&{passive:!0}}}])&&i(t.prototype,n),s&&i(t,s),e}();e.exports=n},function(e,t){function i(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var n=function(){function e(t){var i=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.element=t,this.isAnimating=!1,this.startAnimating=function(){return i.isAnimating=!0},this.stopAnimating=function(){return i.isAnimating=!1},this._attachListeners()}var t,n,s;return t=e,(n=[{key:"_attachListeners",value:function(){var e=this;this._startEvents().forEach((function(t){e.element.addEventListener(t,e.startAnimating)})),this._endEvents().forEach((function(t){e.element.addEventListener(t,e.stopAnimating)}))}},{key:"destroy",value:function(){var e=this;this._startEvents().forEach((function(t){return e.element.removeEventListener(t,e.startAnimating)})),this._endEvents().forEach((function(t){return e.element.removeEventListener(t,e.stopAnimating)}))}},{key:"hasEnded",value:function(){return!this.isAnimating}},{key:"_startEvents",value:function(){return["MSTransitionStart","msTransitionStart","transitionstart","webkitTransitionStart"]}},{key:"_endEvents",value:function(){return["MSTransitionEnd","msTransitionEnd","transitionend","webkitTransitionEnd"]}}])&&i(t.prototype,n),s&&i(t,s),e}();e.exports=n}]);