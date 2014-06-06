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
	casper.then(function () {
		test.assertExists('#listing', 'Listing exists.');
		test.assertExists('#listing > .row > .small-centered.small-11.columns', 'Items are in the listing.');
		test.assertExists('#listing > .row > .small-centered.small-11.columns > .button[href]', 'Buttons are populated.');
	});
	casper.run(function () {
		test.done();
	});
});

casper.test.begin('/#/query/1', function suite(test) {
	casper.evaluate(function () {
		window.location.hash = '#/query/1';
		casper.wait(100); // It can take a bit for things to load.
	});
	casper.then(function () {
		test.assertExists('#chart', 'Place for chart.');
	});
	casper.run(function () {
		test.done();
	});
});