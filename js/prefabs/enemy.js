// enemy constructor
var Enemy = function (game, key) {
    Phaser.Sprite.call(this, game, game.rnd.integerInRange(game.camera.x + 32, game.camera.width - 32), game.rnd.integerInRange(game.camera.y + 32, game.camera.height - 32), key);
    //Phaser.Sprite.call(this, game, 640, 920, key);
    // physics
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.BASE_SPEED = 50;
    this.speed = this.BASE_SPEED;
    this.body.velocity.x = this.speed;
    //do stuff if the monster is in or out of the world
    this.checkWorldBounds = true;
    this.events.onEnterBounds.add(function () {
        //this.revive();
        var chance = game.rnd.between(-2, 2);
        console.log("monster inbound " + chance);
        if (chance > 0) {
            this.body.velocity.x = (chance > 1) ? this.speed : -this.speed;
            this.body.velocity.y = 0;
        }
        else {
            this.body.velocity.x = 0;
            this.body.velocity.y = (chance < -1) ? this.speed : -this.speed;
        }
    }, this);
    this.events.onOutOfBounds.add(function () {
        console.log("monster out");
        this.respawn();
        //this.kill();
    }, this);
    // movement
    this.anchor.set(0.5);
    this.chaseFlag = false;
    this.target;
    // size asset
    this.scale.x = 0.2;
    this.scale.y = 0.2;

    //monster Sound
    this.sound = [];
    this.sound[0] = game.add.audio("monsterL");
    this.sound[1] = game.add.audio("monsterR");
    //monster name (already included in sprite class)
    this.name = "monster";
}
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = function () {
    if (this.chaseFlag) {
        this.chase(this.target);
    }
}
Enemy.prototype.chase = function (position) {
    var angle = calcAngleDegrees(position, this.position);
    var absAngle;
    var angleSign;
    if (angle < 0) { absAngle = -angle; angleSign = -1; }
    else { absAngle = angle; angleSign = 1; }

    this.speed = 3 * this.BASE_SPEED;

    if (absAngle <= 45) {
        this.body.velocity.y = this.speed;
    }
    else if (absAngle >= 135) {
        this.body.velocity.y = -this.speed;
    }
    else {
        this.body.velocity.y = 0;
        this.body.velocity.x = this.speed * angleSign;
    }
}
Enemy.prototype.startChase = function (position) {
    this.chaseFlag = true;
    this.target = position;
}
Enemy.prototype.stopChase = function () {
    this.chaseFlag = false;
    this.speed = this.BASE_SPEED;
}
Enemy.prototype.respawn = function () {
    console.log("relocating creature...");
    this.position.x = game.rnd.integerInRange(game.camera.x + 32, game.camera.width - 32);
    this.position.y = game.rnd.integerInRange(game.camera.y + 32, game.camera.height - 32);
    console.log("monster pos:" + this.position.x + ", " + this.position.y);

}