function Sidebar(api) {
	'use strict';
	// Populate the sidebar.
	this.populateQueries = function () {
		d3.json(api.queries(), function (error, data) {
			if (error) {
				throw error;
			}

			var liElems = d3.select('#queries').selectAll('li').data(data);

			var divElems = liElems.enter()
				.append('li')
				.classed({ 'clearfix': true })
				// Set Tooltips
				.attr('data-tooltip', true)
				.classed({ 'tip-right': true })
				.attr('title', function (d) { return d.description; })
				// Refresh the Tooltips
				.call(function () {
					$(document).foundation('tooltip');
				});
			
			// The link to view the query.
			divElems.append('a')
				.classed({ 'left': true })
				.attr('style', 'width: 200px;')
				// Set Link
				.attr('href', function (d) { return '#' + 'query=' + d._id; })
				// Set text.
				.text(function (d) { return d.title; })
				
			// The link to unfavorite the query.
			divElems.append('a')
				.classed({ 'right': true, 'text-center': true, 'favdiv': true })
				.attr('data-id', function (d) { return d._id; })
				.on('click', function (d) { api.unfavoriteQuery(d._id); })
				// Add hearts
				.append('i')
				.classed({ 'fi-heart': true })
				.attr('style', 'color: ' + d3.rgb(255, 105, 180) + ';')
				// Notify progress.
				.call(function () {
					d3.select('#title').text("Sidebar queries populated...");
				});
		});
	}
	
	// Finish up
	this.populateQueries();
}