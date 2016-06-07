var platformer = platformer || {};
 
platformer.startPage = {
  	create: function(){
  		logo = platformer.game.add.sprite(platformer.game.width * 0.5, 120, 'logo');
		logo.anchor.setTo(0.5);

		playButton = platformer.game.add.button(platformer.game.width * 0.5, platformer.game.height * 0.5, "play_button", this.buttonClicked, this, 1, 0, 2, 0);
		playButton.onInputOver.add(this.over, this);
		playButton.onInputDown.add(this.down, this);
		playButton.onInputOut.add(this.out, this);
		playButton.onInputUp.add(this.up, this);
		playButton.anchor.setTo(0.5);
		playButton.frame = 0;
		var style = {
			font: "30px Arial",
			fill: "#FFFFFF"
		};
		var playText = platformer.game.add.text(playButton.x, playButton.y, "Play", style);
		playText.anchor.setTo(0.5);
		playText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 1);
	},
	buttonClicked: function(button, pointer, isOver){
		if(isOver){
			platformer.game.state.start("LevelSelect");
		}
	},
	over: function(button, pointer){
		
	},
	down: function(button, pointer){
		
	},
	out: function(button, pointer){
		
	},
	up: function(button, pointer, isOver){
		
	}
}