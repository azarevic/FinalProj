var myObj = function (game, key, xpos, ypos, sound) {
    Phaser.Sprite.call(this, game, xpos, ypos, key);
    
    game.physics.enable(this);
    this.body.immovable = true;
    this.body.allowGravity = false;
    this.sound = sound;
}
myObj.prototype = Object.create(Phaser.Sprite.prototype);
myObj.prototype.constructor = myObj;