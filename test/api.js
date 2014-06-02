// Tests the Api module. In general this won't actually call the API. It just builds URIs since we utilize d3's .json call.

var require = patchRequire(require);

var rootUri = 'http://localhost:8080',
	tools = require('./_tools');

casper.options.viewportSize = { width: 1920, height: 1080 };

casper.test.begin('Setup authentication.', function suite(test) {
	casper.start(rootUri, function () {
		tools.login('foo', 'bar', function (success) {
			test.assert(success, 'Authenticated.');
		});
	});
	casper.run(function () {
		test.done();
	});
});

casper.test.begin('api.queries', function suite(test) {
	casper.then(function () {
		test.assertEvalEquals(function () {
			return document.api.queries();
		}, '/api/v1/queries', 'No parameters.');
	});
	casper.then(function () {
		test.assertEvalEquals(function () {
			return document.api.queries({limit: 5});
		}, '/api/v1/queries?limit=5', 'Limit parameter.');
	});
	casper.then(function () {
		test.assertEvalEquals(function () {
			return document.api.queries({skip: 5});
		}, '/api/v1/queries?skip=5', 'Skip parameter.');
	});
	casper.then(function () {
		test.assertEvalEquals(function () {
			return document.api.queries({search: 'Bear'});
		}, '/api/v1/queries?search=Bear', 'Search parameter.');
	});
	casper.then(function () {
		test.assertEvalEquals(function () {
			return document.api.queries({limit: 5, skip: 5});
		}, '/api/v1/queries?limit=5&skip=5', 'Limit & Skip parameter.');
	});
	casper.then(function () {
		test.assertEvalEquals(function () {
			return document.api.queries({limit: 5, search: 'Bear'});
		}, '/api/v1/queries?limit=5&search=Bear', 'Limit & Search parameter.');
	});
	casper.then(function () {
		test.assertEvalEquals(function () {
			return document.api.queries({skip: 5, search: 'Bear'});
		}, '/api/v1/queries?skip=5&search=Bear', 'Skip & Search parameter.');
	});
	casper.then(function () {
		test.assertEvalEquals(function () {
			return document.api.queries({limit: 5, skip: 5, search: 'Bear'});
		}, '/api/v1/queries?limit=5&skip=5&search=Bear', 'Limit, Skip, & Search parameter.');
	});
	casper.run(function () {
		test.done();
	});
});

casper.test.begin('api.query', function suite(test) {
	casper.then(function () {
		test.assertEvalEquals(function () {
			try {
				return document.api.query();
			} catch (e) {
				return e;
			} 
		}, 'An id must be provided.', 'Throws error on no ID provided.');
	});
	casper.then(function () {
		test.assertEvalEquals(function () {
			return document.api.query(1);
		}, '/api/v1/query/1', 'Provides a correct URI.');
	});
	casper.run(function () {
		test.done();
	});
})