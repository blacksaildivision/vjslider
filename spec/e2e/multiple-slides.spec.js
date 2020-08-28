describe('Multiple slides', () => {

    let slide1, slide2, slide3, slide4;

    beforeAll(async () => {
        await page.goto('http://localhost:8363/demo/multiple-slides.html');
    });

    test('multiple visible slides', async () => {
        await expect(page).toMatchElement('.vjslider');
        await expect(page).toMatchElement('.vjslider > .vjslider__slide');
    });

    test('it should not create any slide clones', async () => {
        expect(await page.$$eval('.vjslider__slide', elements => elements.length)).toBe(5);
    });

    test('it should get handles to slides', async () => {
        slide1 = await page.$('.vjslider__slide[data-id="1"]');
        slide2 = await page.$('.vjslider__slide[data-id="2"]');
        slide3 = await page.$('.vjslider__slide[data-id="3"]');
        slide4 = await page.$('.vjslider__slide[data-id="4"]');
        expect(slide1).not.toBeNull();
        expect(slide2).not.toBeNull();
        expect(slide3).not.toBeNull();
        expect(slide4).not.toBeNull();
    });

    test('sliding forward', async () => {
        expect(await slide1.isIntersectingViewport()).toBe(true);
        expect(await slide2.isIntersectingViewport()).toBe(true);
        expect(await slide3.isIntersectingViewport()).toBe(false);
        expect(await slide4.isIntersectingViewport()).toBe(false);
        page.click('.js-next');
        await new Promise(resolve => setTimeout(resolve, 400));
        expect(await slide1.isIntersectingViewport()).toBe(false);
        expect(await slide2.isIntersectingViewport()).toBe(true);
        expect(await slide3.isIntersectingViewport()).toBe(true);
        expect(await slide4.isIntersectingViewport()).toBe(false);
    });

    test('sliding backward', async () => {
        page.click('.js-prev');
        await new Promise(resolve => setTimeout(resolve, 400));
        expect(await slide1.isIntersectingViewport()).toBe(true);
        expect(await slide2.isIntersectingViewport()).toBe(true);
        expect(await slide3.isIntersectingViewport()).toBe(false);
        expect(await slide4.isIntersectingViewport()).toBe(false);
    });

    test('reloading', async () => {
        await page.click('.js-reload');
        expect(await page.$$eval('.vjslider__slide', elements => elements.length)).toBe(12);
    });
});
