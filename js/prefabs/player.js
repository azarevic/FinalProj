//Player prefab

function Player(game, key) {
    Phaser.Sprite.call(this, game, 96, 1448, key);

    //properties
    game.physics.enable(this);
    this.body.allowGravity = false;
    this.body.collideWorldBounds = true;
    this.anchor.setTo(0.5, 0.5);

    //for self containing
    //movement
    this.MAX_VELOCITY = 300;
    this.input = game.input;
    this.cursors = this.input.keyboard.createCursorKeys();
    //light
    this.lightSwitch = true;
    this.MAX_LIGHT_RANGE = 200;
    this.lightRange = this.MAX_LIGHT_RANGE;
    this.LIGHT_FLICKER_BASE = 3;
	this.flickerAmount = this.LIGHT_FLICKER_BASE;
    //hearing
    this.EAR_RANGE = 500;
	this.inHearingRange = false;
}
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function () {
    this.checkLight();
    this.move();
}
Player.prototype.move = function () {
    //move x axis
    if (this.cursors.right.isDown) {
        this.body.velocity.x = this.MAX_VELOCITY;
    }
    else if (this.cursors.left.isDown) {
        this.body.velocity.x = -this.MAX_VELOCITY;
    }
    else {
        this.body.velocity.x = 0;
    }
    //moving y axis
    if (this.cursors.up.isDown) {
        this.body.velocity.y = -this.MAX_VELOCITY;
    }
    else if (this.cursors.down.isDown) {
        this.body.velocity.y = this.MAX_VELOCITY;
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
            console.log("switched to 200");
        }
        else {
            this.lightRange = 0;
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
        }
        if (!sound[0].isPlaying) {
            sound[0].play('', 0, sound[0].volume, true);
        }
        if (!sound[1].isPlaying) {
            sound[1].play('', 0, sound[1].volume, true);
        }
    }
    else {
        sound[0].stop();
        sound[1].stop();
        this.flickerAmount = this.LIGHT_FLICKER_BASE;
    }
}
Player.prototype.getVolPrcnt = function (distance) {
    var compPrcnt = (distance / this.EAR_RANGE);
    return (1 - compPrcnt < 0) ? 0 : 1 - compPrcnt;
}