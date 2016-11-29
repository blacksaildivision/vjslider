document.addEventListener('DOMContentLoaded', function () {
    var slider = new VJSlider(document.querySelector('.carousel')),
        loopStarted = false,
        loop;

    document.querySelector('.js-prev').addEventListener('click', function (event) {
        event.preventDefault();
        slider.prev();
    });

    document.querySelector('.js-next').addEventListener('click', function (event) {
        event.preventDefault();
        slider.next();
    });

    document.querySelector('.js-start-loop').addEventListener('click', function (event) {
        event.preventDefault();
        if (!loopStarted) {
            slider.next();
            loop = setInterval(function () {
                slider.next();
            }, 1000);
            loopStarted = true;
        }
    });

    document.querySelector('.js-stop-loop').addEventListener('click', function (event) {
        event.preventDefault();
        if (loopStarted) {
            clearInterval(loop);
            loopStarted = false;
        }
    });

    document.querySelector('.js-destroy').addEventListener('click', function (event) {
        event.preventDefault();
        slider.destroy();
    });

    document.querySelector('.js-reload').addEventListener('click', function (event) {
        event.preventDefault();
        // Remove hidden class
        document.querySelector('.carousel__slide--red').classList.remove('carousel__slide--hidden');
        slider.reload({
            numberOfVisibleSlides: 2
        });
    });
});
