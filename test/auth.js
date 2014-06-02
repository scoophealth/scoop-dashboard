// Tests authentication, also exports a useful auth function.

var rootUri = 'http://localhost:8080',
	tools = require('./_tools');

casper.options.viewportSize = { width: 1920, height: 1080 };

// Most of this suite uses the `login` method from `tools`.

casper.test.begin('Can authenticate with a proper identity.', function suite(test) {
	casper.start(rootUri);
	casper.then(function () {
		tools.login('foo', 'bar', function (success) {
			test.assert(success, 'Can log in with a valid identity.');
		});
	});
	casper.run(function () {
		test.done();
	});
});

casper.test.begin('Cannot authenicate with a bad identity.', function suite(test) {
	casper.start(rootUri);
	casper.then(function () {
		tools.login('wrong', 'wrong', function (success) {
			test.assert(!success, 'Cannot log in with an invalid identity.');
		});
	});
	casper.run(function () {
		test.done();
	});
});

