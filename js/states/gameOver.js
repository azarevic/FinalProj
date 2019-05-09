//Game Over state

var GameOver = function(game) {};
GameOver.prototype = {
	create: function() {
		console.log("GameOver");
		game.stage.backgroundColor = "#000000";
		var titleText = game.add.text(game.width/2, game.height/2, "game over...", {font: 'Helvetica', fontSize: '48px', fill: '#fff'});
		titleText.anchor.set(0.5);
		//titleText.align("center");
	},
	update: function() {
	    if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.state.start("MainMenue");
		}
	}
};