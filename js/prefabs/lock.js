var lock = function (game, key, xpos, ypos) {
    myObj.call(this, game, key, xpos, ypos);
    this.ids = [];
}
lock.prototype = Object.create(myObj.prototype);
lock.prototype.constructor = lock;
lock.prototype.addId = function(id) {
    //this.ids.add(id);
    this.ids.push(id);
}