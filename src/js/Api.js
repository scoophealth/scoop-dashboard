function Api() {
	'use strict';
    this.version = '/v1';
    this.root = '/api';

    // Returns a string used to query the API.
    this.queries = function (opts) {
        var url = this.root + this.version + '/queries';
        if (opts) {
            url += '?';
            url += (opts.limit)   ? 'limit='   + opts.limit   + '&' : '';
            url += (opts.skip)    ? 'skip='    + opts.skip    + '&' : '';
            url += (opts.search)  ? 'search='  + opts.search  + '&' : '';
        }
        return url;
    };
}