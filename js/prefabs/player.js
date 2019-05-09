//Player prefab

function Player(game, key) {
    Phaser.Sprite.call(this, game, 96, 1448, key);

    //properties
    game.physics.enable(this);
    this.body.allowGravity = false;
    this.body.collideWorldBounds = true;
    this.anchor.setTo(0.5, 0.5);
}
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function () {
    //game.world.wrap(this, 16, false);
    
}