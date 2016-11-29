casper.test.begin("Destroy testing", 11, function (test) {
    "use strict";

    // Test if slider is loaded properly
    casper.start("http://localhost:8363/demo?" + Date.now(), function () {
        test.assertHttpStatus(200, "it should load demo page");
        test.assertExists(".vjslider", "it should load the slider");
    });

    // Test if destroying is working fine
    casper.then(function () {
        this.click(".js-destroy");
        test.assertNotExists(".vjslider", "it should remove main wrapper");
        test.assertExists(".carousel", "it should not remove original element");
        test.assertNotExists(".vjslider__slider", "it should not have slider class");
        test.assertNotExists(".vjslider__slider--animate", "it should not have animate class");
        test.assertNotExists(".carousel[style*='']", "it should not have style attribute on original element");
        test.assertNotExists(".vjslider__cloner", "it should not have cloned elements");
        test.assertExists(".carousel__slide", "it should contain original slides");
        test.assertNotExists(".vjslider__slide", "it should not have vjslider class on slides");
        test.assertNotExists(".carousel__slide[style*='']", "it should not have style attribute on slides elements");
    });

    casper.run(function () {
        test.done();
    });
});
