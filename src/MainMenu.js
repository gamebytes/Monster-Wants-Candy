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

		highscoreText = this.game.add.text(540, 690, "0", { font: "40px ComicBook", fill: "#FFCC00", align: "right" });
		totalscoreText = this.game.add.text(90, 825, "0", { font: "28px ComicBook", fill: "#000", align: "right" });

		startButton = this.add.button(640-401-10, 960-143-10, 'button-start', function(){this.game.state.start('StoryHowto')}, this, 1, 0, 2);
		achievementsButton = this.add.button(10, 960-66-15, 'button-achievements', function(){this.game.state.start('Achievements')}, this, 1, 0, 2);
		blackmoonButton = this.add.button(10, 10, 'button-blackmoon', this.clickBlackmoon, this);
		enclaveButton = this.add.button(153+10+10, 10, 'button-enclave', this.clickEnclave, this);
		
		audioButton = this.add.button(640-111-10, 10, 'button-audio', this.manageAudio, this);
		audioButton.animations.add('true', [0], 10, true);
		audioButton.animations.add('false', [1], 10, true);
		audioButton.animations.play('true');

		storageAPI.initUnset('highscore',0);
		var highscore = storageAPI.get('highscore');
		highscoreText.setText(highscore);

		storageAPI.initUnset('totalscore',0);
		var totalscore = storageAPI.get('totalscore');
		totalscoreText.setText('Overall: '+totalscore);

		storageAPI.initUnset('audio',true);
		var audioStatus = storageAPI.get('audio');
		audioButton.animations.play(''+audioStatus);
	},
	manageAudio: function() {
		audioStatus =! audioStatus;
		audioButton.animations.play(''+audioStatus);
		storageAPI.set('audio',audioStatus);
		console.log('Audio status: '+audioStatus);
	}
};
