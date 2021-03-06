describe('Wait for animation end', () => {

    let slide1, slide2, slide3;

    beforeAll(async () => {
        await page.goto('http://localhost:8363/demo/animation-end.html');
    });

    test('vjslider must be constructed', async () => {
        await expect(page).toMatchElement('.vjslider');
        await expect(page).toMatchElement('.vjslider > .vjslider__slide');
    });

    test('it should get handles to slides', async () => {
        slide1 = await page.$('.vjslider__slide[data-id="1"]');
        slide2 = await page.$('.vjslider__slide[data-id="2"]');
        slide3 = await page.$('.vjslider__slide[data-id="3"]');
        expect(slide1).not.toBeNull();
        expect(slide2).not.toBeNull();
        expect(slide3).not.toBeNull();
    })

    test('sliding forward when waitForAnimationEnd is set to false', async () => {
        expect(await slide1.isIntersectingViewport()).toBe(true);
        expect(await slide2.isIntersectingViewport()).toBe(false);
        expect(await slide3.isIntersectingViewport()).toBe(false);
        page.click('.js-next');
        await new Promise(resolve => setTimeout(resolve, 200));
        page.click('.js-next');
        await new Promise(resolve => setTimeout(resolve, 400));
        expect(await slide1.isIntersectingViewport()).toBe(false);
        expect(await slide2.isIntersectingViewport()).toBe(false);
        expect(await slide3.isIntersectingViewport()).toBe(true);
    });

    test('sliding forward when waitForAnimationEnd is set to true', async () => {
        await page.click('.js-reload');
        expect(await slide1.isIntersectingViewport()).toBe(true);
        expect(await slide2.isIntersectingViewport()).toBe(false);
        expect(await slide3.isIntersectingViewport()).toBe(false);
        page.click('.js-next');
        await new Promise(resolve => setTimeout(resolve, 200));
        page.click('.js-next');
        await new Promise(resolve => setTimeout(resolve, 400));
        expect(await slide1.isIntersectingViewport()).toBe(false);
        expect(await slide2.isIntersectingViewport()).toBe(true);
        expect(await slide3.isIntersectingViewport()).toBe(false);
    });
});
