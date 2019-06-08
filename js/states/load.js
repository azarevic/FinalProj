// Load state

var Load = function(game) {};
Load.prototype = {
	preload: function() {
		console.log("Load");

		// setup loading bar
		var loadingBar = this.add.sprite(game.width/2 - 160, game.height/2, "loading");
		game.load.setPreloadSprite(loadingBar);

		// load graphics assets
		game.load.path = "assets/img/";
		game.load.image("monster", "monster.png");
		game.load.atlas('playspr', 'playersprites.png', 'playersprites.json');

		// menu light
		game.load.atlas('light', 'light.png', 'light.json');
		
		//placeholder map and objects
        game.load.image("blueEye", "blueEye.png");
		game.load.image("yellowEye", "yellowEye.png");
		game.load.image("key", "finalKey.png");
		game.load.image('door', 'finalDoor.png');
		game.load.spritesheet('statue', 'statue.png', 64, 32);
		game.load.tilemap('level', 'trialMap.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('tilesheet', 'trialSprites.png', 32, 32);
		game.load.image("note", "note.png");
		game.load.image("painting", "painting.jpg");
		game.load.path = "assets/maps/";
		//placeholder map and objects

		game.load.tilemap('level1', 'map1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('level2', 'trialMap.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('level3', 'map3.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('level4', 'map4.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('level5', 'map5.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('level6', 'map6.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('level7', 'map7.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('level8', 'map8.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('tilesheet1', 'spritesheetfinal_.png', 32, 32);
		game.load.spritesheet('tilesheet2', 'decorations.png', 32, 32);
		
		// load audio assets
		game.load.path = "assets/audio/";
		game.load.audio("monsterL", "monsterL.mp3");
		game.load.audio("monsterR", "monsterR.mp3");
		game.load.audio("pickUp", "pickUp.mp3");
		game.load.audio("chase", "ISeeU.mp3");
		game.load.audio("menue", "menue.wav");
	},
	create: function() {
		game.state.start("MainMenue");
	}
};
