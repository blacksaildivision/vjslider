var VJSlider;VJSlider=function(){"use strict";var t={213:function(t,e,i){i.d(e,{default:function(){return h}});class s{constructor(t){this.clones=[],this.sliderElement=t}clone(t,e){const i=this._getNumberOfSlides(e);if(t.length>=i)return t;for(;i>t.length+this.clones.length;)this._cloneNodes(t);return t.concat(this.clones)}_getNumberOfSlides(t){return t+2}_cloneNodes(t){t.forEach((t=>{const e=t.cloneNode(!0);this.sliderElement.appendChild(e),this.clones.push(e)}))}remove(){this.clones.forEach((t=>t.remove())),this.clones=[]}}class n{constructor(t,e){this.noAnimateClass="vjslider__slide--no-animate",this.numberOfVisibleSlides=e,this.slides=this._prepareSlides(t),this.pointer=1,this.directions=Object.freeze({left:-1,right:1})}_prepareSlides(t){let e=0;const i=t.map((t=>(this._setMinWidth(t),{el:t,x:0,index:++e})));return this._pushLastSlideToBeginning(i)}_setMinWidth(t){t.style.minWidth=100/this.numberOfVisibleSlides+"%"}_pushLastSlideToBeginning(t){const e=t.pop();return e.el.classList.add(this.noAnimateClass),e.x=100*(-t.length-1),e.el.style.transform=`translate3d(${e.x}%, 0, 0)`,e.el.offsetHeight,e.el.classList.remove(this.noAnimateClass),t.unshift(e),t}next(){if(this.pointer+=1,void 0===this.slides[this.pointer+this.numberOfVisibleSlides]){const t=this.slides[this.pointer-1+this.numberOfVisibleSlides],e=this.slides.splice(0,this.slides.length-this.numberOfVisibleSlides-1);let i=0;e.forEach((e=>{e.index>t.index?(e.x=t.x,i++):e.x=100*(i+this.numberOfVisibleSlides+1),e.el.classList.add(this.noAnimateClass)})),this.pointer=1,this.slides=[...this.slides,...e]}this._move(this.directions.right)}prev(){if(this.pointer-=1,void 0===this.slides[this.pointer-1]){const t=this.slides.splice(this.pointer+this.numberOfVisibleSlides+1);t.reverse().forEach((e=>{e.x-=100*(this.numberOfVisibleSlides+t.length+1),e.el.classList.add(this.noAnimateClass)})),this.slides=[...t.reverse(),...this.slides],this.pointer=t.length}this._move(this.directions.left)}_move(t){this.slides.forEach((e=>{e.x-=100*t,e.el.style.transform=`translate3d(${e.x}%, 0, 0)`,e.el.classList.contains(this.noAnimateClass)&&(e.el.offsetHeight,e.el.classList.remove(this.noAnimateClass))}))}}class r{constructor(t,e,i){this.element=t,this.swipeLeftEvent=e,this.swipeRightEvent=i,this.x=0,this.pointerDownCallback=this._pointerDown.bind(this),this.pointerUpCallback=this._pointerUp.bind(this),this.isPassiveSupported=this._getPassiveSupport()}init(){const t=this._getEventListenerOptions();this.element.addEventListener("touchstart",this.pointerDownCallback,t),this.element.addEventListener("mousedown",this.pointerDownCallback),this.element.addEventListener("touchend",this.pointerUpCallback,t),this.element.addEventListener("mouseup",this.pointerUpCallback)}destroy(){const t=this._getEventListenerOptions();this.element.removeEventListener("touchstart",this.pointerDownCallback,t),this.element.removeEventListener("mousedown",this.pointerDownCallback),this.element.removeEventListener("touchend",this.pointerUpCallback,t),this.element.removeEventListener("mouseup",this.pointerUpCallback)}_getClientX(t){return void 0!==t.changedTouches?t.changedTouches[0].clientX:t.clientX}_pointerDown(t){this.x=this._getClientX(t)}_pointerUp(t){const e=this._getClientX(t)-this.x;e>100&&this.swipeLeftEvent(),e<-100&&this.swipeRightEvent()}_getPassiveSupport(){let t=!1;try{window.addEventListener("passiveTest",null,Object.defineProperty({},"passive",{get:function(){t=!0}}))}catch(e){t=!1}return t}_getEventListenerOptions(){return!0===this.isPassiveSupported&&{passive:!0}}}class o{constructor(t){this.element=t,this.isAnimating=!1,this.startAnimating=()=>this.isAnimating=!0,this.stopAnimating=()=>this.isAnimating=!1,this._attachListeners()}_attachListeners(){this._startEvents().forEach((t=>{this.element.addEventListener(t,this.startAnimating)})),this._endEvents().forEach((t=>{this.element.addEventListener(t,this.stopAnimating)}))}destroy(){this._startEvents().forEach((t=>this.element.removeEventListener(t,this.startAnimating))),this._endEvents().forEach((t=>this.element.removeEventListener(t,this.stopAnimating)))}hasEnded(){return!this.isAnimating}_startEvents(){return["MSTransitionStart","msTransitionStart","transitionstart","webkitTransitionStart"]}_endEvents(){return["MSTransitionEnd","msTransitionEnd","transitionend","webkitTransitionEnd"]}}function l(){return(l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s])}return t}).apply(this,arguments)}class h{constructor(t,e={}){this.sliderElement=t,this.init(e)}init(t){if(this.slides=Array.prototype.slice.call(this.sliderElement.children).filter((t=>"none"!==window.getComputedStyle(t).display)),0===this.slides.length)throw new DOMException("Slider does not contain any children (slides)");this.options=this._getOptions(t),this.clones=new s(this.sliderElement),this.slides=this.clones.clone(this.slides,this.options.numberOfVisibleSlides),this._addClasses(),!0===this.options.touchFriendly&&(this.swipe=new r(this.sliderElement,(()=>this.prev()),(()=>this.next())),this.swipe.init()),!0===this.options.waitForAnimationEnd&&(this.slideAnimation=new o(this.sliderElement)),this.slider=new n(this.slides,this.options.numberOfVisibleSlides)}next(){!0===this.options.waitForAnimationEnd&&!1===this.slideAnimation.hasEnded()||this.slider.next()}prev(){!0===this.options.waitForAnimationEnd&&!1===this.slideAnimation.hasEnded()||this.slider.prev()}destroy(){return this.sliderElement.classList.remove("vjslider"),this.sliderElement.removeAttribute("style"),this.clones.remove(),this.slides.forEach((t=>{t.classList.remove("vjslider__slide"),t.removeAttribute("style")})),void 0!==this.swipe&&this.swipe.destroy(),void 0!==this.slideAnimation&&this.slideAnimation.destroy(),this}reload(t=null){const e=null!==t?t:this.options;this.destroy().init(e)}_addClasses(){this.sliderElement.classList.add("vjslider"),this.slides.forEach((t=>{t.classList.add("vjslider__slide")}))}_getOptions(t){return l({numberOfVisibleSlides:1,touchFriendly:!0,waitForAnimationEnd:!0},t)}}}},e={};function i(s){if(e[s])return e[s].exports;var n=e[s]={exports:{}};return t[s](n,n.exports,i),n.exports}return i.d=function(t,e){for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i(213)}().default;