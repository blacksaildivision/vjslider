casper.test.begin("Sliding testing", 6, function (test) {
    "use strict";

    // Test if slider is working
    casper.start("http://localhost:8363/demo?" + Date.now(), function () {
        test.assertHttpStatus(200, "it should load demo page");
        test.assertExists(".vjslider", "it should load the slider");
    });

    // Test if sliding forward is working
    casper.then(function () {
        test.assertEval(function () {
            return __utils__.findOne(".vjslider__slider").style.width === "900%"
        }, "it has correct width of whole slider");

        test.assertEvalEquals(function () {
            return -parseFloat(__utils__.findOne(".vjslider__slider").style.transform.match(/translate3d\(-(\d+[.]\d+)/)[1]).toFixed(4) + "%";
        }, "-22.2222%", "it shows first slide");

        // Test next()
        casper.then(function () {
            this.click(".js-next");
            this.wait(350, function () {
                test.assertEvalEquals(function () {
                    return -parseFloat(__utils__.findOne(".vjslider__slider").style.transform.match(/translate3d\(-(\d+[.]\d+)/)[1]).toFixed(4) + "%";
                }, "-33.3333%", "it shows second slide");
            })
        });

        // Test prev()
        casper.then(function () {
            this.click(".js-prev");
            this.wait(350, function () {
                test.assertEvalEquals(function () {
                    return -parseFloat(__utils__.findOne(".vjslider__slider").style.transform.match(/translate3d\(-(\d+[.]\d+)/)[1]).toFixed(4) + "%";
                }, "-22.2222%", "it shows first slide");
            })
        });

    });

    casper.run(function () {
        test.done();
    });
});
