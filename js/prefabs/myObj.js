var myObj = function (game, key, xpos, ypos) {
    //console.log("\n\ngame: " + game, "\nkey: " + key + "\nxpos: " + xpos + "\nypos: " + ypos);
    Phaser.Sprite.call(this, game, xpos, ypos, key);

    game.physics.enable(this);
    this.body.immovable = true;
    this.body.allowGravity = false;
    
}
myObj.prototype = Object.create(Phaser.Sprite.prototype);
myObj.prototype.constructor = myObj;