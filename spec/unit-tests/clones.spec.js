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
        <ul class="fill-missing">
            <li data-id="1">1</li>
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

    describe('_cloneNodes', () => {
        const cloningNodes = new Clones(document.querySelector('.cloning-nodes'));

        test('it should clone HTML elements and append them at the end of the slider', () => {
            const nodes = document.querySelectorAll('.cloning-nodes li');
            const clonedNodes = cloningNodes._cloneNodes(nodes);
            expect(clonedNodes.length).toBe(2);
            expect(document.querySelectorAll('.cloning-nodes li').length).toBe(4);
            expect(document.querySelectorAll('.cloning-nodes li[data-id="1"]').length).toBe(2);
            expect(document.querySelectorAll('.cloning-nodes li[data-id="2"]').length).toBe(2);
            expect(document.querySelector('.cloning-nodes li:nth-child(3)')).toBe(clonedNodes[0]);
            expect(document.querySelector('.cloning-nodes li:nth-child(4)')).toBe(clonedNodes[1]);
            expect(cloningNodes.clones.length).toBe(2);
        });

        test('it should clone HTML elements and prepend them at the beginning of the slider', () => {
            const nodes = document.querySelectorAll('.cloning-nodes li:first-child');
            const clonedNodes = cloningNodes._cloneNodes(nodes, false);
            expect(clonedNodes.length).toBe(1);
            expect(document.querySelectorAll('.cloning-nodes li').length).toBe(5);
            expect(document.querySelectorAll('.cloning-nodes li[data-id="1"]').length).toBe(3);
            expect(document.querySelectorAll('.cloning-nodes li[data-id="2"]').length).toBe(2);
            expect(document.querySelector('.cloning-nodes li:first-child')).toBe(clonedNodes[0]);
            expect(cloningNodes.clones.length).toBe(3);
        });
    });

    describe('clone', () => {
        test('it should clone elements to provide enough slides', () => {
            const clones = new Clones(document.querySelector('.fill-missing'));
            const clonedElements = clones.clone([...document.querySelectorAll('.fill-missing li')], 2);
            expect(clonedElements.length).toBe(6);
            expect(clones.clones.length).toBe(5);

        });
    });

    describe('destroy', () => {
        beforeAll(() => {
            clones.destroy();
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
