// MainMenue state

var MainMenue = function(game) {};
MainMenue.prototype = {
	create: function() {
		console.log("MainMenue");
		game.stage.backgroundColor = "#000000";
		// add title screen text
		var titleText = game.add.text(game.width/2, game.height/2, "[Title]\nPress [SPACE] to start\nPress [a] for tutorial\nPress [b] for credits", {font: 'Helvetica', fontSize: '48px', fill: '#fff'});
		titleText.anchor.set(0.5);
		//titleText.align("center");

		// add lantern
		var lanternOn = this.add.sprite(game.width/5 + 15, 0, "orange");

	},
	update: function() {
		if(game.input.keyboard.justPressed(Phaser.Keyboard.A)) {
			game.state.start("Tutorial");
		}
		if(game.input.keyboard.justPressed(Phaser.Keyboard.B)) {
			game.state.start("Credits");
		}
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			//lanternOn.destroy();
			var lanternOff = this.add.sprite(game.width/5 + 15, 0, "white");
			game.state.start("Play");
		}
	}
};