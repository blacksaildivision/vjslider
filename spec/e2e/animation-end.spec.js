describe('Wait for animation end', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:8363/demo/animation-end.html');
    });

    test('vjslider must be constructed', async () => {
        await expect(page).toMatchElement('.vjslider');
        await expect(page).toMatchElement('.vjslider > .vjslider__slider');
        await expect(page).toMatchElement('.vjslider > .vjslider__slider > .vjslider__slide');
    });

    test('sliding forward when waitForAnimationEnd is set to false', async () => {
        const sliderPosition = await page.$eval('.vjslider__slider', slider => slider.style.transform.match(/translate3d\((-?\d+[.]\d+)/)[1]);
        expect(parseFloat(sliderPosition)).toBe(-22.2222);
        await page.click('.js-next');
        await new Promise((resolve) => setTimeout(resolve, 200));
        await page.click('.js-next');
        const newSliderPosition = await page.$eval('.vjslider__slider', slider => slider.style.transform.match(/translate3d\((-?\d+[.]\d+)/)[1]);
        expect(parseFloat(newSliderPosition)).toBe(-44.4444);
    });

    test('sliding forward when waitForAnimationEnd is set to true', async () => {
        await page.click('.js-reload');
        const sliderPosition = await page.$eval('.vjslider__slider', slider => slider.style.transform.match(/translate3d\((.*?)%/)[1]);
        expect(parseFloat(sliderPosition)).toBe(-20);
        await page.click('.js-next');
        await new Promise((resolve) => setTimeout(resolve, 200));
        await page.click('.js-next');
        const newSliderPosition = await page.$eval('.vjslider__slider', slider => slider.style.transform.match(/translate3d\((.*?)%/)[1]);
        expect(parseFloat(newSliderPosition)).toBe(-30);
    });
});
