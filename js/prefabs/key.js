var key = function (game, key, xpos, ypos, id) {
    myObj.call(this, game, key, xpos, ypos);
    this.scale.x = 0.025;
    this.scale.y = 0.025;
    this.name = key;
    this.id = id;
}
key.prototype = Object.create(myObj.prototype);
key.prototype.constructor = key;