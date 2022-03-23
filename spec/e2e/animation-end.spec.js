import puppeteer from 'puppeteer';

describe('Wait for animation end', () => {
    let browser, page;
    let slide1, slide2, slide3;
    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:8363/demo/animation-end.html');
    });

    afterAll(async () => {
        await page.close();
        await browser.close();
    });

    test('slides should exist', async () => {
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
        await page.click('[data-next]');
        await page.click('[data-next]');
        await new Promise(resolve => setTimeout(resolve, 400));
        expect(await slide1.isIntersectingViewport()).toBe(false);
        expect(await slide2.isIntersectingViewport()).toBe(false);
        expect(await slide3.isIntersectingViewport()).toBe(true);
    });

    test('sliding forward when waitForAnimationEnd is set to true', async () => {
        await Promise.all([
            page.click('[data-reload]'),
            new Promise(resolve => setTimeout(resolve, 400))
        ])
        expect(await slide1.isIntersectingViewport()).toBe(true);
        expect(await slide2.isIntersectingViewport()).toBe(false);
        expect(await slide3.isIntersectingViewport()).toBe(false);
        await page.click('[data-next]');
        await page.click('[data-next]');
        await new Promise(resolve => setTimeout(resolve, 400));
        expect(await slide1.isIntersectingViewport()).toBe(false);
        expect(await slide2.isIntersectingViewport()).toBe(true);
        expect(await slide3.isIntersectingViewport()).toBe(false);
    });
});
