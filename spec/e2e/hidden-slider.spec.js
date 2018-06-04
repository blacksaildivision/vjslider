describe('Demo page', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:8363/demo/hidden-slider.html');
    });

    /**
     * This tests makes sure that when slider element is not visible it will not fail with Slider does not contains any children exception
     */
    test('vjslider general markup', async () => {
        await expect(page).toMatchElement('.vjslider');
        await expect(page).toMatchElement('.vjslider > .vjslider__slider');
        await expect(page).toMatchElement('.vjslider > .vjslider__slider > .vjslider__slide');
        let sliderWidth = await page.$eval('.vjslider__slider', slider => slider.style.width);
        sliderWidth = parseFloat(sliderWidth.replace('%', ''));
        expect(sliderWidth).toBe(900);
    });

    test('vjslider clones', async () => {
        await expect(page).toMatchElement('.vjslider__clone');
        await expect(page).toMatchElement('.carousel__slide--blue.vjslider__clone');
        await expect(page).toMatchElement('.carousel__slide--purple.vjslider__clone');
        await expect(page).toMatchElement('.carousel__slide--pink.vjslider__clone');
        await expect(page).toMatchElement('.carousel__slide--green.vjslider__clone');
        await expect(page).not.toMatchElement('.carousel__slide--hidden.vjslider__clone');
        expect(await page.$$eval('.vjslider__clone', elements => elements.length)).toBe(4);
    });
});
