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
function getDistanceBetween2Points(a, b) {//last 2 values are a number and a boolean and are optional
	var x = a.x - b.x;
	var y = a.y - b.y;
	return Math.sqrt(x * x + y * y);
}
function isInRange(a, b, range) {//takes 2 points and the value of the range.
	var x = (a.x - b.x < 0)? -(a.x - b.x) : (a.x - b.x);
	var y = (a.y - b.y < 0)? -(a.y - b.y) : (a.y - b.y);
	return (x < range && y < range)? true: false;
}