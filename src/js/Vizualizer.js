/** The Visualizer.
 * This handles most of the 'main part' of the screen.
 */
function Visualizer() {
	'use strict';
	var main = d3.select('#main'),
	title = d3.select('#title');
	
	/** Cleans the entire visualizer section. */
	this.clean = function () {
		main.html('');
	};
	
	/** Displays a list of queries. */
	this.queries = function () {
		this.clean();
		// Set the title correctly.
		title.text('Query List');
		// Make space for the listing.
		main.append('div').attr('id', 'listing');
		// Get the queries and display them in a nice list.
		d3.json(document.api.queries(), function displayQueries(error, data) {
			if (error) { throw "Query failed to be requested."; }
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
	
	/** Displays a single query.
	 * @param {string} - The ID of the query.
	 */
	this.queryById = function (id) {
		this.clean();
		d3.json(document.api.query(id), function displayQuery(error, data) {
			if (error) { throw "Query failed to be requested."; }
			// Set title.
			title.text(data.title);
			var container = main.append('div').classed('row', true)
				.append('div')
				.classed({ 'small-centered': true, 'small-11': true, 'columns': true });
			
			// Build the chart.
			container.append('div').attr('id', 'chart');
			data.chart.bindto = '#chart';
			var chart = c3.generate(data.chart);
			
			// Set controls.
			var controls = container.append('div').attr('id', 'controls').call(function (controls) {
				buildControls(chart, controls);
			});
			
			// Set description.
			container.append('h4').text('Description:')
			container.append('p').attr('id', 'description').classed('panel', true)
				.text(data.description);
			
			// Some info
			container.append('p').attr('id', 'details').call(function (details) {
				// Author
				details.append('b').text('Author: ')
				details.append('span').attr('id', 'author')
					.text(data.author);
					
				details.append('br')
				// Date
				details.append('b').text('Date: ')
				details.append('span').attr('id', 'date')
					.text(data.date);
			})
		});
	};
	
	
	// Auxilary Methods
	
	/** Generates the controls for a chart.
	 * @param {Object} chart - The C3 object of the Chart.
	 * @param {Element} controls - The DOM element to append the controls too.
	 */
	function buildControls(chart, controls) {
		document.chart = chart;
		var defaults = $.extend({}, chart.data.colors()),
			changeColumnColour = function () {
				var column = $(this).data('column'),
					colour = $(this).val(),
					current = chart.data.colors();
				current[column] = colour;
				chart.data.colors(current);
			}; // We use this to apply the function in the event calls.
		
		var colours = controls.append('div').attr('id', 'colours');
		Object.keys(chart.data.colors()).forEach(function (key) {
			var label = colours.append('label').classed();
			
			label.append('input').attr('type', 'color')
				.attr('data-column', key)
				.property('value', chart.data.colors()[key])
				.on('change', changeColumnColour);
			label.append('span').text(' ' + key);
		});
	}
	
	/** Generates a button (actually an 'a') as a child of the selection.
	 * @param {Element} selection - The DOM element to append to.
	 * @param {string} icon - An icon selected from Foundation Icons.
	 * @param {string} title - The text inside of the button.
	 * @param {string|function} action - Either a link target or a function to be executed on click.
	 */
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