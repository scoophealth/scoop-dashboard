function Sidebar(api) {
	'use strict';
    // Populate the sidebar.
    d3.json(api.queries(), this.populateQueries);

	this.populateQueries = function (error, data) {
		if (error) {
			throw error;
		}
	    var items = d3.select('#queries').selectAll('li').data(data),
			limit = 25;

	    items.enter()
	        .append('li')
	        .append('a')
	        .text(function (d) {
	            if (d.title.length > limit) {
	                return d.title.substr(0, limit) + "...";
	            } else {
	                return d.title;
	            }
	        });
	}
}