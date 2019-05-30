// credits state

var Credits = function(game) {};
Credits.prototype = {
	create: function() {
		console.log("Credits");
		game.stage.backgroundColor = "#000000";
		// add last names
		var titleText1 = game.add.text(game.world.width/2, (game.world.height/2)-225, "Credits:\n", {font: 'Bookman', fontSize: '48px', fill: '#fff'});
		var titleText2 = game.add.text(game.world.width/2, (game.world.height/2)-75, "Alejandro - Programming and Mechanic Design\n", {font: 'Bookman', fontSize: '48px', fill: '#fff'});
		var titleText3 = game.add.text(game.world.width/2, (game.world.height/2), "Drea - Art and Menu UI\n", {font: 'Bookman', fontSize: '48px', fill: '#fff'});
		var titleText4 = game.add.text(game.world.width/2, (game.world.height/2)+75, "Misael - Narrative and Level Design\n", {font: 'Bookman', fontSize: '48px', fill: '#fff'});
		var titleText5 = game.add.text(game.world.width/2, (game.world.height/2)+225, "Press [BACKSPACE] to return to main menu", {font: 'Bookman', fontSize: '48px', fill: '#fff'});
		titleText1.anchor.set(0.5);
		titleText2.anchor.set(0.5);
		titleText3.anchor.set(0.5);
		titleText4.anchor.set(0.5);
		titleText5.anchor.set(0.5);
	},
	update: function() {
		if(game.input.keyboard.justPressed(Phaser.Keyboard.BACKSPACE)) {
			game.state.start("MainMenue");
		}
	}
};