// MainMenue state

var MainMenue = function(game) {};
MainMenue.prototype = {
	create: function() {
		console.log("MainMenue");
		game.stage.backgroundColor = "#000000";
		// add title screen text
		var titleText1 = game.add.text(game.world.width/2, 200, "[Title]\n", {font: 'Bookman', fontSize: '64px', fill: '#fff'});
		var titleText2 = game.add.text(game.world.width/2, game.world.height/2, "Press [SPACE] to start\n", {font: 'Bookman', fontSize: '48px', fill: '#fff'});
		var titleText3 = game.add.text(game.world.width/2, (game.world.height/2)+75, "Press [T] for tutorial\n", {font: 'Bookman', fontSize: '48px', fill: '#fff'});
		var titleText4 = game.add.text(game.world.width/2, (game.world.height/2)+150, "Press [C] for credits\n", {font: 'Bookman', fontSize: '48px', fill: '#fff'});
		titleText1.anchor.set(0.5);
		titleText2.anchor.set(0.5);
		titleText3.anchor.set(0.5);
		titleText4.anchor.set(0.5);
		//titleText.textAlign(center);

	},
	update: function() {
		if(game.input.keyboard.justPressed(Phaser.Keyboard.T)) {
			game.state.start("Tutorial");
		}
		if(game.input.keyboard.justPressed(Phaser.Keyboard.C)) {
			game.state.start("Credits");
		}
	}
};