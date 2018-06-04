describe('Single slide page', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:8363/demo/single-slide.html');
    });

    test('single slide markup', async () => {
        await expect(page).toMatchElement('.vjslider');
        await expect(page).toMatchElement('.vjslider > .vjslider__slider');
        await expect(page).toMatchElement('.vjslider > .vjslider__slider > .vjslider__slide');
    });

    test('vjslider clones', async () => {
        await expect(page).toMatchElement('.vjslider__clone');
        await expect(page).toMatchElement('.carousel__slide--blue.vjslider__clone');
        expect(await page.$$eval('.carousel__slide--blue.vjslider__clone', elements => elements.length)).toBe(4);
    });
});
