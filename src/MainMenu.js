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

		highscoreText = this.game.add.text(540, 690, "0", { font: "40px Arial", fill: "#FFCC00", align: "right" });
		totalscoreText = this.game.add.text(10, 910, "0", { font: "40px Arial", fill: "#000", align: "right" });

		startButton = this.add.button(640-401-10, 960-143-10, 'button-start', this.startGame, this, 1, 0, 2);

		blackmoonButton = this.add.button(10, 10, 'button-blackmoon', this.clickBlackmoon, this);
		enclaveButton = this.add.button(153+10+10, 10, 'button-enclave', this.clickEnclave, this);
		
		audioButton = this.add.button(640-111-10, 10, 'button-audio', this.manageAudio, this);
    	audioButton.animations.add('true', [0], 10, true);
    	audioButton.animations.add('false', [1], 10, true);
    	audioButton.animations.play('true');

		// hungerMeter = this.add.sprite(235, 15, 'hunger-meter');


		// this.blackmoonButton = this.add.button(10, 5, 'button-blackmoon', this.clickBlackmoon, this);
		// this.enclaveButton = this.add.button(10+157+5, 5, 'button-enclave', this.clickEnclave, this);

		// var t = this.game.add.text(640-145, 598, "666", { font: "40px Arial", fill: "#FFCC00", align: "right" });
		// t.anchor.setTo(0.5, 0.5);

		// this.playButton = this.add.button(1024-193-10, 768-90-10, 'playButton', this.startGame, this, 2, 1, 0);
		// this.playButton.events.onInputOver.add(this.overButton, this);
		// this.playButton.events.onInputOut.add(this.outButton, this);
		// this.input.onUp.addOnce(this.showStory, this);

		storageAPI.initUnset('highscore',0);
		var highscore = storageAPI.get('highscore');
		highscoreText.setText(highscore);

		storageAPI.initUnset('totalscore',0);
		var totalscore = storageAPI.get('totalscore');
		totalscoreText.setText(totalscore);

		storageAPI.initUnset('audio',true);
		var audioStatus = storageAPI.get('audio');
		audioButton.animations.play(''+audioStatus);
	},
	manageAudio: function() {
		audioStatus =! audioStatus;
		audioButton.animations.play(''+audioStatus);
		storageAPI.set('audio',audioStatus);
		console.log('Audio status: '+audioStatus);
	},
	startGame: function() {
		// this.game.state.start('Game');
		this.game.state.start('StoryHowto');
	}
};
