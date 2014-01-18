Candy.Game = function (game) {
	player = null;
	hungerMeter = null;
	candy = null;
	scoreText = null;
	pauseButton = null;
	// this.pause = false;
	score = 0;
	spawnCandyTimer = 0;
	health = 0;
};

Candy.Game.prototype = {
	create: function () {
        this.add.sprite(0, 0, 'background');
        this.add.sprite(-30, 960-160, 'floor');
        this.add.sprite(10, 5, 'score-bg');

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

		spawnCandyTimer = 0;
		candyGroup = this.game.add.group();
		this.spawnCandy();
	},

	managePause: function() {
		// if(!this.game.paused) {
		// 	console.log('show pause screen');
		// 	this.add.sprite(0, 0, 'screen-pause');
		// }
		// else {
		// 	console.log('hide pause screen');
		// 	pauseScreen.kill();
		// }
		// this.pause =! this.pause;
		// if(this.pause) {
		// 	console.log('pause active');
		// 	// this.pausedScreen.visibility = true;
		// }
		// else {
		// 	//
		// 	console.log('pause inactive');
		// 	// this.pausedScreen.visibility = false;
		// }
		this.game.paused =! this.game.paused;
	},

	clickCandy: function(candy) {
		candy.kill();
		score += 1;
		scoreText.setText(score);
	},

	spawnCandy: function() {
		var dropPos = Math.floor(Math.random()*640);
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
		candyGroup.add(candy);
	},

	update: function() {
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

		if(!health) {
			this.add.sprite((640-594)/2, (960-271)/2, 'game-over');
			this.game.paused = true;
		}
	},

	resetCandy: function(candy) {
		candy.kill();
		health -= 1;
		hungerMeter.animations.play(''+health);
	},

	render: function() {
		// this.game.debug.renderSpriteInfo(player, 32, 32);
		// this.game.debug.renderSpriteCollision(candy, 32, 400);
		// this.game.debug.renderSpriteBody(player);
		// this.game.debug.renderSpriteBody(candy);
	}
};