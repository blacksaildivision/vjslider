casper.test.begin("Markup testing", 17, function (test) {
    "use strict";

    // Test general markup
    casper.start("http://localhost:8363/demo", function () {
        test.assertHttpStatus(200, "it should load demo page");
        test.assertExists(".vjslider", "it should contain main wrapper for slider");
        test.assertExists(".vjslider > .vjslider__slider", "it should contain slider itself");
        test.assertExists(".vjslider > .vjslider__slider > .vjslider__slide", "it should contain class on each slide");
    });

    // Test clones
    casper.then(function () {
        test.assertExists(".vjslider__clone", "it contains clones");
        test.assertExists(".carousel__slide--blue.vjslider__clone", "it contains first element cloned");
        test.assertExists(".carousel__slide--purple.vjslider__clone", "it contains second element cloned");
        test.assertExists(".carousel__slide--pink.vjslider__clone", "it contains last element cloned");
        test.assertExists(".carousel__slide--green.vjslider__clone", "it contains one before last element cloned");
        test.assertNotExists(".carousel__slide--hidden.vjslider__clone", "it does not clone hidden elements");
    });

    // Single slide test
    casper.thenOpen("http://localhost:8363/demo/single-slide.html", function () {
        test.assertHttpStatus(200, "it should load demo page");
        test.assertExists(".vjslider", "it should contain main wrapper for slider");
        test.assertExists(".vjslider > .vjslider__slider", "it should contain slider itself");
        test.assertExists(".vjslider > .vjslider__slider > .vjslider__slide", "it should contain class on each slide");

        test.assertExists(".vjslider__clone", "it contains clones");
        test.assertExists(".carousel__slide--blue.vjslider__clone", "it contains valid element cloned");
        test.assertEval(function () {
            return __utils__.findAll(".carousel__slide--blue.vjslider__clone").length === 4;
        }, "it contains correct number of cloned elements");
    });


    casper.run(function () {
        test.done();
    });
});
