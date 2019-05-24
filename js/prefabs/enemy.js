// enemy constructor
var Enemy = function (game, key) {
    //Phaser.Sprite.call(this, game, game.rnd.integerInRange(32, game.camera.width - 32), game.rnd.integerInRange(32, game.camera.height - 32), key);
    Phaser.Sprite.call(this, game, 640, 920, key);
    // physics
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.baseSpeed = 50;
    //this.body.velocity.x = this.baseSpeed;
    //do stuff if the monster is in or out of the world
    this.checkWorldBounds = true;
    this.events.onEnterBounds.add(function () {
        //this.revive();
        var speed = game.rnd.between(-2, 2);
        console.log("monster inbound " + speed);
        if (speed > 0) {
            this.body.velocity.x = (speed > 1) ? this.baseSpeed : -this.baseSpeed;
            this.body.velocity.y = 0;
        }
        else {
            this.body.velocity.x = 0;
            this.body.velocity.y = (speed < -1) ? this.baseSpeed : -this.baseSpeed;
        }
    }, this);
    this.events.onOutOfBounds.add(function () {
        console.log("monster out");
        //this.kill();
    }, this);
    // movement
    this.anchor.set(0.5);
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
Enemy.prototype.chase = function(position) {
    var angle = calcAngleDegrees(position, this.position);
    var absAngle ;
    var angleSign = (angle < 0) ? -1: 1;
    if (angle < 0) {absAngle = -angle; angleSign = -1;}
    else {absAngle = angle; angleSign = 1;}
    
    if (absAngle <= 45) {
        this.body.velocity.y = this.baseSpeed;
        
    }
    else if (absAngle >= 135) {
        this.body.velocity.y = -this.baseSpeed;
    }
    else {
        this.body.velocity.y = 0;
        this.body.velocity.x = this.baseSpeed * angleSign;
    }
}