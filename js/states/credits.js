// credits state

var Credits = function(game) {};
Credits.prototype = {
	create: function() {
		console.log("Credits");
		game.stage.backgroundColor = "#000000";
		var titleText1 = game.add.text(game.world.width/2, (game.world.height/2)-150, "Created by:\n", {font: 'Bookman', fontSize: '48px', fill: '#fff'});
		var titleText2 = game.add.text(game.world.width/2, (game.world.height/2)+150, "Press [BACKSPACE] to return to main menu", {font: 'Bookman', fontSize: '48px', fill: '#fff'});
		titleText1.anchor.set(0.5);
		titleText2.anchor.set(0.5);
	},
	update: function() {
		if(game.input.keyboard.justPressed(Phaser.Keyboard.BACKSPACE)) {
			game.state.start("MainMenue");
		}
	}
};