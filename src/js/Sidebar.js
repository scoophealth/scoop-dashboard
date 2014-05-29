function Sidebar(api) {
	'use strict';
	// Populate the sidebar.
	this.populateQueries = function() {
		d3.json(api.queries(), function (error, data) {
			if (error) {
				throw error;
			}

			var items = d3.select('#queries').selectAll('li').data(data),
				limit = 25;

			items.enter()
				.append('li')
				.append('a')
				.text(function (d) { return d.title; })
				.attr('data-tooltip', true)
				.classed({ 'has-tip': true, 'tip-right': true })
				.attr('title', function (d) { return d.description; })
				.call(function() {
					// Refresh the Tooltips
					$(document).foundation('tooltip');
				})
				.call(function() {
					// Notify progress.
					d3.select('#title').text("Sidebar queries populated...");
				});
		});
	}
	
	// Finish up
	this.populateQueries();
}