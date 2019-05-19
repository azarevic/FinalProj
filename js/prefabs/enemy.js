// enemy constructor
var Enemy = function (game, key) {
    Phaser.Sprite.call(this, game, game.rnd.integerInRange(32, game.camera.width - 32), game.rnd.integerInRange(32, game.camera.height - 32), key);
    // physics
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.baseSpeed = 100;
    //do stuff if the monster is in or out of the world
    this.checkWorldBounds = true;
    this.events.onEnterBounds.add(function () {
        this.revive();
        var speed = game.rnd.between(-2, 2);
        console.log("monster inbound " + speed);
        if (speed > 0) {
            this.body.velocity.x = (speed > 1)? this.baseSpeed : -this.baseSpeed;
            this.body.velocity.y = 0;
        }
        else {
            this.body.velocity.x = 0;
            this.body.velocity.y = (speed < -1)? this.baseSpeed : -this.baseSpeed;
        }
    }, this);
    this.events.onOutOfBounds.add(function () {
        console.log("monster out");
        this.kill();
    }, this);
    // movement
    this.anchor.set(0.5);
    // size asset
    this.scale.x = 0.2;
    this.scale.y = 0.2;
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;