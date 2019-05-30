//Game Over state

var GameOver = function(game) {};
GameOver.prototype = {
	create: function() {
		console.log("GameOver");
		game.stage.backgroundColor = "#000000";
		var titleText1 = game.add.text(game.world.width/2, (game.world.height/2)-75, "You've been caught...\n", {font: 'Bookman', fontSize: '60px', fill: '#fff'});
		var titleText2 = game.add.text(game.world.width/2, (game.world.height/2)+75, "Press [SPACE] to return to the menu.", {font: 'Bookman', fontSize: '48px', fill: '#fff'});
		titleText1.anchor.set(0.5);
		//titleText.align("center");
	},
	update: function() {
	    if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.state.start("MainMenue");
		}
	}
};