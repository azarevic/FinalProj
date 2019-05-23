// Load state

var Load = function(game) {};
Load.prototype = {
	preload: function() {
		console.log("Load");

		// setup loading bar
		var loadingBar = this.add.sprite(game.width/2, game.height/2, "loading");
		loadingBar.anchor.set(0.5);
		game.load.setPreloadSprite(loadingBar);

		// load graphics assets
		game.load.path = "assets/img/";
		game.load.image("p1", "p1.png");
		game.load.image("monster", "monster.png")
		
		//placeholder map and objects
        game.load.image("blueEye", "blue jewel.png");
		game.load.image("yellowEye", "yellow jewel.png");
		game.load.image("key", "key.png");
		game.load.image('door', 'door.png');
		game.load.spritesheet('statue', 'statue.png', 64, 32);
		game.load.tilemap('level', 'trialMap.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('tilesheet', 'trialSprites.png', 32, 32);
		
		// load audio assets
		game.load.path = "assets/audio/";
		game.load.audio("monsterL", "monsterL.mp3");
		game.load.audio("monsterR", "monsterR.mp3");
		game.load.audio("chase", "ISeeU.mp3");
	},
	create: function() {
		game.state.start("MainMenue");
	}
};
