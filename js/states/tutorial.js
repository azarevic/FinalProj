// how to play state

var Tutorial = function(game) {};
Tutorial.prototype = {
	create: function() {
		console.log("Tutorial");
		game.stage.backgroundColor = "#000000";
		var titleText = game.add.text(game.width/2, game.height/2, "Use the arrow keys to move.\nPress [] to toggle the lantern\nPress [BACKSPACE] to return to main menu", {font: 'Helvetica', fontSize: '48px', fill: '#fff'});
		titleText.anchor.set(0.5);
	},
	update: function() {
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.state.start("MainMenue");
		}
	}
};