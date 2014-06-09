exports.login = function (identity, password, next) {
	var resourceRegex = /\/api\/.*\/auth/;
	// Fill out the form.
	casper.waitUntilVisible('#auth', function () {
		casper.fill('#auth', {
			identity: identity,
			password: password
		}, true);
		// Wait for the resource.
		casper.waitForResource(function select(resource) {
			return resource.url.match(resourceRegex);
		}, function () {
			// Make sure it was successful.
			var success = casper.resourceExists(function select(resource) {
				return resource.url.match(resourceRegex) && resource.status === 200;
			});
			next(success);
		});
	})
};