"use strict";

//define globals
var game;

var blueJewel = false;
var yellowJewel = false;
var keys1 = false;
var keys2 = false;

window.onload = function() {
	game = new Phaser.Game(640, 640, Phaser.AUTO, "finalProto");

	// define states
	game.state.add("Boot", Boot);
	game.state.add("Load", Load);
	game.state.add("MainMenue", MainMenue);
	game.state.add("Play", Play);
	game.state.add("GameOver", GameOver);
	game.state.start("Boot");
}