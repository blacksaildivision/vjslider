import puppeteer from 'puppeteer';

describe('Single slide page', () => {
    let browser, page;
    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:8363/demo/single-slide.html');
    });

    afterAll(async () => {
        await page.close();
        await browser.close();
    });

    test('vjslider general markup', async () => {
        expect(await page.$('.vjslider')).not.toBeNull();
        expect(await page.$('.vjslider > .vjslider__slide')).not.toBeNull();
    });

    test('vjslider clones', async () => {
        expect(await page.$$eval('.vjslider__slide', elements => elements.length)).toBe(3);
    });
});
