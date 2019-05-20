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
    this.MAX_VELOCITY = 200;
    this.input = game.input;
    this.cursors = this.input.keyboard.createCursorKeys();
    //light
    this.lightSwitch = true;
    this.MAX_LIGHT_RANGE = 200;
	this.lightRange = this.MAX_LIGHT_RANGE;
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