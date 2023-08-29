import puppeteer from 'puppeteer';

describe('Multiple slides with clone', () => {
    let browser, page;
    beforeAll(async () => {
        browser = await puppeteer.launch({headless: 'new'});
        page = await browser.newPage();
        await page.goto('http://localhost:8363/demo/multiple-slides-with-clone.html');
    });

    afterAll(async () => {
        await page.close();
        await browser.close();
    });

    test('vjslider clones', async () => {
        expect(await page.$$eval('.vjslider__slide', elements => elements.length)).toBe(36);
    });
});
