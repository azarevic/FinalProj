var key = function (game, key, xpos, ypos, sound, names, ids) {
    myObj.call(game, key, xpos, ypos, sound);
    this.names = names;
    this.ids = ids;
}
key.prototype = Object.create(myObj.prototype);
key.prototype.constructor = key;