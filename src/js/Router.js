function Router() {
	$(window).on('hashchange', function() {
		console.log("router fired: " + window.location.hash);
	});
}