describe('Demo page', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:8363/demo');
    });

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

    test('sliding forward', async () => {
        const sliderPosition = await page.$eval('.vjslider__slider', slider => slider.style.transform.match(/translate3d\((-?\d+[.]\d+)/)[1]);
        expect(parseFloat(sliderPosition)).toBe(-22.2222);
        await page.click('.js-next');
        const newSliderPosition = await page.$eval('.vjslider__slider', slider => slider.style.transform.match(/translate3d\((-?\d+[.]\d+)/)[1]);
        expect(parseFloat(newSliderPosition)).toBe(-33.3333);
    });

    test('sliding backward', async () => {
        await page.click('.js-prev');
        const newSliderPosition = await page.$eval('.vjslider__slider', slider => slider.style.transform.match(/translate3d\((-?\d+[.]\d+)/)[1]);
        expect(parseFloat(newSliderPosition)).toBe(-22.2222);
    });

    test('swiping left with to small movement', async () => {
        await page.mouse.move(300, 300);
        await page.mouse.down();
        await page.mouse.move(250, 300);
        await page.mouse.up();
        const sliderPosition = await page.$eval('.vjslider__slider', slider => slider.style.transform.match(/translate3d\((-?\d+[.]\d+)/)[1]);
        expect(parseFloat(sliderPosition)).toBe(-22.2222);
    });

    test('swiping left', async () => {
        await page.mouse.move(300, 300);
        await page.mouse.down();
        await page.mouse.move(100, 300);
        await page.mouse.up();
        const sliderPosition = await page.$eval('.vjslider__slider', slider => slider.style.transform.match(/translate3d\((-?\d+[.]\d+)/)[1]);
        expect(parseFloat(sliderPosition)).toBe(-33.3333);
    });

    test('swiping right with to small movement', async () => {
        await page.mouse.move(300, 300);
        await page.mouse.down();
        await page.mouse.move(350, 300);
        await page.mouse.up();
        const sliderPosition = await page.$eval('.vjslider__slider', slider => slider.style.transform.match(/translate3d\((-?\d+[.]\d+)/)[1]);
        expect(parseFloat(sliderPosition)).toBe(-33.3333);
    });

    test('swiping right', async () => {
        await page.mouse.move(300, 300);
        await page.mouse.down();
        await page.mouse.move(500, 300);
        await page.mouse.up();
        const sliderPosition = await page.$eval('.vjslider__slider', slider => slider.style.transform.match(/translate3d\((-?\d+[.]\d+)/)[1]);
        expect(parseFloat(sliderPosition)).toBe(-22.2222);
    });

    test('reloading', async () => {
        await page.click('.js-reload');
        expect(await page.$$eval('.vjslider__clone', elements => elements.length)).toBe(6);
        let sliderWidth = await page.$eval('.vjslider__slider', slider => slider.style.width);
        sliderWidth = parseFloat(sliderWidth.replace('%', ''));
        expect(sliderWidth).toBe(600);
    });

    test('destroying vjslider', async () => {
        await page.click('.js-destroy');
        await expect(page).not.toMatchElement('.vjslider');
        await expect(page).toMatchElement('.carousel');
        await expect(page).not.toMatchElement('.vjslider__slider');
        await expect(page).not.toMatchElement('.vjslider__slider--animate');
        await expect(page).not.toMatchElement('.carousel[style*=""]');
        await expect(page).not.toMatchElement('.vjslider__clone');
        await expect(page).toMatchElement('.carousel__slide');
        await expect(page).not.toMatchElement('.vjslider__slide');
        await expect(page).not.toMatchElement('.carousel__slide[style*=""]');
    });
});
