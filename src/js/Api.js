function Api() {
	'use strict';
	this.version = '/v1';
	this.root = '/api';
	
	// Provides a way for the user to authenticate.
	this.auth = function (opts, next, error) {
		// Must include username and password.
		if (!(opts.identity && opts.password)) {
			throw 'A identity and password are both required.';
		}
		return $.get(this.root + this.version + '/auth', opts);
	};

	// Returns a string used to query the API.
	this.queries = function (opts) {
		var url = this.root + this.version + '/queries';
		if (opts) {
			url += '?' + $.param(opts);
		}
		return url;
	};
	
	// Returns a string used to query the API.
	this.favouriteQueries = function (opts) {
		var url = this.root + this.version + '/queries/favourites';
		if (opts) {
			url += '?' + $.param(opts);
		}
		return url;
	};
	
	this.unfavoriteQuery = function (id) {
		// TODO: Add favouriting functionality.
		console.log("TODO");
	};
}