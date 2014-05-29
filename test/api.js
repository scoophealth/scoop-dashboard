// Tests the Api module. In general this won't actually call the API. It just builds URIs since we utilize d3's .json call.

var rootUri = 'http://localhost:8080';

casper.test.begin('api.queries', function suite(test) {
	casper.start(rootUri + '/dashboard.html');
	casper.then(function() {
		test.assertEvalEquals(function() {
			return api.queries();
		}, '/api/v1/queries', 'No parameters.');
	});
	casper.then(function() {
		test.assertEvalEquals(function() {
			return api.queries({limit: 5});
		}, '/api/v1/queries?limit=5', 'Limit parameter.');
	});
	casper.then(function() {
		test.assertEvalEquals(function() {
			return api.queries({skip: 5});
		}, '/api/v1/queries?skip=5', 'Skip parameter.');
	});
	casper.then(function() {
		test.assertEvalEquals(function() {
			return api.queries({search: 'Bear'});
		}, '/api/v1/queries?search=Bear', 'Search parameter.');
	});
	casper.then(function() {
		test.assertEvalEquals(function() {
			return api.queries({limit: 5, skip: 5});
		}, '/api/v1/queries?limit=5&skip=5', 'Limit & Skip parameter.');
	});
	casper.then(function() {
		test.assertEvalEquals(function() {
			return api.queries({limit: 5, search: 'Bear'});
		}, '/api/v1/queries?limit=5&search=Bear', 'Limit & Search parameter.');
	});
	casper.then(function() {
		test.assertEvalEquals(function() {
			return api.queries({skip: 5, search: 'Bear'});
		}, '/api/v1/queries?skip=5&search=Bear', 'Skip & Search parameter.');
	});
	casper.then(function() {
		test.assertEvalEquals(function() {
			return api.queries({limit: 5, skip: 5, search: 'Bear'});
		}, '/api/v1/queries?limit=5&skip=5&search=Bear', 'Limit, Skip, & Search parameter.');
	});
	casper.run(function() {
		test.done();
	});
});