casper.test.begin("Sliding testing", 12, function (test) {
    "use strict";

    // Multiple visible slides test
    casper.start("http://localhost:8363/demo/multiple-slides.html", function () {
        test.assertHttpStatus(200, "it should load demo page with multiple visible slides");
        test.assertExists(".vjslider", "it should contain main wrapper for slider");
        test.assertExists(".vjslider > .vjslider__slider", "it should contain slider itself");
        test.assertExists(".vjslider > .vjslider__slider > .vjslider__slide", "it should contain class on each slide");

        test.assertExists(".vjslider__clone", "it contains clones");
        test.assertExists(".carousel__slide--blue.vjslider__clone", "it contains valid element cloned");
        test.assertNotExists(".carousel__slide--hidden.vjslider__clone", "it does not clone hidden elements");
        test.assertEval(function () {
            return __utils__.findAll(".vjslider__clone").length === 6;
        }, "it contains correct number of cloned elements");
    });

    // Test if sliding forward is working
    casper.then(function () {
        test.assertEval(function () {
            return __utils__.findOne(".vjslider__slider").style.width === "550%"
        }, "it has correct width of whole slider");

        test.assertEvalEquals(function () {
            return -parseFloat(__utils__.findOne(".vjslider__slider").style.transform.match(/translate3d\(-(\d+[.]\d+)/)[1]).toFixed(4) + "%";
        }, "-27.2727%", "it shows first slide");

        // Test next()
        casper.then(function () {
            this.click(".js-next");
            this.wait(350, function () {
                test.assertEvalEquals(function () {
                    return -parseFloat(__utils__.findOne(".vjslider__slider").style.transform.match(/translate3d\(-(\d+[.]\d+)/)[1]).toFixed(4) + "%";
                }, "-36.3636%", "it shows second slide");
            })
        });

        // Test prev()
        casper.then(function () {
            this.click(".js-prev");
            this.wait(350, function () {
                test.assertEvalEquals(function () {
                    return -parseFloat(__utils__.findOne(".vjslider__slider").style.transform.match(/translate3d\(-(\d+[.]\d+)/)[1]).toFixed(4) + "%";
                }, "-27.2727%", "it shows first slide");
            })
        });

    });

    casper.run(function () {
        test.done();
    });
});
