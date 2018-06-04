class Swipe {

    constructor(element, swipeLeftEvent, swipeRightEvent) {
        this.element = element;
        this.swipeLeftEvent = swipeLeftEvent;
        this.swipeRightEvent = swipeRightEvent;
        this.x = 0;

        this.pointerDownCallback = this._pointerDown.bind(this);
        this.pointerUpCallback = this._pointerUp.bind(this);
    }

    init() {
        this.element.addEventListener('touchstart', this.pointerDownCallback);
        this.element.addEventListener('mousedown', this.pointerDownCallback);
        this.element.addEventListener('touchend', this.pointerUpCallback);
        this.element.addEventListener('mouseup', this.pointerUpCallback);
    }

    destroy() {
        this.element.removeEventListener('touchstart', this.pointerDownCallback);
        this.element.removeEventListener('mousedown', this.pointerDownCallback);
        this.element.removeEventListener('touchend', this.pointerUpCallback);
        this.element.removeEventListener('mouseup', this.pointerUpCallback);
    }

    _getClientX(event) {
        if (event.changedTouches !== undefined) {
            return event.changedTouches[0].clientX;
        }

        return event.clientX;
    }

    _pointerDown(event) {
        this.x = this._getClientX(event);
    }

    _pointerUp(event) {
        const threshold = 100;
        const currentPosition = this._getClientX(event) - this.x;
        if (currentPosition > threshold) {
            this.swipeLeftEvent();
        }

        if (currentPosition < -threshold) {
            this.swipeRightEvent();
        }
    }
}


module.exports = Swipe;
