// how to play state

var Tutorial = function(game) {};
Tutorial.prototype = {
	create: function() {
		console.log("Tutorial");
		// BG
		game.stage.backgroundColor = "#000000";
		//txt
		var titleText1 = game.add.text(game.world.width/2, (game.world.height/2)-75, "Use the arrow keys to move around.\n", {font: 'Almendra', fontSize: '48px', fill: '#fff'});
		var titleText2 = game.add.text(game.world.width/2, (game.world.height/2), "Press [F] to toggle the lantern.\n", {font: 'Almendra', fontSize: '48px', fill: '#fff'});
		var titleText3 = game.add.text(game.world.width/2, (game.world.height/2)+225, "Press [BACKSPACE] to return to main menu.", {font: 'Almendra', fontSize: '24px', fill: '#fff'});
		titleText1.anchor.set(0.5);
		titleText2.anchor.set(0.5);
		titleText3.anchor.set(0.5);
	},
	update: function() {
		//return to menu
		if(game.input.keyboard.justPressed(Phaser.Keyboard.BACKSPACE)) {
			game.state.start("MainMenue");
		}
	}
};