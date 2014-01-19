var Candy = {};
Candy.Boot = function(game){};
Candy.Boot.prototype = {
	preload: function(){
		this.load.image('preloaderBar', 'img/loading-bar.png');
	},
	create: function(){
		this.game.input.maxPointers = 1;
		// this.game.stage.disablePauseScreen = true;
		this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
		this.game.stage.disableVisibilityChange = true;
		this.game.stage.scale.forcePortrait = true;
		this.game.stage.scale.pageAlignHorizontally = true;
		this.game.stage.scale.setScreenSize(true);
		this.game.state.start('Preloader');
	}
};