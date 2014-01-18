Candy.MainMenu = function(game) {
	startButton = null;
	blackmoonButton = null;
	enclaveButton = null;
	audioButton = null;
	audioStatus = true;
};

Candy.MainMenu.prototype = {
	create: function() {
		this.game.add.sprite(0, 0, 'background');
		this.game.add.sprite(-130, 960-514+10, 'monster-cover');
		this.game.add.sprite((640-395)/2+30, 160, 'title');

		this.game.add.sprite(640-194-50, 600, 'highscore-text');
		this.game.add.sprite(640-213-40, 675, 'score-bg');

		// this.game.add.sprite(10, 10, 'title');

		startButton = this.add.button(640-401-10, 960-143-10, 'button-start', this.startGame, this, 1, 0, 2);

		blackmoonButton = this.add.button(10, 10, 'button-blackmoon', this.clickBlackmoon, this);
		enclaveButton = this.add.button(153+10+10, 10, 'button-enclave', this.clickEnclave, this);
		
		audioButton = this.add.button(640-111-10, 10, 'button-audio', this.manageAudio, this);
    	audioButton.animations.add('on', [0], 10, true);
    	audioButton.animations.add('off', [1], 10, true);
    	audioButton.animations.play('on');

		// hungerMeter = this.add.sprite(235, 15, 'hunger-meter');


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
		playButton.angle = 5;
	},

	outButton: function() {
		// this.playText.font = 'Arial'; // Text.HELP_LETS_GO_BUTTON.style;
		playButton.angle = 0;
	},

	manageAudio: function() {
		//
		if(audioStatus) {
			audioStatus = false;
			audioButton.animations.play('off');
			console.log('manage audio: false');
		}
		else {
			audioStatus = true;
			audioButton.animations.play('on');
			console.log('manage audio: true');
		}
	},

	startGame: function() {
		// this.input.onUp.addOnce(this.showStory, this);
		this.game.state.start('Game');
	}

};
