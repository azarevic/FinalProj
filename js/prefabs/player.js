//Player prefab

function Player(game, key, atlas, monster) {
    Phaser.Sprite.call(this, game, 96, 1448, 'playspr', key);

    //properties
    game.physics.enable(this);
    this.scale.x = 0.035;
    this.scale.y = 0.035;
    this.body.allowGravity = false;
    this.body.collideWorldBounds = true;
    this.anchor.setTo(0.5, 0.5);
    this.name = "player";
    //movement
    this.MAX_VELOCITY = 300;
    this.input = game.input;
    this.cursors = this.input.keyboard.createCursorKeys();
    //animations
    this.animations.add('left', ['p3'], 10, true, false);
    this.animations.add('right', ['p2'], 10, true, false);
    this.animations.add('up', ['p4'], 10, true, false);
    this.animations.add('down', ['p1'], 10, true, false);
    this.animations.add('still', ['p1'], 10, true, false);
    //light
    this.lightSwitch = true;
    this.MAX_LIGHT_RANGE = 200;
    this.lightRange = this.MAX_LIGHT_RANGE;
    this.LIGHT_FLICKER_BASE = 3;
    this.flickerAmount = this.LIGHT_FLICKER_BASE;
    //hearing
    this.EAR_RANGE = 500;
    this.inHearingRange = false;
    //music
    this.chaseSong = game.add.audio("chase");
    this.pickUpSound = game.add.audio("pickUp");
    this.fading = true;
    //monster activation
    this.monster = monster;
    //inventory
    this.inventory = [];
    this.inventoryDisplay = game.add.group();
    this.camOffSet = 32;
}
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function () {
    this.checkLight();
    this.move();
}
Player.prototype.move = function () {
    //move x axis
    this.animations.play('still');
    if (this.cursors.right.isDown) {
        this.body.velocity.x = this.MAX_VELOCITY;
        this.animations.play('right');
    }
    else if (this.cursors.left.isDown) {
        this.body.velocity.x = -this.MAX_VELOCITY;
        this.animations.play('left');
    }
    else {
        this.body.velocity.x = 0;
    }
    //moving y axis
    if (this.cursors.up.isDown) {
        this.body.velocity.y = -this.MAX_VELOCITY;
        this.animations.play('up');
    }
    else if (this.cursors.down.isDown) {
        this.body.velocity.y = this.MAX_VELOCITY;
        this.animations.play('down');
    }
    else {
        this.body.velocity.y = 0;
    }
}
Player.prototype.checkLight = function () {
    if (this.input.keyboard.justPressed(Phaser.Keyboard.F)) {
        this.lightSwitch = (this.lightSwitch == true) ? false : true;
        if (this.lightSwitch) {
            this.lightRange = 200;
            this.tint = 0xffffff;
            console.log("switched to 200");
        }
        else {
            this.lightRange = 0;
            this.tint = 0x000000;
            console.log("switched to 0");
        }
    }
}
Player.prototype.listen = function (objs) {
    objs.forEachAlive(function (item) {
        var threat = item.name == "monster";
        this.playSound(item.sound, item.position, threat);
    }, this);
}
Player.prototype.playSound = function (sound, position, threat) {
    var xDistance = this.x - position.x;
    var volumePrcnt;
    xDistance = (xDistance < 0) ? -xDistance : xDistance; //abs value

    //Takes care of panning
    if (isInRange(this.position, position, this.EAR_RANGE)) {
        volumePrcnt = this.getVolPrcnt(getDistanceBetween2Points(this.position, position));
        if (this.x > position.x) {
            sound[1].volume = (this.EAR_RANGE - xDistance) / this.EAR_RANGE;
            sound[1].volume = sound[1].volume * volumePrcnt;
            sound[0].volume = 1 * volumePrcnt;
        }
        else {
            sound[0].volume = (this.EAR_RANGE - xDistance) / this.EAR_RANGE;
            sound[0].volume = sound[0].volume * volumePrcnt;
            sound[1].volume = 1 * volumePrcnt;
        }
        if (threat) {
            this.flickerAmount = this.LIGHT_FLICKER_BASE + volumePrcnt * 30;
            this.playChaseSong(position);
        }
        sound[0].play('', 0, sound[0].volume, true, false);
        sound[1].play('', 0, sound[1].volume, true, false);
    }
    else {
        sound[0].stop();
        sound[1].stop();
        this.flickerAmount = this.LIGHT_FLICKER_BASE;
        this.fadeChaseSong();
    }
}
Player.prototype.getVolPrcnt = function (distance) {
    var compPrcnt = (distance / this.EAR_RANGE);
    return (1 - compPrcnt < 0) ? 0 : 1 - compPrcnt;
}
Player.prototype.playChaseSong = function (position) {
    if (isInRange(this.position, position, this.lightRange)) {
        this.chaseSong.play('', 0, 0.8, true, false);
        this.fading = false;
        this.monster.startChase(this.position);
    }
}
Player.prototype.fadeChaseSong = function() {
    if (!this.fading) {
        this.monster.stopChase();
        this.chaseSong.fadeOut(1000);
        this.fading = true;
    }
}
Player.prototype.pickUpItem = function(item) {
    console.log("Item collected: " + item.name);
    this.inventory.push(item.id);
    if (this.inventory.length > 1) {
        this.inventory.sort(function(a, b){return a - b});
    }
    this.pickUpSound.play('', 0, 0.8, false, false);
    this.addToInventDisplay(item);
}
Player.prototype.addToInventDisplay = function(item) {
    item.fixedToCamera = true;
    item.cameraOffset.setTo(this.camOffSet * this.inventory.length, this.camOffSet);
    item.body.checkCollision.none = true;
    this.inventoryDisplay.add(item);
}
Player.prototype.shiftInventDisplay = function(index) {
    var count = 0;
    this.inventoryDisplay.forEachAlive(function (item) {
        if (count == index) {
            item.cameraOffset.setTo(item.position.x - this.camOffSet, this.camOffSet);
        }
        count++;
    }, this);
}
Player.prototype.displayInventory = function () {
    for (let i = 0; i < this.inventory.length; i++) {
        console.log("	" + this.inventory[i]);
    }
}