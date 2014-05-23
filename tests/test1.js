var url = "http://localhost:9000"

casper.test.begin("A default test.", function suite(test) {
    "use strict";

    casper.start(url, function () {
        test.assertExists('header', 'Has a header.');
    });

    casper.then(function () {
        test.assertExists('footer', 'Has a footer');
    });

    casper.run(function () {
        test.done();
    });
});
