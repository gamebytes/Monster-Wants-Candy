Candy.Preloader = function(game) {
	this.background = null;
	this.preloadBar = null;
};
Candy.Preloader.prototype = {
	preload: function() {
		this.game.stage.backgroundColor = '#B4D9E7';
		this.preloadBar = this.add.sprite((640-311)/2, (960-27)/2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);

		this.load.image('background', 'img/background.png');
		this.load.image('floor', 'img/floor.png');
		this.load.image('monster-cover', 'img/monster-cover.png');
		this.load.image('title', 'img/title.png');
		this.load.image('score-bg', 'img/score-bg.png');
		this.load.image('highscore-text', 'img/highscore-text.png');
		this.load.image('button-pause', 'img/button-pause.png');
		this.load.image('button-blackmoon', 'img/button-blackmoon.png');
		this.load.image('button-enclave', 'img/button-enclave.png');
		this.load.image('monster-sleeps', 'img/monster-sleeps.png');
		this.load.image('screen-pause', 'img/screen-pause.png');
		this.load.image('screen-story', 'img/screen-story.png');
		this.load.image('screen-howto', 'img/screen-howto.png');
		this.load.image('screen-overlay', 'img/screen-overlay.png');
		this.load.image('screen-achievements', 'img/screen-achievements.png');
		this.load.image('text-paused', 'img/text-paused.png');
		this.load.image('text-gameover', 'img/text-gameover.png');
		this.load.image('text-newbestscore', 'img/text-newbestscore.png');

		this.load.text('font-ttf', 'fonts/comicbook.ttf');
		this.load.text('font-svg', 'fonts/comicbook.svg');
		this.load.text('font-ttf', 'fonts/comicbook.ttf');
		this.load.text('font-woff', 'fonts/comicbook.woff');

		this.load.spritesheet('candy', 'img/candy.png', 82, 98);
		this.load.spritesheet('hunger-meter', 'img/hunger-meter.png', 289, 45);
		this.load.spritesheet('monster-idle', 'img/monster-idle.png', 103, 131);
		this.load.spritesheet('monster-up', 'img/monster-up.png', 107, 153);
		this.load.spritesheet('monster-down', 'img/monster-down.png', 128, 108);
		this.load.spritesheet('monster-eats', 'img/monster-eats.png', 111, 136);
		this.load.spritesheet('monster-walks', 'img/monster-walks.png', 103, 135);
		this.load.spritesheet('button-start', 'img/button-start.png', 401, 143);
		this.load.spritesheet('button-audio', 'img/button-audio.png', 111, 96);
		this.load.spritesheet('button-continue', 'img/button-continue.png', 358, 133);
		this.load.spritesheet('button-back', 'img/button-back.png', 358, 133);
		this.load.spritesheet('button-restart', 'img/button-restart.png', 363, 131);
		this.load.spritesheet('button-achievements', 'img/button-achievements.png', 182, 66);

		// this.load.audio('sound1', ['audio/1-Shaker.wav']);
	},
	create: function() {
		this.game.state.start('MainMenu');
	}
};