//Level2 state

var Level2 = function (game) {
	this.i = 0; //variable for tutorial text loop
	this.bitmapBleed = 64; //how much bigger the bitmap is than the camera
};
Level2.prototype = {
	create: function () {
		//stop music
		this.sound.stopAll();
		this.words = '' + this.words;//dialog/tutorial
		//map
		this.map = game.add.tilemap('level2');
		this.map.addTilesetImage('tileset', 'tilesheet1');
		this.map.addTilesetImage('decorations', 'tilesheet2');
		this.floorLayer = this.map.createLayer('ground');
		this.wallsLayer = this.map.createLayer('walls');
		this.decorationsLayer = this.map.createLayer('decorations');
		this.map.setCollisionByExclusion([], true, this.wallsLayer);
		this.wallsLayer.resizeWorld();

		console.log("Play");
		//adding physics
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//changin background color
		game.stage.backgroundColor = "#000000";

		//adding a group for the objs the player can hear
		this.noiseMakers = game.add.group();
		this.noiseMakers.enableBody = true;
		//group for solid objects
		this.keys = game.add.group();
		this.keys.enableBody = true;
		this.locks = game.add.group();
		this.locks.enableBody = true;

		// add enemy
		this.monster = new Enemy(game, "p1");
		game.add.existing(this.monster);
		this.noiseMakers.add(this.monster);

		//adding some walls to test ray tracing
		this.walls = game.add.group();
		this.walls.enableBody = true;
		this.painting = game.add.sprite(736, 1536, 'painting');//painting for puzzle
		this.painting.enableBody = true;
		game.physics.enable(this.painting);
    		this.painting.body.immovable = true;
    		this.painting.body.allowGravity = false;
		this.addObjects();
		//Create a bitmap texture for drawing light cones
		//this should go at the bottom to cover all srpites 
		//that will be in darkness
		this.bitmap = game.add.bitmapData(game.world.width, game.world.height);
		this.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
		this.bitmap.context.strokeStyle = 'rgb(255, 255, 255)';
		var lightBitmap = game.add.image(0, 0, this.bitmap);

		//adding player
		this.player = new Player(game, "p1", this.monster);
		game.add.existing(this.player);
		//the camera follows the player object
		game.camera.follow(this.player, 0, 0.5, 0.5);

		//adding blend mode to bitmap (requires webgl on the browser)
		lightBitmap.blendMode = Phaser.blendModes.MULTIPLY;
		
		this.showNarration();//shows dialog/information/tutorial
	},
	update: function () {
		this.player.listen(this.noiseMakers);
		this.rayCast();
		game.physics.arcade.overlap(this.player, this.monster, this.colPE, null, this);
		//map
		game.physics.arcade.collide(this.player, this.mapLayer);
		//This text updates with dialog and information
		this.conversationText.text = this.words;

		//map & object collision
		game.physics.arcade.collide(this.player, this.walls);
		game.physics.arcade.collide(this.player, this.wallsLayer);
		game.physics.arcade.collide(this.player, this.locks);
		game.physics.arcade.overlap(this.player, this.keys, this.collectItem, null, this);
		//console.log(lightening);
		this.game.physics.arcade.collide(this.player, this.painting);
		this.introDialogue();//this calls the method that displays the tutorial
		if(lightening === false){
			this.painting.body.immovable = false;
		}else {
			this.painting.body.immovable = true;
		}
		this.introDialogue();//this calls the method that displays the tutorial
	},
	colPE: function (player, enemy) {
		player.kill();
		enemy.kill();
		this.monster.sound[0].stop();
		this.monster.sound[1].stop();
		game.state.start("GameOver");
	},
	//adapted from: https://gamemechanicexplorer.com/#raycasting-2
	rayCast: function () {
		//fill the entire light bitmap with a dark shadow color.
		this.bitmap.context.fillStyle = 'rgb(0, 0, 0)';//'rgb(255, 255, 255)';
		this.bitmap.context.fillRect(game.camera.x - this.bitmapBleed / 2, game.camera.y - this.bitmapBleed / 2, game.camera.width + this.bitmapBleed, game.camera.height + this.bitmapBleed);
		var rayLength = (this.player.lightSwitch) ? game.rnd.integerInRange(-this.player.flickerAmount, this.player.LIGHT_FLICKER_BASE) : 0; //animates the light flickering, this will be used by how close you are to the monster
		// Ray casting!
		// Cast rays at intervals in a large circle around the light.
		// Save all of the intersection points or ray end points if there was no intersection.
		var points = [];
		for (var a = 0; a < Math.PI * 2; a += Math.PI / 360) {
			var ray = new Phaser.Line(this.player.x, this.player.y,
				this.player.x + Math.cos(a) * this.player.lightRange, this.player.y + Math.sin(a) * this.player.lightRange);//last 2 parameters indicate length

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
			this.player.x, this.player.y, this.player.lightRange * 0.75 + rayLength,
			this.player.x, this.player.y, this.player.lightRange + rayLength);
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
	addObjects: function () {
		var j, i;
		var obj;
		for (i = 0, j = -1; i < objs.length; i += 3) {
			if (objs[i] == 0) {
				obj = new lock(game, objs[i + 1], objs[i + 2].x, objs[i + 2].y);
				game.add.existing(obj);
				this.locks.add(obj);
				j++;
			}
			else {
				if (this.locks.children[j] != undefined) {
					obj = new key(game, objs[i + 1], objs[i + 2].x, objs[i + 2].y, objs[i]);
					game.add.existing(obj);
					this.keys.add(obj);
					this.locks.getChildAt(j).addId(objs[i]);
				}
				else {
					console.log("OBJS ARRAY ERROR: an undefined lock found");
				}
			}
		}
	},
	showNarration: function() {
    	//this function shows the tutorial and other information text  
    	var text = '0';
        style = { font: '40px Arial', fill: '#fff', align: 'center' };
        this.conversationText = this.game.add.text(120, 510, text, style);
        this.conversationText.fixedToCamera = true;
    },
    introDialogue: function() {
		//tutorial text, this adds the text
 		var wordsArray = new Array();
 		wordsArray[0] = "Use arrow keys to move\nPress D to continue";
 		wordsArray[1] = "Press F to turn on/off the lights\nPress D to continue";
 		wordsArray[2] = "Stand on Help boxes to ask for help\nPress D to continue";
 		wordsArray[3] = "";
 		
 		if (this.i < 3 && game.input.keyboard.justPressed(Phaser.Keyboard.D)) {
			this.i++;
			
		} 
		this.words = wordsArray[this.i];
	},
	collectItem: function (player, item) {
		player.pickUpItem(item);
		this.player.displayInventory();
	},
	displayKeysNeeded: function (group) {
		group.forEachAlive(function (item) {
			console.log(item);
			for (let i = 0; i < item.ids.length; i++) {
				console.log("	" + item.ids[i]);
			}
		}, this);
	},
};
