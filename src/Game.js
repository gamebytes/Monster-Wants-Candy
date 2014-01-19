Candy.Game = function(game) {
	player = null;
	hungerMeter = null;
	candy = null;
	scoreText = null;
	pauseButton = null;
	// this.pause = false;
	gamePaused = false;
	gameOver = false;
	runOnce = false;
	score = 0;
	spawnCandyTimer = 0;
	health = 0;
};
Candy.Game.prototype = {
	create: function() {
		gamePaused = false;
		gameOver = false;
		spawnCandyTimer = 0;
		score = 0;
		health = 0;
		runOnce = false;

        this.add.sprite(0, 0, 'background');
        this.add.sprite(-30, 960-160, 'floor');
        this.add.sprite(10, 5, 'score-bg');

        pausedScreen = this.add.sprite(0, 0, 'screen-pause');
        // pausedScreenText = this.add.sprite((960-408)/2, (640-106-100)/2, 'paused-text');
        gameOverMessage = this.add.sprite((960-853)/2, 640-550, 'gameover-message');
        pausedScreen.visible = false;
        // pausedScreenText.visible = false;
        gameOverMessage.visible = false;
        backButton = this.add.button((640-358)/2, 960-133-130, 'button-back', function(){this.game.state.start('MainMenu')}, this, 1, 0, 2);
        continueButton = this.add.button((640-358)/2, 960-133-330, 'button-continue', this.managePause, this, 1, 0, 2);
        restartButton = this.add.button((640-358)/2, 960-133-330, 'button-restart', function(){this.game.state.start('Game')}, this, 1, 0, 2);
        backButton.visible = false;
        continueButton.visible = false;
        restartButton.visible = false;

		pauseButton = this.add.button(640-96-10, 5, 'button-pause', this.managePause, this);

        player = this.add.sprite(50, 822, 'monster-idle');
        // player.body.bounce.y = 0.2;
        // player.body.collideWorldBounds = true;
        // player.body.gravity.y = 20;
    	player.animations.add('idle', [0,1,2,3,4,5,6,7,8,9,10,11,12], 10, true);
    	// player.animations.add('jump', [0,1,2,3,4,5,6,7,8,9,10,11,12], 10, true);
		player.animations.play('idle');
		player.anchor.setTo(0.5, 0.5);
		// player.body.setSize(100, 100, 0, 0);

		health = 25;
        hungerMeter = this.add.sprite(235, 15, 'hunger-meter');
        for(var h=0; h<25; h++) {
        	hungerMeter.animations.add(''+(25-h), [h], 10, true);
        }
		hungerMeter.animations.play('25');

		scoreText = this.game.add.text(120, 20, "0", { font: "40px Arial", fill: "#FFCC00", align: "right" });
		
		candyGroup = this.game.add.group();
		this.spawnCandy();
	},
	managePause: function() {
		gamePaused =! gamePaused;
		if(!gamePaused) {
			pausedScreen.visible = false;
			// pausedScreenText.visible = false;
			backButton.visible = false;
			continueButton.visible = false;
			this.manageAnimations('on');
		}
		else {
			this.manageAnimations('off');
		}
	},
	clickCandy: function(candy) {
		if(!gamePaused) {
			score += 1;
			scoreText.setText(score);
			// accelerate to player
			console.log('click!');
			// this.game.physics.accelerateToObject(candy, player, 6000, 6000, 6000);
			// candyGroup.forEach(this.game.physics.moveToPointer, this.game.physics, false, 2000);
			var eatTween = this.game.add.tween(candy);
			eatTween.to({ x: 70, y: 820 }, 150, Phaser.Easing.Linear.None);
			eatTween.onComplete.addOnce(function(){candy.kill();}, this);
			eatTween.start();
			// monster jump, eat and fall, or just eat
		}
	},
	spawnCandy: function() {
		var dropPos = Math.floor(Math.random()*(640-98))+98;
		var candyType = Math.floor(Math.random()*5);
		candy = this.add.button(dropPos, -98, 'candy', this.clickCandy, this);
		for(var c=0; c<candyType; c++) {
			candy.animations.add(''+c, [c], 10, true);
		}
		candy.animations.play(''+candyType);
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
				storageAPI.setHighscore('highscore',score);
		
				var totalscore = storageAPI.get('totalscore');
				var newTotalscore = totalscore+score;
				storageAPI.set('totalscore',newTotalscore);

				console.log('run once');
				runOnce = true;

				// if new score > actual highscore, to show new highscore
				// once!
				hungerMeter.animations.play('1');

				this.manageAnimations('off');
				// statusBg.alpha = 0;
				gameOverMessage.visible = true;
				gameOverMessage.bringToTop();
				backButton.visible = true;
				backButton.bringToTop();
				restartButton.visible = true;
				restartButton.bringToTop();
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
			// pausedScreenText.visible = true;
			// pausedScreenText.bringToTop();
			backButton.visible = true;
			backButton.bringToTop();
			continueButton.visible = true;
			continueButton.bringToTop();
			candyGroup.forEach(function(candy){
				candy.body.velocity.x = 0;
				candy.body.velocity.y = 0;
			});
		}
	},
	resetCandy: function(candy) {
		candy.kill();
		health -= 10;
		hungerMeter.animations.play(''+health);
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
	// interpolation: function() {
		// var start = {x:0, y:0};
		// var end = {x:200, y:200};
		// var duration = 1000;
		// var frac = 0;
		// var starttime = Date.now();
		// var time = 0;

		// function interpolate(a, b, frac)
		// {
		//     var nx = a.x+(b.x-a.x)*frac;
		//     var ny = a.y+(b.y-a.y)*frac;
		//     return {x:nx,  y:ny};
		// }

		// function loop() { //this would be called every frame
		//     time = Date.now();
		//     frac = (time - starttime) / duration;
		//     interpolate(start, end, frac);
		// }
	// },
	render: function() {
		// this.game.debug.renderSpriteInfo(player, 32, 32);
		// this.game.debug.renderSpriteCollision(candy, 32, 400);
		// this.game.debug.renderSpriteBody(player);
		// this.game.debug.renderSpriteBody(candy);
	}
};