describe('Multiple slides with clone', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:8363/demo/multiple-slides-with-clone.html');
    });

    test('single slide markup', async () => {
        await expect(page).toMatchElement('.vjslider');
        await expect(page).toMatchElement('.vjslider > .vjslider__slide');
    });

    test('vjslider clones', async () => {
        expect(await page.$$eval('.vjslider__slide', elements => elements.length)).toBe(15);
    });
});
