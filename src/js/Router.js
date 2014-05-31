function Router() {
	'use strict';
	// Routie http://projects.jga.me/routie/
	
	// Use Anonymouse functions to avoid needing to use .bind()
	routie('/queries', function () {
		document.visualizer.queries();
	});
	routie('/query/:id', function (id) {
		document.visualizer.queryById(id);
	});
}