import Clones from './../../src/js/clones';

describe('Clones', () => {
    document.body.innerHTML = `
        <ul class="element">
            <li data-id="1">1</li>
            <li data-id="2">2</li>
            <li data-id="3">3</li>
            <li data-id="4">4</li>
        </ul>
        <ul class="cloning-nodes">
            <li data-id="1">1</li>
            <li data-id="2">2</li>
        </ul>
           `;
    const clones = new Clones(document.querySelector('.element'));

    describe('constructor', () => {
        test('clones properties', () => {
            expect(clones).toHaveProperty('sliderElement');
            expect(clones).toHaveProperty('clones');
            expect(clones.sliderElement).not.toBeNull();
            expect(clones.clones.length).toBe(0);
        });
    });

    describe('_getNumberOfSlides', () => {
        test('number of slides for 1 visible slide', () => {
            expect(clones._getNumberOfSlides(1)).toBe(3);
        });

        test('number of slides for 2 visible slide', () => {
            expect(clones._getNumberOfSlides(2)).toBe(4);
        });

        test('number of slides for 5 visible slide', () => {
            expect(clones._getNumberOfSlides(5)).toBe(7);
        });
    });

    describe('_cloneNodes', () => {
        const cloningNodes = new Clones(document.querySelector('.cloning-nodes'));
        const nodes = document.querySelectorAll('.cloning-nodes li');
        cloningNodes._cloneNodes(nodes);

        test('it should clone HTML elements', () => {
            expect(document.querySelectorAll('.cloning-nodes li').length).toBe(4);
            expect(document.querySelectorAll('.cloning-nodes li[data-id="1"]').length).toBe(2);
            expect(document.querySelectorAll('.cloning-nodes li[data-id="2"]').length).toBe(2);
        });

        test('it should update the array with clones', () => {
            expect(cloningNodes.clones.length).toBe(2);
        });
    });

    describe('clone', () => {
        test('it should not clone elements if number of slides covers required amount', () => {
            const nodes = [...document.querySelectorAll('.element li')];
            const clonedNodes = clones.clone(nodes, 2);
            expect(clonedNodes).toBe(nodes);
            expect(clones.clones.length).toBe(0);
        });

        test('cloning nodes', () => {
            const nodes = [...document.querySelectorAll('.element li')];
            const clonedNodes = clones.clone(nodes, 4);
            expect(clonedNodes.length).toBe(8);
            expect(clones.clones.length).toBe(4);
            for (let i = 1; i <= 4; i++) {
                expect(document.querySelectorAll(`.element li[data-id="${i}"]`).length).toBe(2);
            }
        });
    });

    describe('remove', () => {
        beforeAll(() => {
            clones.remove();
        });

        test('removing clone DOM elements', () => {
            expect(document.querySelectorAll('.element li').length).toBe(4);
            for (let i = 1; i <= 4; i++) {
                expect(document.querySelectorAll(`.element li[data-id="${1}"]`).length).toBe(1);
            }
        });

        test('clearing clones array', () => {
            expect(clones.clones.length).toBe(0);
        });
    });
});
