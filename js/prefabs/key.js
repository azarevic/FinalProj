var key = function (game, key, xpos, ypos, sound, id) {
    myObj.call(this, game, key, xpos, ypos);
    this.sound = sound;
    this.name = key;
    this.id = id;
}
key.prototype = Object.create(myObj.prototype);
key.prototype.constructor = key;