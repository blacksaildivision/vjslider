/**
 * Helper class for detecting left and right swipes
 */
class Swipe {

    /**
     * Swipe constructor
     * @param {Element} element - DOM element to attach pointer listeners to
     * @param {function} swipeLeftEvent - callback when swipe left is detected
     * @param {function} swipeRightEvent - callback when swipe right is detected
     */
    constructor(element, swipeLeftEvent, swipeRightEvent) {
        // Set properties
        this.element = element;
        this.swipeLeftEvent = swipeLeftEvent;
        this.swipeRightEvent = swipeRightEvent;

        // Current position of pointer
        this.x = 0;

        // Creating callback variables for easier adding end removing event listeners
        this.pointerDownCallback = this._pointerDown.bind(this);
        this.pointerUpCallback = this._pointerUp.bind(this);
    }

    /**
     * Init swipe detection by attaching mouse and touch events to main element
     */
    init() {
        this.element.addEventListener("touchstart", this.pointerDownCallback);
        this.element.addEventListener("mousedown", this.pointerDownCallback);
        this.element.addEventListener("touchend", this.pointerUpCallback);
        this.element.addEventListener("mouseup", this.pointerUpCallback);
    }

    /**
     * Remove attached mouse and touch events from main element
     */
    destroy() {
        this.element.removeEventListener("touchstart", this.pointerDownCallback);
        this.element.removeEventListener("mousedown", this.pointerDownCallback);
        this.element.removeEventListener("touchend", this.pointerUpCallback);
        this.element.removeEventListener("mouseup", this.pointerUpCallback);
    }

    /**
     * Helper function for getting clientX position for touch and mouse events
     * @param {Object} event
     * @return {number}
     * @private
     */
    _getClientX(event) {
        // If this is touch event get client X from changedTouches property
        if (event.changedTouches !== undefined) {
            return event.changedTouches[0].clientX;
        }

        // Return clientX for mouse events
        return event.clientX;
    }

    /**
     * Get current X axis position of mouse/touch
     * @param {Object} event
     * @private
     */
    _pointerDown(event) {
        this.x = this._getClientX(event);
    }

    /**
     * Check if swipe was to the left or to the right
     * @param {Object} event
     * @private
     */
    _pointerUp(event) {
        // Threshold is in pixels. Swipe must be at least ${threshold} pixels long in order to execute swipe action.
        // This is helpful when swipe can be a click with slight movement like 1px or so
        const threshold = 100;

        // Calculate current position
        const currentPosition = this._getClientX(event) - this.x;

        // Check if swipe events can be executed
        if (currentPosition > threshold) {
            this.swipeLeftEvent();
        }
        if (currentPosition < -threshold) {
            this.swipeRightEvent();
        }
    }
}


module.exports = Swipe;
