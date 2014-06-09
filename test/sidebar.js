// Tests the user interaction with the sidebar.
var require = patchRequire(require);

var rootUri = 'http://localhost:8080',
	tools = require('./_tools');

casper.options.viewportSize = { width: 1920, height: 1080 };

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

casper.test.begin('Sidebar toggles', function suite(test) {
	casper.then(function () {
		test.assertExists('.navbar-toggle', 'Sidebar toggle button exists.');
		casper.mouse.click('.navbar-toggle');
		test.assertExists('.navmenu.in', 'Sidebar toggles on correctly.');
		casper.mouse.click('.navbar-toggle');
		test.assertExists('.navmenu.canvas-sliding', 'Sidebar toggles off correctly.');
	});
	casper.run(function () {
		test.done();
	});
});

casper.test.begin('Sidebar populates 5 favourite queries', function suite(test) {
	casper.then(function () {
		test.assertElementCount('#queries > li', 5, 'Should populate favourite queries.');
		test.assertElementCount('#queries > li > a[href]', 5, 'Should have links.');
	});
	casper.run(function () {
		test.done();
	});
});

casper.test.begin('Sidebar queries have a link for a full list.', function suite(test) {
	casper.then(function () {
		test.assertExists('a[href="#/queries"]', 'Should have a link to a full list.');
	});
	casper.run(function () {
		test.done();
	});
});