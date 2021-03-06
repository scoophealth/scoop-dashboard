// Tests the visualizer.
var require = patchRequire(require);

var rootUri = 'http://localhost:8080',
	tools = require('./_tools');

casper.options.viewportSize = { width: 1920, height: 1080 }

casper.test.begin('Setup authentication.', function suite(test) {
	casper.start(rootUri, function() {
		tools.login('foo', 'bar', function (success) {
			test.assert(success, 'Authenticated.');
		});
	});
	casper.run(function() {
		test.done();
	});
});

casper.test.begin('/#/queries', function suite(test) {
	casper.evaluate(function () {
		window.location.hash = '#/queries';
	});
	casper.waitForSelector('#listing', function () {
		test.assertExists('#listing', 'Listing exists.');
		test.assertExists('#listing > div', 'Items are in the listing.');
		test.assertExists('#listing > div .btn[href]', 'Buttons are populated.');
	});
	casper.run(function () {
		test.done();
	});
});

casper.test.begin('/#/query/1', function suite(test) {
	casper.evaluate(function () {
		window.location.hash = '#/query/1';
	});
	casper.waitForSelector('#displayArea', function () {
		test.assertExists('#displayArea', 'Place for charts.');
	});
	casper.run(function () {
		test.done();
	});
});