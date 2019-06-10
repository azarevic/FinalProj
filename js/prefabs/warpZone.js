var warpZone = function (game, key, xpos, ypos, xspawn, yspawn, stateToLoad, player) {
    myObj.call(this, game, key, xpos, ypos);
    this.player = player;
    this.stateToLoad = stateToLoad;

    this.body.onCollide = new Phaser.Signal();
    this.body.onCollide.add(warp, this);
    //this.tint = 0x000000;
    this.spawn = new Phaser.Point(xspawn, yspawn);
}
warpZone.prototype = Object.create(myObj.prototype);
warpZone.prototype.constructor = warpZone;
// warpZone.prototype.reposPlayer = function (map) {
//     //this.player.position = this.spawn;
// }
function warp (warp, player) {//im treating it as private
    this.player.position = this.spawn;
    
    game.state.start(this.stateToLoad, false, false);
    //game.state.start(this.stateToLoad, true, false, this.player);
}
