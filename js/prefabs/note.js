var note = function (game, key, xpos, ypos, text, player) {
    myObj.call(this, game, key, xpos, ypos);
    this.mytext = text;
    this.scale.x = 0.025;
    this.scale.y = 0.025;
    style = { font: '40px Almendra', fill: '#fff', align: 'center' };
    this.InstructionText = game.add.text(0, 0, "Press 'E'", style);
    this.InstructionText.kill();
    this.range = 32;
    this.player = player;
}
note.prototype = Object.create(myObj.prototype);
note.prototype.constructor = note;
note.prototype.update = function() {
    if (isInRange(this.body.position, this.player.body.position, this.range)) {
        this.InstructionText.x = this.body.position.x - 32; 
        this.InstructionText.y = this.body.position.y + 32; 

        this.InstructionText.revive();
    }
    else {
        this.InstructionText.kill();
    }
}