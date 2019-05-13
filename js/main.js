"use strict";

//define globals
var game;

var blueJewel = false;
var yellowJewel = false;
var keys1 = false;
var keys2 = false;
game = new Phaser.Game(1280, 720, Phaser.AUTO, "finalProto", { preload: preload });

window.onload = function () {
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;
	// define states
	game.state.add("Boot", Boot);
	game.state.add("Load", Load);
	game.state.add("MainMenue", MainMenue);
	game.state.add("Play", Play);
	game.state.add("GameOver", GameOver);
	game.state.start("Boot");
}
function getDistanceBetween2Points(a, b) {
	var x = a.x - b.x;
	var y = a.y - b.y;
	return Math.sqrt(x * x + y * y);
}
function isInRange(a, b, range) {//takes 2 points and the value of the range.
	var x = (a.x - b.x < 0) ? -(a.x - b.x) : (a.x - b.x);
	var y = (a.y - b.y < 0) ? -(a.y - b.y) : (a.y - b.y);
	return (x < range && y < range) ? true : false;
}
function preload() {
	//to center game
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
}
