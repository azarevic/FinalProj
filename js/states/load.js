// Load state

var Load = function (game) { };
Load.prototype = {
	preload: function () {
		console.log("Load");

		// setup loading bar
		var loadingBar = this.add.sprite(game.width / 2 - 160, game.height / 2, "loading");
		game.load.setPreloadSprite(loadingBar);

		// load graphics assets
		game.load.path = "assets/img/";
		game.load.image("monster", "monster.png");
		game.load.atlas('playspr', 'playersprites.png', 'playersprites.json');

		// menu light
		game.load.atlas('light', 'light.png', 'light.json');

		// map and objects
		game.load.text('dialog1', 'Dialog1.JSON');
		game.load.text('dialog2', 'Dialog2.JSON');
		game.load.image('dialogbox', 'dialogbox.png');
		this.load.bitmapFont('font', 'font.png', 'font.fnt');
		game.load.image("blueEye", "blueEye.png");
		game.load.image("yellowEye", "yellowEye.png");
		game.load.image("key", "finalKey.png");
		game.load.image('door', 'finalDoor.png');
		game.load.image('statue', 'statue1.png');
		game.load.tilemap('level', 'trialMap.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('tilesheet', 'trialSprites.png', 32, 32);
		game.load.image("note", "note.png");
		game.load.image("warp", "warpArea.png");
		game.load.image("end", "endthing.png");
		game.load.image("door2", "finalDoor2.png");
		game.load.image("cross", "cross.png");
		game.load.image("painting", "painting.jpg");
		//resized coffins
		game.load.image("coffinI", "coffinI.png");
		game.load.image("coffinII", "coffinII.png");
		game.load.image("coffinIII", "coffinIII.png");
		game.load.image("coffinV", "coffinV.png");
		game.load.image("coffinL", "coffinL.png");
		game.load.image("coffinC", "coffinC.png");
		game.load.image("coffinX", "coffinX.png");
		game.load.image("coffinD", "coffinD.png");
		game.load.image("coffin?", "coffin3.png");

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
	create: function () {
		game.state.start("MainMenue");
	}
};
