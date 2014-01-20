Candy.Game = function(game) {
	player = null;
	hungerMeter = null;
	candy = null;
	scoreText = null;
	pauseButton = null;
	gamePaused = false;
	gameOver = false;
	runOnce = false;
	pauseButtonDisabled = false;
	audioStatus = true;
	candyUnlockLevels = [];
	candyActualLevel = 0;
	score = 0;
	spawnCandyTimer = 0;
	health = 0;
};
Candy.Game.prototype = {
	create: function() {
		gamePaused = false;
		gameOver = false;
		pauseButtonDisabled = false;
		spawnCandyTimer = 0;
		score = 0;
		health = 0;
		runOnce = false;

        this.add.sprite(0, 0, 'background');
        this.add.sprite(-30, 960-160, 'floor');
        this.add.sprite(10, 10, 'score-bg');

        pausedScreen = this.add.sprite(0, 0, 'screen-overlay');
        pausedScreenText = this.add.sprite((640-430)/2, 210, 'text-paused');
        gameOverText = this.add.sprite((640-594)/2, 210, 'text-gameover');
        newHighscoreText = this.add.sprite(30, 75, 'text-newbestscore');
        pausedScreen.visible = false;
        pausedScreenText.visible = false;
        gameOverText.visible = false;
        newHighscoreText.visible = false;
        backButton = this.add.button((640-358)/2, 960-133-110, 'button-back', function(){this.game.state.start('MainMenu');}, this, 1, 0, 2);
        continueButton = this.add.button((640-358)/2, 960-133-290, 'button-continue', function(){pauseButtonDisabled = false;this.managePause();}, this, 1, 0, 2);
        restartButton = this.add.button((640-358)/2, 960-133-290, 'button-restart', function(){this.game.state.start('Game')}, this, 1, 0, 2);
        backButton.visible = false;
        continueButton.visible = false;
        restartButton.visible = false;

		pauseButton = this.add.button(640-96-10, 10, 'button-pause', this.managePause, this);

        player = this.add.sprite(50, 822, 'monster-idle');
        // player.body.bounce.y = 0.2;
        // player.body.collideWorldBounds = true;
        // player.body.gravity.y = 20;
    	player.animations.add('idle', [0,1,2,3,4,5,6,7,8,9,10,11,12], 10, true);
    	// player.animations.add('jump', [0,1,2,3,4,5,6,7,8,9,10,11,12], 10, true);
		player.animations.play('idle');
		player.anchor.setTo(0.5, 0.5);
		// player.body.setSize(100, 100, 0, 0);

		audioButton = this.add.button(640-111-10, 10, 'button-audio', this.manageAudio, this);
		audioButton.visible = false;
		audioButton.animations.add('true', [0], 10, true);
		audioButton.animations.add('false', [1], 10, true);
		var audioStatus = storageAPI.get('audio');
		audioButton.animations.play(''+audioStatus);

		var totalscore = storageAPI.get('totalscore');
		candyUnlockLevels = [0,50,100,200,500,1000,5000];
		candyActualLevel = 0;
		console.log('totalscore: '+totalscore);
		console.log('len candyUnlockLevels.length: '+candyUnlockLevels.length);
		for (var i=0,len=candyUnlockLevels.length; i<len; i++) {
			if(totalscore >= candyUnlockLevels[i]) {
				candyActualLevel = i+1;
			}
		}
		console.log('candy actual level: '+candyActualLevel+' (total: '+totalscore+')');

		health = 25;
        hungerMeter = this.add.sprite(235, 20, 'hunger-meter');
        for(var h=0; h<25; h++) {
        	hungerMeter.animations.add(''+(25-h), [h], 10, true);
        }
		hungerMeter.animations.play('25');

		scoreText = this.game.add.text(120, 20, "0", { font: "40px Arial", fill: "#FFCC00", align: "right" });
		
		candyGroup = this.game.add.group();
		this.spawnCandy();
	},
	managePause: function() {
		if(!pauseButtonDisabled) {
			gamePaused =! gamePaused;
			if(!gamePaused) {
				audioButton.visible = false;
				pausedScreen.visible = false;
				pausedScreenText.visible = false;
				backButton.visible = false;
				continueButton.visible = false;
				this.manageAnimations('on');
			}
			else {
				this.manageAnimations('off');
			}
		}
	},
	clickCandy: function(candy) {
		if(!gamePaused) {
			score += (candy.type+1);
			console.log('added '+(candy.type+1)+' points');
			scoreText.setText(score);
			// accelerate to player
			console.log('click!');
			var eatTween = this.game.add.tween(candy);
			eatTween.to({ x: 70, y: 820 }, 150, Phaser.Easing.Linear.None);
			eatTween.onComplete.addOnce(function(){candy.kill();}, this);
			eatTween.start();
			// monster jump, eat and fall, or just eat
		}
	},
	spawnCandy: function() {
		var dropPos = Math.floor(Math.random()*(640-98));
		candy = this.add.button(dropPos, -98, 'candy', this.clickCandy, this);
		candy.type = Math.floor(Math.random()*candyActualLevel);
		console.log('candyType: '+candy.type);

		candy.animations.add('idle', [candy.type], 10, true).play();

		candy.events.onOutOfBounds.add(this.resetCandy, this);
		candy.anchor.setTo(0.5, 0.5);
		candy.body.gravity.y = 3+(score/10);
		candy.rotateMe = (Math.random()*4)-2;

		candy.cachedVelocity = {};
		candy.cachedVelocity.x = candy.body.velocity.x;
		candy.cachedVelocity.y = candy.body.velocity.y;
		candy.input.pixelPerfect = true;
	    candyGroup.add(candy);
	},
	update: function() {
		if(gameOver) {
			if(!runOnce) {
				var oldScore = storageAPI.get('highscore');
				var totalscore = storageAPI.get('totalscore');
				var newTotalscore = totalscore+score;

				storageAPI.setHighscore('highscore',score);
				storageAPI.set('totalscore',newTotalscore);

				console.log('run once');
				runOnce = true;

				hungerMeter.animations.play('1');
				this.manageAnimations('off');
				pausedScreen.visible = true;
				pausedScreen.bringToTop();

				if(score > oldScore) {
					newHighscoreText.visible = true;
					newHighscoreText.bringToTop();
				}

				audioButton.visible = true;
				audioButton.bringToTop();
				gameOverText.visible = true;
				gameOverText.bringToTop();
				backButton.visible = true;
				backButton.bringToTop();
				restartButton.visible = true;
				restartButton.bringToTop();

				pauseButtonDisabled = true;
			}
		}
		else if(!gamePaused) {
			spawnCandyTimer += this.game.time.elapsed;
			if(spawnCandyTimer > (2000-score)) {
				spawnCandyTimer = 0;
				this.spawnCandy();
			}
			// player.rotation = this.game.physics.accelerateToPointer(player, this.game.input.activePointer, 500, 500, 500);

			// if(player.x < this.game.input.x) {
			// 	player.x += 10;
			// }
			// if(player.x > this.game.input.x) {
			// 	player.x -= 10;
			// }

			// this.game.physics.collide(player, candy, this.eatCandy, null, this);

			//	only move when you click
			// if(this.game.input.mousePointer.isDown) {
			// 	this.game.physics.moveTowardsMouse(player, 400);
			// 	if(Phaser.Rectangle.contains(player.body, this.game.input.x, this.game.input.y)) {
			// 		player.body.velocity.setTo(0, 0);
			// 	}
			// }
			// else {
			// 	player.body.velocity.setTo(0, 0);
			// }

			// scoreText.setText(score);
			
			candyGroup.forEach(function(candy){
				candy.angle += candy.rotateMe;
			});

			if(health <= 0) {
				// hungerMeter.animations.play('1');
				// this.add.sprite((640-594)/2, (960-271)/2, 'game-over');
				// this.game.paused = true;
				gameOver = true;
			}
		}
		else {
			// render pause
			pausedScreen.visible = true;
			pausedScreen.bringToTop();
			audioButton.visible = true;
			audioButton.bringToTop();
			pausedScreenText.visible = true;
			pausedScreenText.bringToTop();
			backButton.visible = true;
			backButton.bringToTop();
			continueButton.visible = true;
			continueButton.bringToTop();
			candyGroup.forEach(function(candy){
				candy.body.velocity.x = 0;
				candy.body.velocity.y = 0;
			});

			pauseButtonDisabled = true;
		}
	},
	resetCandy: function(candy) {
		candy.kill();
		health -= 10;
		hungerMeter.animations.play(''+health);
	},
	manageAudio: function() {
		audioStatus =! audioStatus;
		audioButton.animations.play(''+audioStatus);
		storageAPI.set('audio',audioStatus);
		console.log('Audio status: '+audioStatus);
	},
	manageAnimations: function(status) {
		if(status == 'on') {
			candyGroup.forEach(function(candy){
				candy.body.velocity.x = candy.cachedVelocity.x;
				candy.body.velocity.y = candy.cachedVelocity.y;
				// from cached gravity?
				candy.body.gravity.y = 3+(score/10);
			});
			console.log('odkeszowujemy velocity');
			player.animations.play('idle');
		}
		else if(status == 'off') {
			candyGroup.forEach(function(candy){
				candy.cachedVelocity.x = candy.body.velocity.x;
				candy.cachedVelocity.y = candy.body.velocity.y;
				candy.body.velocity.x = 0;
				candy.body.velocity.y = 0;
				candy.body.gravity.y = 0;
			});
			console.log('keszujemy velocity');
			player.animations.stop('idle');
		}
	},
	render: function() {
		// this.game.debug.renderSpriteInfo(player, 32, 32);
		// this.game.debug.renderSpriteCollision(candy, 32, 400);
		// this.game.debug.renderSpriteBody(player);
		// this.game.debug.renderSpriteBody(candy);
	}
};