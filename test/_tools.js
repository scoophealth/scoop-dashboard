exports.login = function (identity, password, next) {
	var resourceRegex = /\/api\/.*\/auth/;
	// Fill out the form.
	casper.waitUntilVisible('#auth', function () {
		casper.fill('#auth form', {
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
			if (success) {
				// Wait until the dialog goes away.
				casper.waitWhileVisible('#auth', function then() {
					next(success);
				}, function onTimeout() {
					next(false);
				});
			} else {
				next(success);
			}
		});
	})
};