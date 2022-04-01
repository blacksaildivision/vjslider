/**
 * Helper for creating slide clones if there is not enough elements in the slider to provide infinite loop
 */
export default class Clones {

    /**
     * Clones constructor
     * @param {HTMLElement} sliderElement - DOM element of the slider
     */
    constructor(sliderElement) {
        this.clones = [];
        this.sliderElement = sliderElement;
    }

    /**
     * Clone entire list of nodes and append them into the slider
     * @param {HTMLElement[]} nodesList
     * @param {boolean} append
     * @private
     */
    _cloneNodes(nodesList, append = true) {
        const newClones = [];
        nodesList.forEach((el) => {
            const clone = el.cloneNode(true);
            this.clones.push(clone);
            newClones.push(clone);
            if (append === true) {
                this.sliderElement.appendChild(clone);
            } else {
                this.sliderElement.insertBefore(clone, this.sliderElement.firstChild);
            }
        });
        return newClones;
    }

    /**
     * Clone elements to provide infinite slider
     * @param {HTMLElement[]} slides
     * @param {number} numberOfVisibleSlides
     * @return {HTMLElement[]}
     */
    clone(slides, numberOfVisibleSlides) {
        // Make sure that there are enough slides available for displaying more than single slide
        // Clone everything until required number of slides is reached
        while (numberOfVisibleSlides > (slides.length + this.clones.length)) {
            this._cloneNodes(slides);
        }
        slides = slides.concat(this.clones);

        // Clone first and last elements
        const firstClones = this._cloneNodes(slides.slice(0, numberOfVisibleSlides));
        const lastClones = this._cloneNodes(slides.slice(-1 * numberOfVisibleSlides).reverse(), false);
        return lastClones.concat(slides).concat(firstClones);
    }

    /**
     * Remove clones from element and cleanup clones array
     */
    destroy() {
        this.clones.forEach(clone => clone.remove());
        this.clones = [];
    }
}
