//Play state

var Play = function (game) {
	this.MAX_VELOCITY = 200;
	this.MAX_LIGHT_RANGE = 200;
	this.usedLightRange = this.MAX_LIGHT_RANGE; //one is MaxLight range, the other is the actual range used
	this.EAR_RANGE = 1000;
	this.inHearingRange = false;
	this.monsterSound = [];
	this.lightSwitch = true; //true = on false = off
	this.bitmapBleed = 32; //how much bigger the bitmap is than the camera
	this.LIGHT_FLICKER_BASE = 3;
	this.flickerAmount = this.LIGHT_FLICKER_BASE;
};
Play.prototype = {
	create: function () {
		//map
		this.map = game.add.tilemap('level');
		this.map.addTilesetImage('trialSprites', 'tilesheet');
		this.floorLayer = this.map.createLayer('ground');
		this.wallsLayer = this.map.createLayer('walls');
		this.map.setCollisionByExclusion([], true, this.wallsLayer);
		this.wallsLayer.resizeWorld();

		console.log("Play");
		//adding physics
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//changin background color
		game.stage.backgroundColor = "#000000";

		//adding player
		this.player = new Player(game, "p1");
		game.add.existing(this.player);

		//adding cursor keys
		cursors = game.input.keyboard.createCursorKeys();

		// add enemy
		this.monster = new Enemy(game, "");
		game.add.existing(this.monster);
		//adding TMP enemy audio
		this.monsterSound[0] = game.add.audio("monsterL");
		this.monsterSound[1] = game.add.audio("monsterR");

		//adding some walls to test ray tracing
		this.walls = game.add.group();
		this.walls.enableBody = true;
		// var i, x, y, tmp;
		// for (i = 0; i < 4; i++) {
		// 	x = i * game.width / 4 + 50;
		// 	y = game.rnd.integerInRange(50, game.height - 200);
		// 	tmp = this.walls.create(x, y, "p1");
		// 	tmp.scale.setTo(3, 3);
		// 	tmp.body.immovable = true;
		// 	tmp.tint = 0x000000;
		// }

		//the camera follows the player object
		game.camera.follow(this.player, 0, 0.5, 0.5);
		//gives enables physics on jewels, keys, doors, and statue
		blueEye = game.add.sprite(1480, 1150, 'blueEye');
		game.physics.enable(blueEye);
		blueEye.enableBody = true;
		yellowEye = game.add.sprite(250, 950, 'yellowEye');
		game.physics.enable(yellowEye);
		yellowEye.enableBody = true;
		key1 = game.add.sprite(1312, 448, 'key');
		game.physics.enable(key1);
		key1.enableBody = true;
		key2 = game.add.sprite(360, 256, 'key');
		game.physics.enable(key2);
		key2.enableBody = true;
		statue = game.add.sprite(1312, 448, 'statue');
		game.physics.enable(statue);
		statue.enableBody = true;
		statue.body.immovable = true;
		statue.scale.setTo(1.5, 1);
		door1 = game.add.sprite(416, 1248, 'door');
		game.physics.enable(door1);
		door1.enableBody = true;
		door1.body.immovable = true;
		door2 = game.add.sprite(832, 128, 'door');
		game.physics.enable(door2);
		door2.enableBody = true;
		door2.body.immovable = true;

		//Create a bitmap texture for drawing light cones
		//this should go at the bottom to cover all srpites 
		//that will be in darkness
		//console.log(game.world.width, game.world.height);
		this.bitmap = game.add.bitmapData(game.world.width, game.world.height);
		this.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
		this.bitmap.context.strokeStyle = 'rgb(255, 255, 255)';
		var lightBitmap = game.add.image(0, 0, this.bitmap);

		//adding blend mode to bitmap (requires webgl on the browser)
		lightBitmap.blendMode = Phaser.blendModes.MULTIPLY;

		// setup monster spawning timer
        this.spawnMonsterTimer = game.time.create(false);	
        this.spawnMonsterTimer.loop(30000, this.spawnMonster, this); 
        this.spawnMonsterTimer.start();
	},
	collectkey1: function () {
		//console.log('key 1 taken')
		keys1 = true;
		key1.destroy();
		//console.log('itll say true if you got the thing ' + blueJewel);
	},
	collectkey2: function () {
		//console.log('key 2 taken')
		keys2 = true;
		key2.destroy();
		//console.log('itll say true if you got the thing ' + blueJewel);
	},
	collectBlueEye: function () {
		//console.log('they overlap')
		blueJewel = true;
		blueEye.destroy();
		//console.log('itll say true if you got the thing ' + blueJewel);
	},
	collectYellowEye: function () {
		//console.log('they overlap')
		yellowJewel = true;
		yellowEye.destroy();
	},
	update: function () {
		this.move();
		this.playMonsterSound();
		this.rayCast();
		game.physics.arcade.overlap(this.player, this.monster, this.colPE, null, this);
		game.physics.arcade.collide(this.player, this.walls);
		//map
		game.physics.arcade.collide(this.player, this.mapLayer);

		//map & object collision
		game.physics.arcade.collide(this.player, this.wallsLayer);
		//stops player from going trhough doors and statue
		game.physics.arcade.collide(this.player, statue);
		game.physics.arcade.collide(this.player, door1);
		game.physics.arcade.collide(this.player, door2);
		//picks up jewels or keys if player overlaps
		game.physics.arcade.overlap(this.player, blueEye, this.collectBlueEye, null, this);
		game.physics.arcade.overlap(this.player, yellowEye, this.collectYellowEye, null, this);
		game.physics.arcade.overlap(this.player, key1, this.collectkey1, null, this);
		game.physics.arcade.overlap(this.player, key2, this.collectkey2, null, this);
		//if player have the keys or jewels, it opens doors and destroys statue
		if (keys2 == true && this.player.x > door1.x && this.player.y > door1.y) {
			door1.destroy();
		}
		if (keys1 == true && this.player.x > door2.x && this.player.x < (door2.x + 100) && this.player.y > door2.y) {
			door2.destroy();
		}

		if (yellowJewel == true && this.player.x > 1248 && this.player.x < 1344 && this.player.y > 448 && this.player.y < 480) {
			statue.destroy();
		}
	},
	move: function () {
		//light on/off
		if (game.input.keyboard.justPressed(Phaser.Keyboard.F)) {
			this.lightSwitch = (this.lightSwitch == true) ? false : true;//negating its value makes it 1 or -1 rendering the else if below useless	
			if (this.lightSwitch) {
				this.usedLightRange = 200;
				console.log("switched to 200");
			}
			else {
				this.usedLightRange = 0;
				console.log("switched to 0");
			}
		}
		//moving x axis
		if (cursors.right.isDown) {
			this.player.body.velocity.x = this.MAX_VELOCITY;
		}
		else if (cursors.left.isDown) {
			this.player.body.velocity.x = -this.MAX_VELOCITY;
		}
		else {
			this.player.body.velocity.x = 0;
		}

		//moving y axis
		if (cursors.up.isDown) {
			this.player.body.velocity.y = -this.MAX_VELOCITY;
		}
		else if (cursors.down.isDown) {
			this.player.body.velocity.y = this.MAX_VELOCITY;
		}
		else {
			this.player.body.velocity.y = 0;
		}
	},
	colPE: function (player, enemy) {
		player.kill();
		enemy.kill();
		this.monsterSound[0].stop();
		this.monsterSound[1].stop();
		this.spawnMonsterTimer.stop();
		game.state.start("GameOver");
	},
	//adapted from: https://gamemechanicexplorer.com/#raycasting-2
	rayCast: function () {
		//fill the entire light bitmap with a dark shadow color.
		this.bitmap.context.fillStyle = 'rgb(0, 0, 0)';
		this.bitmap.context.fillRect(game.camera.x, game.camera.y, game.camera.width + this.bitmapBleed, game.camera.height + this.bitmapBleed);
		var rayLength = (this.lightSwitch)? game.rnd.integerInRange(-this.flickerAmount, this.LIGHT_FLICKER_BASE) : 0; //animates the light flickering, this will be used by how close you are to the monster
		// Ray casting!
		// Cast rays at intervals in a large circle around the light.
		// Save all of the intersection points or ray end points if there was no intersection.
		var points = [];
		for (var a = 0; a < Math.PI * 2; a += Math.PI / 360) {
			var ray = new Phaser.Line(this.player.x, this.player.y,
				this.player.x + Math.cos(a) * this.usedLightRange, this.player.y + Math.sin(a) * this.usedLightRange);//last 2 parameters indicate length

			// Check if the ray intersected any walls
			var intersect = this.getWallIntersection(ray);

			// Save the intersection or the end of the ray
			if (intersect) {
				points.push(intersect);
			} else {
				points.push(ray.end);
			}
		}
		// Draw circle of light with a soft edge
		var gradient = this.bitmap.context.createRadialGradient(
			this.player.x, this.player.y, this.usedLightRange * 0.75 + rayLength,
			this.player.x, this.player.y, this.usedLightRange + rayLength);
		gradient.addColorStop(0, 'rgba(255, 225, 200, 1.0)');
		gradient.addColorStop(1, 'rgba(255, 225, 200, 0.0)');
		// Connect the dots and fill in the shape, which are cones of light,
		// with a bright white color. When multiplied with the background,
		// the white color will allow the full color of the background to
		// shine through.
		this.bitmap.context.beginPath();
		this.bitmap.context.fillStyle = gradient;//"rgb(255, 255, 255)"; //from 0 to 255. 255 is pitch black, 0 is clear
		this.bitmap.context.moveTo(points[0].x, points[0].y);
		for (var i = 0; i < points.length; i++) {
			this.bitmap.context.lineTo(points[i].x, points[i].y);
		}
		this.bitmap.context.closePath();
		this.bitmap.context.fill();

		// This just tells the engine it should update the texture cache
		this.bitmap.dirty = true;
	},
	// Given a ray, this function iterates through all of the walls and
	// returns the closest wall intersection from the start of the ray
	// or null if the ray does not intersect any walls.
	//from: https://gamemechanicexplorer.com/#raycasting-2
	getWallIntersection: function (ray) {
		var distanceToWall = Number.POSITIVE_INFINITY;
		var closestIntersection = null;

		// For each of the walls...
		this.walls.forEach(function (wall) {
			// Create an array of lines that represent the four edges of each wall
			var lines = [
				new Phaser.Line(wall.x, wall.y, wall.x + wall.width, wall.y),
				new Phaser.Line(wall.x, wall.y, wall.x, wall.y + wall.height),
				new Phaser.Line(wall.x + wall.width, wall.y,
					wall.x + wall.width, wall.y + wall.height),
				new Phaser.Line(wall.x, wall.y + wall.height,
					wall.x + wall.width, wall.y + wall.height)
			];

			// Test each of the edges in this wall against the ray.
			// If the ray intersects any of the edges then the wall must be in the way.
			for (var i = 0; i < lines.length; i++) {
				var intersect = Phaser.Line.intersects(ray, lines[i]);
				if (intersect) {
					// Find the closest intersection
					distance =
						game.math.distance(ray.start.x, ray.start.y, intersect.x, intersect.y);
					if (distance < distanceToWall) {
						distanceToWall = distance;
						closestIntersection = intersect;
					}
				}
			}
		}, this);
		return closestIntersection;
	},
	playMonsterSound: function () {
		var xDistance = this.player.x - this.monster.x;
		var volumePrcnt;
		xDistance = (xDistance < 0) ? -xDistance : xDistance; //abs value

		//Takes care of panning
		if (isInRange(this.player.position, this.monster.position, this.EAR_RANGE)) {
			//volumePrcnt = this.adjustMonsterVolumePrcnt();

			if (this.player.x > this.monster.x) {
				this.monsterSound[1].volume = (this.EAR_RANGE - xDistance) / this.EAR_RANGE;
				volumePrcnt = this.getVolPrcnt(getDistanceBetween2Points(this.player.position, this.monster.position));
				this.monsterSound[1].volume = this.monsterSound[1].volume * volumePrcnt;
				this.monsterSound[0].volume = 1 * volumePrcnt;
			}
			else {
				this.monsterSound[0].volume = (this.EAR_RANGE - xDistance) / this.EAR_RANGE;
				volumePrcnt = this.getVolPrcnt(getDistanceBetween2Points(this.player.position, this.monster.position));
				this.monsterSound[0].volume = this.monsterSound[0].volume * volumePrcnt;
				this.monsterSound[1].volume = 1 * volumePrcnt;
			}
			this.flickerAmount = this.LIGHT_FLICKER_BASE + volumePrcnt * 15;
			if (!this.monsterSound[0].isPlaying) {
				this.monsterSound[0].play('', 0, this.monsterSound[0].volume, true);
			}
			if (!this.monsterSound[1].isPlaying) {
				this.monsterSound[1].play('', 0, this.monsterSound[1].volume, true);
			}
		}
		else {
			this.monsterSound[0].stop();
			this.monsterSound[1].stop();
			this.flickerAmount = this.LIGHT_FLICKER_BASE;
		}
	},
	getVolPrcnt: function (distance) {
		var compPrcnt = (distance / 320);
		return (1 - compPrcnt < 0) ? 0 : 1 - compPrcnt;
	},
	spawnMonster : function () {
		console.log("relocating creature...");
		console.log("monster pos before reloc:" + this.monster.x + ", " + this.monster.y);
		this.monster.x = game.rnd.integerInRange(32, game.camera.width - 32);
		this.monster.y = game.rnd.integerInRange(32, game.camera.height - 32);
	}
};
