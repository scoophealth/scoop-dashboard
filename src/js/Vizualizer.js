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
		// Set the title correctly.
		title.text('Query List');
		// Make space for the listing.
		main.append('div').attr('id', 'listing');
		// Get the queries and display them in a nice list.
		d3.json(document.api.queries(), function displayQueries(data) {
			// Add a row div
			var queries = main.select('#listing').selectAll('div').data(data);
			queries.enter()
				// Make a row
				.append('div')
					.classed('row', true)
				.append('div')
					.classed({ 'small-centered': true, 'small-11': true, 'columns': true })
				.call(function (query) {
					// Display information about query.
					query.append('h3')
						.text(function (d) { return d.title; })
					query.append('p')
						.text(function (d) { return d.description; })
				})
				.each(function (d) {
					// Build buttons
					d3.select(this).call(buildButton, 'fi-eye', 'View', '#/query/' + d._id);
					d3.select(this).call(buildButton, 'fi-heart', 'Favourite', function () {
						alert("Favourite not implemented yet");
					});
				});
		});
	};
	
	// Displays a single query.
	this.queryById = function (id) {
		this.clean();
		d3.json(document.api.query(id), function displayQuery(data) {
			// Set title.
			title.text(data.title);
			var container = main.append('div').classed('row', true)
				.append('div')
				.classed({ 'small-centered': true, 'small-11': true, 'columns': true });
			// Set description.
			container.append('p').attr('id', 'description').classed('panel', true)
				.text(data.description);
			container.append('div').attr('id', 'chart');
			data.chart.bindto = '#chart';
			var chart = c3.generate(data.chart);
		});
	};
	
	// Auxilary Methods
	function buildButton(selection, icon, title, action) {
		var button = selection.append('a').classed({ 'button': true, 'small': true })
			.call(function (button) {
				button.append('i').classed(icon, true);
				button.append('span').text(' ' + title);
			});
			if (typeof action === "function") {
				button.on('click', action);
			} else {
				button.attr('href', action);
			}
	}
}