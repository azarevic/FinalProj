var key = function (game, key, xpos, ypos, sound, name, id) {
    myObj.call(game, key, xpos, ypos, sound);
    this.name = name;
    this.id = id;
}
key.prototype = Object.create(myObj.prototype);
key.prototype.constructor = key;