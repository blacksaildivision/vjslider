class SlideAnimation {
	constructor(sliderElement){
		this.sliderElement = sliderElement;
		this.isAnimating = false;
		this.startAnimating = () => this.isAnimating = true;
		this.stopAnimating = () => this.isAnimating = false;
		this._transitionStart();
		this._transitionEnd();
	}	
	
	_transitionStart(){
        this._startEventListeners().forEach(event => {
        	this.sliderElement.addEventListener(event, this.startAnimating);
        });
	}
	
	_transitionEnd(){
		this._endEventListeners().forEach(event => {
        	this.sliderElement.addEventListener(event, this.stopAnimating);
        });
    }
	
	_startEventListeners(){
		return [
            "MSTransitionStart",
            "msTransitionStart",
            "transitionstart",
            "webkitTransitionStart"
        ];
	}
	
	_endEventListeners(){
		return [
            "MSTransitionEnd",
            "msTransitionEnd",
            "transitionend",
            "webkitTransitionEnd"
        ];
	}
	
	destroy(){
		this._startEventListeners().forEach(event => this.sliderElement.removeEventListener(event, this.startAnimating));
		this._endEventListeners().forEach(event => this.sliderElement.removeEventListener(event, this.stopAnimating));
	}
	
	hasEnded(){
		return !this.isAnimating;
	}
}

module.exports = SlideAnimation;
