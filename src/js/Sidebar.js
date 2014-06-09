/** The Sidebar.
 * This handles the sidebar of the screen, it also may modify the `#title` if need be.
 */
function Sidebar() {
	'use strict';
	/** Populate the sidebar. */
	this.populateFavouriteQueries = function () {
		d3.json(document.api.favouriteQueries(), function (error, data) {
			if (error) {
				throw error;
			}
			var liElems = d3.select('#queries').selectAll('li').data(data)
				.enter()
				.append('li')
				.call(function (li) {
					// Link to query
					li.append('a')
						.attr('href', function (d) { return '#' + '/query/' + d._id; })
						.text(function (d) { return d.title; })
				})
				.attr('title', function (d) { return d.description; });
		});
	}
	
	/** Initialize */
	this.populateFavouriteQueries();
}