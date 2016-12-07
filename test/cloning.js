casper.test.begin("Cloning testing", 9, function (test) {
    "use strict";

    // Multiple visible slides with cloned elements. Test has only 3 slides, but total number of visible slides is 12.
    // Elements should be cloned
    casper.start("http://localhost:8363/demo/multiple-slides-with-clone.html", function () {
        test.assertHttpStatus(200, "it should load demo page with multiple visible slides and not enough slides");
        test.assertExists(".vjslider", "it should contain main wrapper for slider");
        test.assertExists(".vjslider > .vjslider__slider", "it should contain slider itself");
        test.assertExists(".vjslider > .vjslider__slider > .vjslider__slide", "it should contain class on each slide");

        test.assertExists(".vjslider__clone", "it contains clones");
        test.assertExists(".carousel__slide--blue.vjslider__clone", "it contains valid element cloned");
        test.assertNotExists(".carousel__slide--hidden.vjslider__clone", "it does not clone hidden elements");
        test.assertEval(function () {
            return __utils__.findAll(".vjslider__clone").length === 35;
        }, "it contains correct number of cloned elements");
    });

    // Test if sliding forward is working
    casper.then(function () {
        test.assertEval(function () {
            var width = __utils__.findOne(".vjslider__slider").style.width;
            return parseFloat(width.replace("%", "")).toFixed(3) == 316.667;
        }, "it has correct width of whole slider");
    });

    casper.run(function () {
        test.done();
    });
});
