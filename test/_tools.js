exports.login = function (identity, password, next) {
	var resourceRegex = /\/api\/.*\/auth/;
	// Fill out the form.
	casper.fill('#auth form', {
		identity: identity,
		password: password
	}, true);
	// Wait for the resource.
	casper.waitForResource(function (resource) {
		return resource.url.match(resourceRegex);
	}, function () {
		// Make sure it was successful.
		var success = casper.resourceExists(function (resource) {
			// console.log(resource.url + ' ' + resource.status);
			return resource.url.match(resourceRegex) && resource.status === 200;
		});
		if (success) {
			// Wait until the dialog goes away.
			casper.waitFor(function () {
				return !casper.visible('#auth');
			});
		}
		next(success);
	});
}