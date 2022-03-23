document.addEventListener('DOMContentLoaded', function () {
    const slider = new VJSlider(document.querySelector('.vjslider'), sliderOptions);
    let loopInterval = null;

    document.querySelector('[data-prev]')?.addEventListener('click', () => slider.prev());
    document.querySelector('[data-next]')?.addEventListener('click', () => slider.next());
    document.querySelector('[data-start-loop]')?.addEventListener('click', () => {
        if (loopInterval !== null) {
            return;
        }
        slider.next()
        loopInterval = setInterval(() => slider.next(), 1000);
    });
    document.querySelector('[data-stop-loop]')?.addEventListener('click', () => {
        clearInterval(loopInterval);
        loopInterval = null;
    });
    document.querySelector('[data-destroy]')?.addEventListener('click', () => slider.destroy());
    document.querySelector('[data-reload]')?.addEventListener('click', (event) => {
        document.querySelector('[hidden]')?.classList.add('vjslider__slide');
        document.querySelector('[hidden]')?.removeAttribute('hidden');
        slider.reload({
            numberOfVisibleSlides: parseInt(event.currentTarget.dataset.numberOfSlides)
        });
    });
});
