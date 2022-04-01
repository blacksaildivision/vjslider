import puppeteer from 'puppeteer';

describe('Demo page', () => {
    let browser, page;
    let slide1, slide2, slide3;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:8363/demo');
    });

    afterAll(async () => {
        await page.close();
        await browser.close();
    });

    beforeAll(async () => {
        await page.goto('http://localhost:8363/demo');
    });

    test('it should get handles to slides', async () => {
        slide1 = await page.$('.vjslider__slide[data-id="1"]');
        slide2 = await page.$('.vjslider__slide[data-id="2"]');
        slide3 = await page.$('.vjslider__slide[data-id="3"]');
        expect(slide1).not.toBeNull();
        expect(slide2).not.toBeNull();
        expect(slide3).not.toBeNull();
    });

    test('it should create slide clones', async () => {
        expect(await page.$$eval('.vjslider__slide', elements => elements.length)).toBe(7);
    });

    test('sliding forward', async () => {
        expect(await slide1.isIntersectingViewport()).toBe(true);
        expect(await slide2.isIntersectingViewport()).toBe(false);
        expect(await slide3.isIntersectingViewport()).toBe(false);
        await Promise.all([
            page.click('[data-next]'),
            page.click('[data-next]'),
            page.click('[data-next]'),
            new Promise(resolve => setTimeout(resolve, 400))
        ]);
        expect(await slide1.isIntersectingViewport()).toBe(false);
        expect(await slide2.isIntersectingViewport()).toBe(true);
        expect(await slide3.isIntersectingViewport()).toBe(false);
    });

    test('sliding forward again', async () => {
        await Promise.all([
            page.click('[data-next]'),
            new Promise(resolve => setTimeout(resolve, 400))
        ]);
        expect(await slide1.isIntersectingViewport()).toBe(false);
        expect(await slide2.isIntersectingViewport()).toBe(false);
        expect(await slide3.isIntersectingViewport()).toBe(true);
    });

    test('sliding backward', async () => {
        await Promise.all([
            page.click('[data-prev]'),
            new Promise(resolve => setTimeout(resolve, 400))
        ]);
        expect(await slide1.isIntersectingViewport()).toBe(false);
        expect(await slide2.isIntersectingViewport()).toBe(true);
        expect(await slide3.isIntersectingViewport()).toBe(false);
    });

    test('swiping left with to small movement', async () => {
        await page.mouse.move(300, 300);
        await page.mouse.down();
        await page.mouse.move(250, 300);
        await page.mouse.up();
        expect(await slide1.isIntersectingViewport()).toBe(false);
        expect(await slide2.isIntersectingViewport()).toBe(true);
        expect(await slide3.isIntersectingViewport()).toBe(false);
    });

    test('swiping left', async () => {
        await page.mouse.move(300, 300);
        await page.mouse.down();
        await page.mouse.move(100, 300);
        await page.mouse.up();
        await new Promise(resolve => setTimeout(resolve, 400));
        expect(await slide1.isIntersectingViewport()).toBe(false);
        expect(await slide2.isIntersectingViewport()).toBe(false);
        expect(await slide3.isIntersectingViewport()).toBe(true);
    });

    test('swiping right with to small movement', async () => {
        await page.mouse.move(300, 300);
        await page.mouse.down();
        await page.mouse.move(350, 300);
        await page.mouse.up();
        expect(await slide1.isIntersectingViewport()).toBe(false);
        expect(await slide2.isIntersectingViewport()).toBe(false);
        expect(await slide3.isIntersectingViewport()).toBe(true);
    });

    test('swiping right', async () => {
        await page.mouse.move(300, 300);
        await page.mouse.down();
        await page.mouse.move(500, 300);
        await page.mouse.up();
        await new Promise(resolve => setTimeout(resolve, 400));
        expect(await slide1.isIntersectingViewport()).toBe(false);
        expect(await slide2.isIntersectingViewport()).toBe(true);
        expect(await slide3.isIntersectingViewport()).toBe(false);
    });

    test('reloading', async () => {
        await Promise.all([
            page.click('[data-reload]'),
            new Promise(resolve => setTimeout(resolve, 400))
        ]);
        expect(await page.$$eval('.vjslider__slide', elements => elements.length)).toBe(10);
        expect(await slide1.isIntersectingViewport()).toBe(true);
        expect(await slide2.isIntersectingViewport()).toBe(true);
    });

    test('destroying vjslider', async () => {
        await page.click('[data-destroy]');
        expect(await page.$('.vjslider__slide--no-animate')).toBeNull();
        expect(await page.$('.vjslider__slider[style*=""]')).toBeNull();
        expect(await page.$('.vjslider__slide[style*=""]')).toBeNull();
    });
});
