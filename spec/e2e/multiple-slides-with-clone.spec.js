describe('Multiple slides with clone', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:8363/demo/multiple-slides-with-clone.html');
    });

    test('single slide markup', async () => {
        await expect(page).toMatchElement('.vjslider');
        await expect(page).toMatchElement('.vjslider > .vjslider__slider');
        await expect(page).toMatchElement('.vjslider > .vjslider__slider > .vjslider__slide');
    });

    test('vjslider clones', async () => {
        await expect(page).toMatchElement('.vjslider__clone');
        await expect(page).toMatchElement('.carousel__slide--blue.vjslider__clone');
        await expect(page).not.toMatchElement('.carousel__slide--hidden.vjslider__clone');
        // Multiple visible slides with cloned elements. Test has only 3 slides, but total number of visible slides is 12.
        expect(await page.$$eval('.vjslider__clone', elements => elements.length)).toBe(35);
    });

    test('slider width', async () => {
        let sliderWidth = await page.$eval('.vjslider__slider',slider => slider.style.width);
        sliderWidth = parseFloat(sliderWidth.replace('%', ''));
        expect(sliderWidth).toBe(316.667);
    });
});
