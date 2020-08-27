/**
 * Helper for creating slide clones if there is not enough elements in the slider to provide infinite loop
 */
class Clones {

    /**
     * SlideAnimation constructor
     * @param {Element} sliderElement - DOM element of the slider
     */
    constructor(sliderElement) {
        this.clones = [];
        this.sliderElement = sliderElement;
    }

    /**
     * Clone elements in the slider if necessary
     * @param {Element[]} slides
     * @param {int} numberOfVisibleSlides
     * @return {Element[]}
     */
    clone(slides, numberOfVisibleSlides) {
        // Check if number of slides is covers number of required slides. If so, do not create any clones
        const numberOfSlides = this._getNumberOfSlides(numberOfVisibleSlides);
        if (slides.length >= numberOfSlides) {
            return slides;
        }

        // Clone everything until required number of slides is reached
        while (numberOfSlides > (slides.length + this.clones.length)) {
            this._cloneNodes(slides);
        }

        // Concat slides with clones
        return slides.concat(this.clones);
    }

    /**
     * There should be at least one more additional slide on the left and right side of the number of visible slides
     * It allows continuous scrolling
     * @param {int} numberOfVisibleSlides
     * @return {int}
     * @private
     */
    _getNumberOfSlides(numberOfVisibleSlides) {
        return numberOfVisibleSlides + 2;
    }

    /**
     * Clone entire list of nodes and append them into the slider
     * @param {Element[]} nodesList
     * @private
     */
    _cloneNodes(nodesList) {
        nodesList.forEach((el) => {
            const clone = el.cloneNode(true);
            this.sliderElement.appendChild(clone);
            this.clones.push(clone);
        });
    }

    /**
     * Remove clones from element and cleanup clones array
     */
    remove() {
        this.clones.forEach(clone => clone.remove());
        this.clones = [];
    }
}

module.exports = Clones;
