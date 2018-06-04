describe('Multiple slides', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:8363/demo/multiple-slides.html');
    });

    test('multiple visible slides', async () => {
        await expect(page).toMatchElement('.vjslider');
        await expect(page).toMatchElement('.vjslider > .vjslider__slider');
        await expect(page).toMatchElement('.vjslider > .vjslider__slider > .vjslider__slide');
    });

    test('vjslider clones', async () => {
        await expect(page).toMatchElement('.vjslider__clone');
        await expect(page).toMatchElement('.carousel__slide--blue.vjslider__clone');
        await expect(page).not.toMatchElement('.carousel__slide--hidden.vjslider__clone');
        expect(await page.$$eval('.vjslider__clone', elements => elements.length)).toBe(6);
    });

    test('slider width', async () => {
        let sliderWidth = await page.$eval('.vjslider__slider', slider => slider.style.width);
        sliderWidth = parseFloat(sliderWidth.replace('%', ''));
        expect(sliderWidth).toBe(550);
    });

    test('sliding forward', async () => {
        const sliderPosition = await page.$eval('.vjslider__slider', slider => slider.style.transform.match(/translate3d\((-?\d+[.]\d+)/)[1]);
        expect(parseFloat(sliderPosition)).toBe(-27.2727);
        await page.click('.js-next');
        const newSliderPosition = await page.$eval('.vjslider__slider', slider => slider.style.transform.match(/translate3d\((-?\d+[.]\d+)/)[1]);
        expect(parseFloat(newSliderPosition)).toBe(-36.3636);
    });

    test('sliding backward', async () => {
        await page.click('.js-prev');
        const newSliderPosition = await page.$eval('.vjslider__slider', slider => slider.style.transform.match(/translate3d\((-?\d+[.]\d+)/)[1]);
        expect(parseFloat(newSliderPosition)).toBe(-27.2727);
    });

    test('reloading', async () => {
        await page.click('.js-reload');
        expect(await page.$$eval('.vjslider__clone', elements => elements.length)).toBe(14);
        let sliderWidth = await page.$eval('.vjslider__slider', slider => slider.style.width);
        sliderWidth = parseFloat(sliderWidth.replace('%', ''));
        expect(sliderWidth).toBe(333.333);
    });
});
