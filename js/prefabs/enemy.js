// enemy constructor
var Enemy = function(game, key) {
    Phaser.Sprite.call(this, game, 320, 320, key);
    // physics
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    // movement
    this.anchor.set(0.5);
    var speed = game.rnd.between(-10, 9);
    if(speed > 0) {
        //this.body.velocity.x = 10;
    }
    else {
        //this.body.velocity.y = 10;
    }
    // size asset
    this.scale.x = 0.2;
    this.scale.y = 0.2;
    
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;