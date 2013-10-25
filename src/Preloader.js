Candy.Preloader = function (game) {
	this.background = null;
	this.preloadBar = null;
};

Candy.Preloader.prototype = {
	preload: function () {
		this.game.stage.backgroundColor = '#B4D9E7'; // 3232cb
		this.preloadBar = this.add.sprite((640-311)/2, (960-27)/2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);

		this.load.image('background', 'img/background.png');
		this.load.image('floor', 'img/floor.png');
		this.load.image('monster-cover', 'img/monster-cover.png');
		this.load.image('title', 'img/title.png');
		this.load.image('game-over', 'img/gameover.png');

		this.load.image('candy1', 'img/candy1.png');
		this.load.image('candy2', 'img/candy2.png');
		this.load.image('candy3', 'img/candy3.png');
		this.load.image('candy4', 'img/candy4.png');
		this.load.image('candy5', 'img/candy5.png');

		this.load.image('score-bg', 'img/score-bg.png');
		this.load.image('highscore-text', 'img/highscore-text.png');

		this.load.image('button-pause', 'img/button-pause.png');

		this.load.image('button-blackmoon', 'img/logo-blackmoon.png');
		this.load.image('button-enclave', 'img/logo-enclave.png');

		this.load.image('screen-pause', 'img/screen-pause.png');

		this.load.image('monster-sleeps', 'img/monster-sleeps.png');
		this.load.spritesheet('monster-idle', 'img/monster-idle.png', 103, 131);
		this.load.spritesheet('monster-up', 'img/monster-up.png', 107, 153);
		this.load.spritesheet('monster-down', 'img/monster-down.png', 128, 108);
		this.load.spritesheet('monster-eats', 'img/monster-eats.png', 111, 136);
		this.load.spritesheet('monster-walks', 'img/monster-walks.png', 103, 135);

		this.load.spritesheet('button-start', 'img/button-start.png', 401, 143);
		this.load.spritesheet('button-audio', 'img/button-audio.png', 111, 96);

		this.load.spritesheet('hunger-meter', 'img/hunger-meter.png', 289, 45);

		// this.load.atlas('creatures', 'assets/creatures.png', 'assets/creatures.json');
		// this.load.image('creature1', 'assets/1-Shaker.png');
		// this.load.audio('sound1', ['audio/1-Shaker.wav']);
	},

	create: function () {
		this.game.state.start('MainMenu');
	}
};