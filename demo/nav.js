document.addEventListener('DOMContentLoaded', function () {
    var slider = new VJSlider(document.querySelector('.carousel'), sliderOptions),
        loopStarted = false,
        loop;

    if (document.querySelector('.js-prev') !== null) {
        document.querySelector('.js-prev').addEventListener('click', function (event) {
            event.preventDefault();
            slider.prev();
        });
    }

    if (document.querySelector('.js-next') !== null) {
        document.querySelector('.js-next').addEventListener('click', function (event) {
            event.preventDefault();
            slider.next();
        });
    }
    if (document.querySelector('.js-start-loop') !== null) {
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
    }

    if (document.querySelector('.js-stop-loop') !== null) {
        document.querySelector('.js-stop-loop').addEventListener('click', function (event) {
            event.preventDefault();
            if (loopStarted) {
                clearInterval(loop);
                loopStarted = false;
            }
        });
    }

    if (document.querySelector('.js-destroy') !== null) {
        document.querySelector('.js-destroy').addEventListener('click', function (event) {
            event.preventDefault();
            slider.destroy();
        });
    }

    if (document.querySelector('.js-reload') !== null) {
        document.querySelector('.js-reload').addEventListener('click', function (event) {
            event.preventDefault();
            // Remove hidden class
            document.querySelector('.carousel__slide--red').classList.remove('carousel__slide--hidden');
            slider.reload({
                numberOfVisibleSlides: parseInt(this.dataset.numberOfSlides)
            });
        });
    }

    if(document.querySelector('.js-show') !== null){
        document.querySelector('.js-show').addEventListener('click', function (event) {
            event.preventDefault();
            // Remove hidden class
            document.querySelector('.slider-container').classList.remove('slider-container--hidden');
        });
    }
});
