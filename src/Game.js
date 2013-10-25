Candy.Game = function (game) {
	this.player;
	this.hungerMeter;
	this.pause = false;
	this.candy;
	this.candy2;
	this.sweets;
	this.score = 0;
	this.customTime;
	this.health;
};

Candy.Game.prototype = {
	create: function () {
        this.add.sprite(0, 0, 'background');
        this.add.sprite(-30, 960-160, 'floor');
        this.add.sprite(10, 5, 'score-bg');

		this.pauseButton = this.add.button(640-96-10, 5, 'button-pause', this.managePause, this);

        this.player = this.add.sprite(50, 822, 'monster-idle');
        // player.body.bounce.y = 0.2;
        // player.body.collideWorldBounds = true;
        // player.body.gravity.y = 20;
    	this.player.animations.add('idle', [0,1,2,3,4,5,6,7,8,9,10,11,12], 10, true);
    	// player.animations.add('run', [0,1,2,3,4,5,6,7,8,9,10,11,12], 10, true);
		this.player.animations.play('idle');
		this.player.anchor.setTo(0.5, 0.5);
		// player.body.setSize(100, 100, 0, 0);

		this.health = 25;
        this.healthMeter = this.add.sprite(235, 15, 'hunger-meter');
        for(var h=0; h<25; h++) {
        	this.healthMeter.animations.add(''+(25-h), [h], 10, true);
        }
		this.healthMeter.animations.play('25');

		this.scoreText = this.game.add.text(120, 20, "0", { font: "40px Arial", fill: "#FFCC00", align: "right" });

		// candy1 = this.add.button(700, 960, 'candy1', this.candyClick(), this);
		// candy1.anchor.setTo(0.5, 0.5);
		// candy1.body.bounce.setTo(1, 1);
		// candy1.body.velocity.y = -700;
		// candy1.body.velocity.x = -150;
		// candy1.body.gravity.y = 10;

		// this.sweets = this.game.add.group(null, 'sweets');
		// for(var y = 0; y < 4; y++) {
		// 	for(var x = 0; x < 10; x++) {
		// 		var c = this.sweets.create(x * 48, y * 50, 'candy1');
		// 		c.events.onOutOfBounds.add(this.resetCandy, this);
		// 		c.body.gravity.y = Math.floor(Math.random()*10)+1;
		// 	}
		// }
		// this.sweets.x = 100;
		// this.sweets.y = 50;

		this.customTime = 0;

		this.game.onPause.add(function () {
            console.log('onpause');

        });
        this.game.onResume.add(function () {
            console.log('onresume');
        });

        // game.camera.follow(player);
		// this.creatures = this.add.group();
		// this.player = this.create(0, 0, 'player', 'ble');
		// this.creature1 = this.creatures.create(-1000, 0, 'creature1');

		// this.trash = this.add.sprite(15, 661, 'trash');
		// this.trash.inputEnabled = true;
		// this.trash.events.onInputDown.add(this.resetCreatures, this);
		this.spawnCandy();
	},

	showStory: function () {
		this.game.add.sprite(0, 0, 'story');
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

	candyClick: function(candy) {
		console.log(candy.body.x,candy.body.y);
		candy.kill();
		this.score += 1;
	},

	spawnCandy: function() {
		var dropPos = Math.floor(Math.random()*640);
		var candyType = Math.floor(Math.random()*5)+1;
		var candyHeight = [0,55,73,73,78,98];
		this.candy = this.add.button(dropPos, -(candyHeight[candyType]/2)+1, 'candy'+candyType, this.candyClick, this);
		// this.candy = this.add.sprite(dropPos, -30, 'candy'+candyType);
		this.candy.events.onOutOfBounds.add(this.resetCandy, this);
		this.candy.anchor.setTo(0.5, 0.5);
    	// this.candy.body.bounce.setTo(1, 1);
		// this.candy.body.velocity.y = 0;
		// this.candy.body.velocity.x = 0;
		this.candy.body.gravity.y = 3+(this.score/10);
	},

	eatCandy: function(obj1, obj2) {
		obj1.kill();
		obj2.kill();
		console.log('candy eaten!');
	},

	update: function() {
		// UPDATE
		this.customTime += this.game.time.elapsed;
		if(this.customTime > (2000-this.score)) {
			// console.log('second passed!');
			this.customTime = 0;
			// drop the BASS! ..or the candy
			this.spawnCandy();
		}
		// player.rotation = this.game.physics.accelerateToPointer(player, this.game.input.activePointer, 500, 500, 500);

		// if(this.player.x < this.game.input.x) {
		// 	this.player.x += 10;
		// }
		// if(this.player.x > this.game.input.x) {
		// 	this.player.x -= 10;
		// }

		this.game.physics.collide(this.player, this.candy, this.eatCandy, null, this);

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
		if(this.game.paused) {
			// PAUSE
			console.log('paused');
		}
		else if(this.gameOver) {
				// GAME OVER
		}
		else {
			// NORMAL GAME
			// player.velocity.x = 0;
			// player.velocity.y = 0;

			// if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			// 	player.velocity.x = -200;
			// }
			// else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			// 	player.velocity.x = 200;
			// }

			// if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			// 	fireBullet();
			// }

			// game.physics.collide(bullets, aliens, collisionHandler, null, this);
		}
		this.scoreText.setText(this.score);
		// this.candy.angle += 1;
		if(!this.health) {
			this.add.sprite((640-594)/2, (960-271)/2, 'game-over');
			this.game.paused = true;
		}
	},

	resetCandy: function(candy) {
		candy.kill();
		this.health -= 1;
		this.healthMeter.animations.play(''+this.health);
	},

	render: function() {
		// RENDER

		// this.game.debug.renderSpriteInfo(this.player, 32, 32);
		// this.game.debug.renderSpriteCollision(this.candy, 32, 400);

		// this.game.debug.renderSpriteBody(this.player);
		// this.game.debug.renderSpriteBody(this.candy);
	}
};