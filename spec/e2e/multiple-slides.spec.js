import puppeteer from 'puppeteer';

describe('Multiple slides', () => {
    let browser, page;
    let slide1, slide2, slide3, slide4;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:8363/demo/multiple-slides.html');
    });

    afterAll(async () => {
        await page.close();
        await browser.close();
    });

    test('it should not create any slide clones', async () => {
        expect(await page.$$eval('.vjslider__slide', elements => elements.length)).toBe(10);
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
        await Promise.all([
            page.click('[data-next]'),
            new Promise(resolve => setTimeout(resolve, 400))
        ]);
        expect(await slide1.isIntersectingViewport()).toBe(false);
        expect(await slide2.isIntersectingViewport()).toBe(true);
        expect(await slide3.isIntersectingViewport()).toBe(true);
        expect(await slide4.isIntersectingViewport()).toBe(false);
    });

    test('sliding backward', async () => {
        await Promise.all([
            page.click('[data-prev]'),
            new Promise(resolve => setTimeout(resolve, 400))
        ]);
        expect(await slide1.isIntersectingViewport()).toBe(true);
        expect(await slide2.isIntersectingViewport()).toBe(true);
        expect(await slide3.isIntersectingViewport()).toBe(false);
        expect(await slide4.isIntersectingViewport()).toBe(false);
    });

    test('reloading', async () => {
        await Promise.all([
            page.click('[data-reload]'),
            new Promise(resolve => setTimeout(resolve, 400))
        ]);
        expect(await page.$$eval('.vjslider__slide', elements => elements.length)).toBe(11);
    });
});
