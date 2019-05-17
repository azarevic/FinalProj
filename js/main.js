// 36
// Alejandro Landaverde Henriquez
// Misael Ruiz Garcia
// Andrea Zarevich

// git repo: https://github.com/azarevic/FinalProj.git

// Press [SPACE] to begin game on load.
// Use the arrow keys to move the player character (white square).
// Move right along the bottom edge of the map until you reach the end.
// Go up into the room and collect the puzzle item (blue circle).
// Return to the bottom edge and move left.
// Go up at the second hallway and take the first left.
// Turn immediately and go up.
// You will encounter the monster at this time (red triangle).
// Go around it and pick up the key behind it.
// (The enemy doesn't move but collision will take you to the game over state).
// (Press [SPACE] to restart in game over state).
// Exit the room again and move right until you return to the hall.
// Go immediately down and take a left at the bottom edge.
// There will be an open hall where a door used to be.
// Go up into this new room and collect the puzzle item (yellow circle).
// Return to the bottom edge and go right and up again to the big hallway.
// Take the first right to enter a large room.
// Continue right between two pillars and approach the statue directly.
// A key will apeear. Collect it and go left back to the room.
// Move up and go through the hall (where the door used to be) on the left.
// End.

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
	game.state.add("Tutorial", Tutorial);
	game.state.add("Credits", Credits);
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
