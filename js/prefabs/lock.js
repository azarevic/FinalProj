var lock = function (game, key, xpos, ypos) {
    myObj.call(this, game, key, xpos, ypos);
    this.ids = [];

    this.body.onCollide = new Phaser.Signal();
    this.body.onCollide.add(hit, this);
}
lock.prototype = Object.create(myObj.prototype);
lock.prototype.constructor = lock;
lock.prototype.addId = function(id) {
    this.ids.push(id);
}
lock.prototype.confirmKeys = function(player) {
    var count = 0;
    for (let i = 0; i < player.inventory.length; i++) {
        if (player.inventory[i] > this.ids[0]) {
            i += player.inventory.length;
        }
        else {
            if (player.inventory[i] == this.ids[0]) {
                count++;
            }
        }
    }
    return (count >= this.ids.length);
}
function hit (lock, player) {
    if  (this.confirmKeys(player)) {
        player.inventory = player.inventory.filter(function(value, index, arr){
            return value != lock.ids[0];
        });
        player.displayInventory();
        lock.kill();
    }
    else {
        console.log("not enough keys");
    }
}