// MainMenue state

var MainMenue = function(game) {};
MainMenue.prototype = {
	create: function() {
		console.log("MainMenue");
		game.stage.backgroundColor = "#000000";
		// add title screen text
		var titleText = game.add.text(game.width/2, game.height/2, "[Title]\nPress [a] for tutorial\nPress [SPACE] to start", {font: 'Helvetica', fontSize: '48px', fill: '#fff'});
		titleText.anchor.set(0.5);
		//titleText.align("center");

	},
	update: function() {
		if(game.input.keyboard.justPressed(Phaser.Keyboard.A)) {
			game.state.start("Tutorial");
		}
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.state.start("Play");
		}
	}
};