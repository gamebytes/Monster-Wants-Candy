Candy.MainMenu = function(game) {
	this.playButton = null;
	this.audioStatus = true;
};

Candy.MainMenu.prototype = {
	create: function() {
		this.game.add.sprite(0, 0, 'background');
		this.game.add.sprite(-130, 960-514-0, 'monster-cover');
		this.game.add.sprite((640-395)/2, 60, 'title');

		// this.game.add.sprite(640-194-50, 510, 'highscore-text');
		// this.game.add.sprite(640-213-40, 585, 'score-bg');

		// this.game.add.sprite(10, 10, 'title');

		this.startButton = this.add.button(640-401-10, 960-143-10, 'button-start', this.startGame, this, 1, 0, 2);
		// this.audioButton = this.add.button(640-111-10, 5, 'button-audio', this.manageAudio, this);
		// hungerMeter = this.add.sprite(235, 15, 'hunger-meter');
    	// this.audioButton.animations.add('on', [0], 10, true);
    	// this.audioButton.animations.add('off', [1], 10, true);
    	// this.audioButton.animations.play('on');

		// this.blackmoonButton = this.add.button(10, 5, 'button-blackmoon', this.clickBlackmoon, this);
		// this.enclaveButton = this.add.button(10+157+5, 5, 'button-enclave', this.clickEnclave, this);

		// var t = this.game.add.text(640-145, 598, "666", { font: "40px Arial", fill: "#FFCC00", align: "right" });
		// t.anchor.setTo(0.5, 0.5);

		// this.playButton = this.add.button(1024-193-10, 768-90-10, 'playButton', this.startGame, this, 2, 1, 0);
		// this.playButton.events.onInputOver.add(this.overButton, this);
		// this.playButton.events.onInputOut.add(this.outButton, this);
		// this.input.onUp.addOnce(this.showStory, this);
	},

	showStory: function() {
		this.game.add.sprite(0, 0, 'story');
	},

	overButton: function() {
		// this.playText.font = 'ble'; // Text.HELP_LETS_GO_BUTTON.hoverStyle;
		this.playButton.angle = 5;
	},

	outButton: function() {
		// this.playText.font = 'Arial'; // Text.HELP_LETS_GO_BUTTON.style;
		this.playButton.angle = 0;
	},

	manageAudio: function() {
		//
		if(this.audioStatus) {
			this.audioStatus = false;
			this.audioButton.animations.play('off');
			console.log('manage audio: false');
		}
		else {
			this.audioStatus = true;
			this.audioButton.animations.play('on');
			console.log('manage audio: true');
		}
	},

	startGame: function() {
		this.input.onUp.addOnce(this.showStory, this);
		this.game.state.start('Game');
	}

};
