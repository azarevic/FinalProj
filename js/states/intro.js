// Intro cutscene state
//This code was not written by anyone from this team, this code was provided by professor Nathan, Lecture 18, Text and Fonts.

var Intro = function(game){
	// dialog constants
	this.DBOX_X = 120;			// dialog box x-position
	this.DBOX_Y = 500;			// dialog box y-position
	this.DBOX_FONT = 'font';	// dialog box font key

	this.TEXT_X = 170;			// text w/in dialog box x-position
	this.TEXT_Y = 545;			// text w/in dialog box y-position
	this.TEXT_SIZE = 24;		// text font size (in pixels)
	this.TEXT_MAX_WIDTH = 915;	// max width of text within box

	this.NEXT_TEXT = 'Press Space Bar to continue';	// text to display for next prompt
	this.NEXT_X = 960;			// next text prompt x-position
	this.NEXT_Y = 674;			// next text prompt y-position

	this.LETTER_TIMER = 10;		// # ms each letter takes to "type" onscreen

	// dialog variables
	this.dialogConvo = 0;			// current "conversation"
	this.dialogLine = 0;			// current line of conversation
	this.dialogSpeaker = null;		// current speaker
	this.dialogLastSpeaker = null;	// last speaker
	this.dialogTyping = false;		// flag to lock player input while text is "typing"
	this.dialogText = null;			// the actual dialog text
	this.nextText = null;			// player prompt text to continue typing

	// character variables
	this.thou = null;
	this.mother = null;
	this.father = null;
	this.narrator = null;

	this.OFFSCREEN_X = -500;	// x,y values to place characters offscreen
	this.OFFSCREEN_Y = 1000;	//
};

Intro.prototype = {
	create: function() {
		light = game.add.sprite(game.world.width/2, game.world.height/2, 'light', 'med');//ads the same background from prev screen
		light.scale.x = 0.7;
		light.scale.y = 0.7;
		light.anchor.set(0.5);
		light.animations.add('flicker', ['low', 'low', 'med', 'med', 'med', 'med', 'med', 'low', 'med', 'med', 'med', 'med', 'med', 'bright', 'bright', 'bright', 'med', 'med', 'bright', 'bright'], 10, true, false);
		// parse dialog from JSON file
		this.dialog = JSON.parse(this.game.cache.getText('dialog1'));
		
		// add dialog box sprite
		this.dialogbox = this.add.sprite(this.DBOX_X, this.DBOX_Y, 'dialogbox');
		//this.dialogbox.visible = false;

		// init dialog text
		this.dialogText = this.add.bitmapText(this.TEXT_X, this.TEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);
		this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);


		// debug
		console.log(this.dialog);

		// start dialog
		this.TypeText();
	},
	update: function() {
		light.animations.play('flicker');
		// check for spacebar press
		if(this.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && !this.dialogTyping) {
			// trigger dialog
			this.TypeText();
		}
	},
	TypeText: function() {
		// lock input while typing
		this.dialogTyping = true;

		// clear text
		this.dialogText.text = '';
		this.nextText.text = '';

		// make sure there are lines left to read in this convo, otherwise jump to next convo
		if(this.dialogLine > this.dialog[this.dialogConvo].length-1) {
			this.dialogLine = 0;
			this.dialogConvo++;
		}

		// make sure we're not out of conversations
		if(this.dialogConvo >= this.dialog.length) {
			console.log('End of Conversations');
			game.state.start("Play");//change this to play
		} else {
			// set current speaker
			this.dialogSpeaker = this.dialog[this.dialogConvo][this.dialogLine]['speaker'];
			// check if there's a new speaker - if so, tween the speakers out/in
			/*if(this.dialog[this.dialogConvo][this.dialogLine]['newSpeaker']) {
				if(this.dialogLastSpeaker) {
					this.add.tween(this[this.dialogLastSpeaker]).to({x: this.OFFSCREEN_X}, 500, Phaser.Easing.Linear.None, true);
				}
				this.add.tween(this[this.dialogSpeaker]).to({x: this.DBOX_X+50}, 500, Phaser.Easing.Linear.None, true);
			}*/

			// build dialog (concatenate speaker + line of text)
			this.dialogLines = this.dialog[this.dialogConvo][this.dialogLine]['speaker'].toUpperCase() + ': ' + this.dialog[this.dialogConvo][this.dialogLine]['dialog'];

			// setup timer to iterate through each letter in dialog
			let currentChar = 0;
			this.textTimer = this.time.events.repeat(this.LETTER_TIMER, this.dialogLines.length, function(){
				this.dialogText.text += this.dialogLines[currentChar];
				currentChar++;
			}, this);
			// callback function fires once timer is finished
			this.textTimer.timer.onComplete.addOnce(function(){
				// show prompt for more text
				this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, this.NEXT_TEXT, this.TEXT_SIZE);
				this.nextText.anchor.setTo(1, 1);
				// un-lock input
				this.dialogTyping = false;
			}, this);
			
			// set bounds on dialog
			this.dialogText.maxWidth = this.TEXT_MAX_WIDTH;

			// increment dialog line
			this.dialogLine++;

			// set past speaker
			this.dialogLastSpeaker = this.dialogSpeaker;
		}
	}
};