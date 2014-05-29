// Tests the user interaction with the sidebar.

var rootUri = 'http://localhost:8080';

casper.options.viewportSize = {width: 800, height: 600};

casper.test.begin('Sidebar toggles', function suite(test) {
	casper.start(rootUri + '/dashboard.html');
	casper.then(function () {
		test.assertExists('.left-off-canvas-toggle', 'Sidebar toggle button exists.');
		casper.mouse.click('.left-off-canvas-toggle');
		test.assertExists('.off-canvas-wrap.move-right', 'Sidebar toggles on correctly.');
		casper.mouse.click('.exit-off-canvas');
		test.assertExists('.off-canvas-wrap:not(move-rightz)', 'Sidebar toggles off correctly.');
	});
	casper.run(function () {
		test.done();
	});
});

casper.test.begin('Sidebar populates 5 queries', function suite(test) {
	casper.start(rootUri + '/dashboard.html');
	casper.then(function () {
		test.assertElementCount('#queries > li', 5, 'Should populate queries.');
		test.assertElementCount('#queries > li > a[href]', 5, 'Should have links.');
	});
	casper.run(function () {
		test.done();
	});
});

casper.test.begin('Sidebar queries have tooltips', function suite(test) {
	casper.start(rootUri + '/dashboard.html');
	casper.then(function () {
		test.assertExists('#queries .tip-right', 'Queries have tooltips.');
		test.assertExists('#queries .tip-right', 'Queries have tooltips on the right.');
		// Toggle the menu, otherwise it won't work.
		casper.mouse.click('.left-off-canvas-toggle');
		test.assertExists('.off-canvas-wrap.move-right', 'The sidebar is open.');
		// Simulate a mouseover even. Casper's `mouse` module isn't capable of this.
		casper.evaluate(function () {
			$('#queries > li:nth-child(1) > a').mouseover();
		});
		// Wait for a short time.
		casper.wait(200, function () {
			test.assertExists('.tip-right.open', 'Query tooltips open when you hover over them.');
		});
	});
	casper.run(function () {
		test.done();
	});
});

casper.test.begin('Sidebar queries have favourites', function suite(test) {
	casper.start(rootUri + '/dashboard.html');
	casper.then(function () {
		test.assertElementCount('#queries > li > a.favdiv', 5, 'Should have favorites.');
		test.assertElementCount('#queries > li > a > i', 5, 'Should have should have icons.');
	});
	casper.run(function () {
		test.done();
	});
});
