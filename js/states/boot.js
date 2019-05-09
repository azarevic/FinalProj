// Boot state

var Boot = function(game) {};
Boot.prototype = {
	preload: function() {
		console.log("Boot");

		game.load.image("loading", "assets/img/loading.png");
	},
	create: function() {
		game.state.start("Load");
	}
};