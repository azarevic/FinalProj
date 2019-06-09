// MainMenue state

var MainMenue = function(game) {};
MainMenue.prototype = {
	create: function() {
		console.log("MainMenue");
		game.stage.backgroundColor = "#000000";
		// add title screen text
		var titleText2 = game.add.text(game.world.width/2, game.world.height/2, "Press [SPACE] to start\n", {font: 'Almendra', fontSize: '48px', fill: '#fff'});
		var titleText3 = game.add.text(game.world.width/2, (game.world.height/2)+75, "Press [F] for Controls\n", {font: 'Almendra', fontSize: '48px', fill: '#fff'});
		var titleText4 = game.add.text(game.world.width/2, (game.world.height/2)+150, "Press [C] for Credits\n", {font: 'Almendra', fontSize: '48px', fill: '#fff'});
		titleText2.anchor.set(0.5);
		titleText3.anchor.set(0.5);
		titleText4.anchor.set(0.5);

		//addlight
		light = game.add.sprite(game.world.width/2, game.world.height/2, 'light', 'med');
		light.scale.x = 0.7;
		light.scale.y = 0.7;
		light.anchor.set(0.5);
		light.animations.add('flicker', ['low', 'low', 'med', 'med', 'med', 'med', 'med', 'low', 'med', 'med', 'med', 'med', 'med', 'bright', 'bright', 'bright', 'med', 'med', 'bright', 'bright'], 10, true, false);

		var titleText5 = game.add.text((game.world.width/2)+5, 200+5, "Noctem Aeternam\n", {font: 'Almendra', fontSize: '64px', fill: '#000'});
		var titleText1 = game.add.text(game.world.width/2, 200, "Noctem Aeternam\n", {font: 'Almendra', fontSize: '64px', fill: '#fff'});
		titleText5.anchor.set(0.5);
		titleText1.anchor.set(0.5);

		//music
		this.menuMusic = game.add.audio('menue');
		if(musicisPlaying == false){
			this.menuMusic.play('', 0, 0.2, true);
			musicisPlaying = true;
		}
		game.player = new Player(game, "p1");
		//game.add.existing(game.player);
		console.log(game.player);
	},
	update: function() {
		// start animations
		light.animations.play('flicker');
		// change states
		if(game.input.keyboard.justPressed(Phaser.Keyboard.F)) {
			game.state.start("Tutorial");
		}
		if(game.input.keyboard.justPressed(Phaser.Keyboard.C)) {
			game.state.start("Credits");
		}
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			this.menuMusic.stop();
			musicisPlaying = false;
			game.state.start("Level6");
			//game.state.start("Play", true, false, customParam1, customParam2);﻿
		}
	}
};