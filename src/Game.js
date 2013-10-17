Candy.Game = function (game) {
	this.player;
	this.hungerMeter;
	this.pause = false;
	this.candy1;
	this.candy2;
	this.sweets;
};

Candy.Game.prototype = {
	create: function () {
        this.add.sprite(0, 0, 'background');
        this.add.sprite(-30, 960-160, 'floor');
        this.add.sprite(10, 5, 'score-bg');

		// var pausedScreen = this.add.sprite(0, 0, 'screen-pause');
		// pausedScreen.visible = false;

		this.pauseButton = this.add.button(640-96-10, 5, 'button-pause', this.managePause, this);

        player = this.add.sprite(20, 760, 'monster-idle');
        // player.body.bounce.y = 0.2;
        // player.body.collideWorldBounds = true;
        // player.body.gravity.y = 20;
    	player.animations.add('idle', [0,1,2,3,4,5,6,7,8,9,10,11,12], 10, true);
		player.animations.play('idle');

        hungerMeter = this.add.sprite(235, 15, 'hunger-meter');
    	hungerMeter.animations.add('hunger', [0], 10, true);
		hungerMeter.animations.play('hunger');

		var t = this.game.add.text(120, 20, "666", { font: "40px Arial", fill: "#FFCC00", align: "right" });
		// t.anchor.setTo(0.5, 0.5);

		candy1 = this.add.button(700, 960, 'candy', this.candyClick(), this);
		candy1.anchor.setTo(0.5, 0.5);
        candy1.body.bounce.setTo(1, 1);
		candy1.body.velocity.y = -700;
		candy1.body.velocity.x = -150;
		candy1.body.gravity.y = 10;

		candy3 = this.add.button(700, 960, 'candy', this.candyClick(), this);
		candy3.anchor.setTo(0.5, 0.5);
        candy3.body.bounce.setTo(1, 1);
		candy3.body.velocity.y = -500;
		candy3.body.velocity.x = -50;
		candy3.body.gravity.y = 10;

		candy2 = this.add.button(-60, 960, 'candy', this.candyClick(), this);
		candy2.anchor.setTo(0.5, 0.5);
        candy2.body.bounce.setTo(1, 1);
		candy2.body.velocity.y = -700;
		candy2.body.velocity.x = 100;
		candy2.body.gravity.y = 10;

		sweets = this.game.add.group(null, 'sweets');
		for(var y = 0; y < 4; y++) {
			for(var x = 0; x < 10; x++) {
				var c = sweets.create(x * 48, y * 50, 'candy');
				c.events.onOutOfBounds.add(this.resetCandy, this);
				c.body.gravity.y = Math.floor(Math.random()*10)+1;
			}
		}

		sweets.x = 100;
		sweets.y = 50;

		this.game.onPause.add(function () {
            // music.pause();
            console.log('onpause');

        });
        this.game.onResume.add(function () {
            // music.resume();
            console.log('onresume');
        });

        // game.camera.follow(player);
		// this.creatures = this.add.group();
		// this.player = this.create(0, 0, 'player', 'ble');
		// this.creature1 = this.creatures.create(-1000, 0, 'creature1');

		// this.trash = this.add.sprite(15, 661, 'trash');
		// this.trash.inputEnabled = true;
		// this.trash.events.onInputDown.add(this.resetCreatures, this);
	},

	showStory: function () {
		this.game.add.sprite(0, 0, 'story');
	},

	managePause: function() {
		console.log('manage pause');
		// if(!this.game.paused) {
		// 	console.log('show pause screen');
		// 	this.add.sprite(0, 0, 'screen-pause');
		// }
		// else {
		// 	console.log('hide pause screen');
		// 	pauseScreen.kill();
		// }
		this.pause =! this.pause;
		if(this.pause) {
			console.log('pause active');
			// this.pausedScreen.visibility = true;
		}
		else {
			//
			console.log('pause inactive');
			// this.pausedScreen.visibility = false;
		}
		this.game.paused =! this.game.paused;
	},

	candyClick: function() {
		// this;
		// candy1.body.velocity.y -= 500
	},

	update: function() {
		// UPDATE

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
	},

	resetCandy: function(candy) {
		candy.kill();
		console.log('candy reset');
	},

	render: function() {
		// RENDER
		if(this.game.paused) {
			// pause
			console.log('paused render');
		}
		else {
			// no pause
		}
	}
};