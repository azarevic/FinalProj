var key = function (game, key, xpos, ypos, id) {
    myObj.call(this, game, key, xpos, ypos);
    this.name = key;
    this.id = id;
}
key.prototype = Object.create(myObj.prototype);
key.prototype.constructor = key;