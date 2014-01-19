Candy.StoryHowto = function(game) {
	buttonContinue = null;
	state = null;
};
Candy.StoryHowto.prototype = {
	create: function() {
		this.showStory();
	},
	showStory: function() {
		this.game.add.sprite(0, 0, 'background');
		this.game.add.sprite(0, 0, 'screen-story');
		this.state = 'story';
		this.buttonContinue = this.add.button((640-358)/2, 960-133-70, 'button-continue', this.showHowto, this);
	},
	showHowto: function() {
		this.game.add.sprite(0, 0, 'background');
			this.game.add.sprite(0, 0, 'screen-howto');
		this.state = 'howto';
		this.buttonContinue = this.add.button((640-358)/2, 960-133-70, 'button-continue', this.startGame, this);
	},
	startGame: function() {
		this.game.state.start('Game');
	}
};