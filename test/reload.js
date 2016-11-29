casper.test.begin("Sliding testing", 7, function (test) {
    "use strict";

    // Test general markup
    casper.start("http://localhost:8363/demo?" + Date.now(), function () {
        test.assertHttpStatus(200, "it should load demo page");
        test.assertExists(".vjslider", "it should contain main wrapper for slider");
        test.assertEval(function () {
            return __utils__.findAll(".vjslider__clone").length === 4;
        }, "it contains correct number of cloned elements before reload");
        test.assertEval(function () {
            return __utils__.findOne(".vjslider__slider").style.width === "900%"
        }, "it has correct width of before slider");
    });

    // Test reload with alternative options
    // Hidden slide will become visible so it must be present in slider as well
    casper.then(function () {
        this.click(".js-reload");
        test.assertExists(".vjslider", "it should contain main wrapper for slider after reload");
        test.assertEval(function () {
            return __utils__.findAll(".vjslider__clone").length === 6;
        }, "it contains correct number of cloned elements after reload");

        test.assertEval(function () {
            return __utils__.findOne(".vjslider__slider").style.width === "600%"
        }, "it has correct width of whole slider after reload");
    });
    casper.run(function () {
        test.done();
    });
});