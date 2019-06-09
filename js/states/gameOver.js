//Game Over state

var GameOver = function(game) {};
GameOver.prototype = {
	create: function() {
		console.log("GameOver");
		this.sound.stopAll();
		//bg
		game.stage.backgroundColor = "#000000";
		//txt
		var titleText1 = game.add.text((game.world.width/2)-160, (game.world.height/2)-515, "You've been caught...", {font: 'Bookman', fontSize: '48px', fill: '#fff'});
		//var titleText2 = game.add.text((game.world.width/2)-160, (game.world.height/2)-365, "Press [BACKSPACE] to return to main menu.", {font: 'Bookman', fontSize: '48px', fill: '#fff'});
		titleText1.anchor.set(0.5);
		//titleText2.anchor.set(0.5);
	},
	update: function() {
		//restart to mm
	    if(game.input.keyboard.justPressed(Phaser.Keyboard.BACKSPACE)) {
	    	this.sound.stopAll();
			game.state.start("Play");
		}
	}
};