// Tests the user interaction with the sidebar.

var rootUri = 'http://localhost:8080';

casper.test.begin('Sidebar population tests', function suite(test) {
	casper.start(rootUri + '/dashboard.html');
	casper.then(function() {
		test.assertElementCount('#queries > li', 5, 'Should populate queries.');
	});
	casper.run(function() {
		test.done();
	})
});

casper.test.begin('Sidebar interaction tests', function suite(test) {
	casper.start(rootUri + '/dashboard.html', function () {
		casper.evaluate(function() {
			var api = new Api();
		});
	});
	casper.then(function() {
		test.assertExists('.left-off-canvas-toggle', 'Sidebar toggle button exists.');
		casper.mouse.click('.left-off-canvas-toggle');
		test.assertExists('.off-canvas-wrap.move-right', 'Sidebar toggles on correctly.');
		casper.mouse.click('.exit-off-canvas');
		test.assertExists('.off-canvas-wrap:not(move-rightz)', 'Sidebar toggles off correctly.');
	});
	casper.run(function() {
		test.done();
	});
});