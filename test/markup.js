casper.test.begin('Markup testing', 4, function (test) {

    casper.start("http://localhost:8363/demo", function () {
        test.assertHttpStatus(200, 'it should load demo page');
        test.assertExists('.vjslider', "it should contain main wrapper for slider");
        test.assertExists('.vjslider > .vjslider__slider', "it should contain slider itself");
        test.assertExists('.vjslider > .vjslider__slider > .vjslider__slide', 'it should contain class on each slide');
    });

    casper.run(function () {
        test.done();
    });
});

