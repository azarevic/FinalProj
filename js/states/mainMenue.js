// MainMenue state

var MainMenue = function(game) {};
MainMenue.prototype = {
	create: function() {
		console.log("MainMenue");
		game.stage.backgroundColor = "#000000";
		// add title screen text
		var titleText1 = game.add.text(game.world.width/2, 200, "[Title]\n", {font: 'Bookman', fontSize: '64px', fill: '#fff'});
		var titleText2 = game.add.text(game.world.width/2, game.world.height/2, "Press [SPACE] to start\n", {font: 'Bookman', fontSize: '48px', fill: '#fff'});
		var titleText3 = game.add.text(game.world.width/2, (game.world.height/2)+75, "Press [T] for Controls\n", {font: 'Bookman', fontSize: '48px', fill: '#fff'});
		var titleText4 = game.add.text(game.world.width/2, (game.world.height/2)+150, "Press [C] for credits\n", {font: 'Bookman', fontSize: '48px', fill: '#fff'});
		titleText1.anchor.set(0.5);
		titleText2.anchor.set(0.5);
		titleText3.anchor.set(0.5);
		titleText4.anchor.set(0.5);
		//titleText.textAlign(center);

		//addlight
		light = game.add.sprite(game.world.width/2, game.world.height/2, 'light', 'med');
		light.scale.x = 0.7;
		light.scale.y = 0.7;
		light.anchor.set(0.5);
		light.animations.add('flicker', ['low', 'low', 'med', 'med', 'med', 'med', 'med', 'low', 'med', 'med', 'med', 'med', 'med', 'bright', 'bright', 'bright', 'med', 'med', 'bright', 'bright'], 10, true, false);

		//music
		this.menuMusic = game.add.audio('menue');
		if(musicisPlaying == false){
			this.menuMusic.play('', 0, 0.2, true);
			musicisPlaying = true;
		}
		
	},
	update: function() {
		// start animations
		light.animations.play('flicker');
		// change states
		if(game.input.keyboard.justPressed(Phaser.Keyboard.T)) {
			game.state.start("Tutorial");
		}
		if(game.input.keyboard.justPressed(Phaser.Keyboard.C)) {
			game.state.start("Credits");
		}
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			if(musicisPlaying == true){
				this.menuMusic.stop();
				musicisPlaying = false;
			}
			game.state.start("Play");
		}
	}
};