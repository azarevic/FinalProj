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
var coff = 0;//this is for the coffin puzzle
var game;
var lightening = true;
var blueJewel = false;
var yellowJewel = false;
var keys1 = false;
var keys2 = false;
var musicisPlaying = false;
game = new Phaser.Game(1280, 720, Phaser.AUTO, "finalProto", { preload: preload, player: null });

window.onload = function () {
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;
	// define states
	game.state.add("Boot", Boot);
	game.state.add("Load", Load);
	game.state.add("MainMenue", MainMenue);
	game.state.add("Tutorial", Tutorial);
	game.state.add("Credits", Credits);
	game.state.add("Level1", Play);
	game.state.add("Level2", Level2);
	game.state.add("Level3", Level3);
	game.state.add("Level4", Level4);
	game.state.add("Level5", Level5);
	game.state.add("Level6", Level6);
	game.state.add("Level7", Level7);
	game.state.add("Level8", Level8);
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
function calcAngleDegrees(f, i) {//final - initial
	return Math.atan2(f.x - i.x, f.y - i.y) * 180 / Math.PI;
}
//array sourcery
var objs = [

];
// var objs = [
// 	0, "statue", new Phaser.Point(1312, 448),
// 	1, "blueEye", new Phaser.Point(1480, 1150), //new Phaser.Point(128, 1520)
// 	1, "yellowEye", new Phaser.Point(250, 950),
// 	0, "door", new Phaser.Point(416, 1240),
// 	2, "key", new Phaser.Point(360, 256), //new Phaser.Point(292, 1520),
// 	0, "door", new Phaser.Point(832, 121),
// 	3, "key", new Phaser.Point(1312, 448)									//placeHolder for a droped key
// ];
var notes = [
	new Phaser.Point(128, 1500), "hell o"
];
var warpZones = [
	[],
	//level1
	[
		[new Phaser.Point(1568, 896), new Phaser.Point(64, 1440), "Level2"] // new Phaser.Point(250, 896)
	],
	//level2

	[
		[new Phaser.Point(-64, 1440), new Phaser.Point(1536, 896), "Level1"],
		[new Phaser.Point(736, 1568), new Phaser.Point(736, 96), "Level6"],
		[new Phaser.Point(832, -64), new Phaser.Point(640, 2048), "Level3"]
	],
	//level3
	[
		[new Phaser.Point(640, 2112), new Phaser.Point(864, -670), "Level2"],
		[new Phaser.Point(1600, 1472), new Phaser.Point(96, -264), "Level5"],
		[new Phaser.Point(256, 576), new Phaser.Point(152, 1400), "Level7"],
		[new Phaser.Point(1728, 608), new Phaser.Point(992, 1568), "Level4"]
	],
	//level4
	[
		[new Phaser.Point(960, 1596), new Phaser.Point(1760, 720), "Level3"]
	],
	//level5
	[
		[new Phaser.Point(192, 0), new Phaser.Point(1632, 1432), "Level3"],
		
	],
	//level6
	[],
	//level7
	[
		[new Phaser.Point(128, 1430), new Phaser.Point(256, 720), "Level3"],
	],
	//level8
	[]
];
