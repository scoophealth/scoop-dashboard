function Visualizer() {
	'use strict';
	var main = d3.select('#main'),
	title = d3.select('#title');
	
	// Cleans the entire visualizer section.
	this.clean = function () {
		main.html('');
	};
	
	// Displays a list of queries.
	this.queries = function () {
		this.clean();
		title.text('Query List')
		// Get the queries and display them in a nice list.
		d3.json(document.api.queries(), function (data) {
			// Add a row div
			var queries = main.selectAll('div').data(data);
			queries.enter()
				.append('div').classed({ 'row': true })
				.append('div')
				.classed({ 'small-centered': true, 'small-11': true, 'columns': true })
				.append('h3')
				.text(function (d) { return d.title; })
				.append('p')
				.text(function (d) { return d.description; });
		});
		
	};
	
	// Displays a single query.
	this.queryById = function (id) {
		this.clean();
	};
}