/**
 * Helper class for detecting when animation start and stops
 */
class SlideAnimation {

    /**
     * SlideAnimation constructor
     * @param {Element} element - DOM element to attach pointer listeners to
     */
    constructor(element) {
        // Set properties
        this.element = element;
        this.isAnimating = false;

        // Set bindable functions for changing animation state
        this.startAnimating = () => this.isAnimating = true;
        this.stopAnimating = () => this.isAnimating = false;

        // Attach listeners to animation start and end
        this._attachListeners();
    }

    /**
     * Attach listeners watching for animation
     * @private
     */
    _attachListeners() {
        // Watch for animation start events
        this._startEvents().forEach(event => {
            this.element.addEventListener(event, this.startAnimating);
        });

        // Watch for animation end event
        this._endEvents().forEach(event => {
            this.element.addEventListener(event, this.stopAnimating);
        });
    }

    /**
     * Remove all attached listeners
     * @private
     */
    destroy() {
        this._startEvents().forEach(event => this.element.removeEventListener(event, this.startAnimating));
        this._endEvents().forEach(event => this.element.removeEventListener(event, this.stopAnimating));
    }

    /**
     * Check if animation has ended or it's still running
     * @return {bool}
     */
    hasEnded() {
        return !this.isAnimating;
    }

    /**
     * Get list of start animation events
     */
    _startEvents() {
        return [
            'MSTransitionStart',
            'msTransitionStart',
            'transitionstart',
            'webkitTransitionStart'
        ];
    }

    /**
     * Get list of end animation events
     */
    _endEvents() {
        return [
            'MSTransitionEnd',
            'msTransitionEnd',
            'transitionend',
            'webkitTransitionEnd'
        ];
    }
}

module.exports = SlideAnimation;
