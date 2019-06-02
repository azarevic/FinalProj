var note = function (game, key, xpos, ypos, text) {
    myObj.call(this, game, key, xpos, ypos);
    this.text = text;
    // this.scale.x = 0.025;
    // this.scale.y = 0.025;
    // this.name = key;
    // this.id = id;
}
note.prototype = Object.create(myObj.prototype);
note.prototype.constructor = note;