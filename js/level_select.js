var platformer = platformer || {};

var pages;
var levelThumbsGroup;
var currentPage;
var leftArrow;
var rightArrow;
var thumbRows = 5;
var thumbCols = 4;
var thumbWidth = 64;
var thumbHeight = 64;
var thumbSpacing = 8;
 
platformer.levelSelect = {
  	create: function(){
  		platformer.game.stage.backgroundColor = "#000000";
  		pages = Math.ceil(platformer.game.global.starsArray.length / (thumbRows * thumbCols));
		currentPage = Math.floor(platformer.game.global.level / (thumbRows * thumbCols));
		if(currentPage>pages-1){
			currentPage = pages-1;
		}
		leftArrow = platformer.game.add.button((platformer.game.width * 0.5) - 100,420,"level_arrows",this.arrowClicked,this);
		leftArrow.anchor.setTo(0.5);
		leftArrow.frame = 0;
		if(currentPage==0){
			leftArrow.alpha = 0.3;
		}
		rightArrow = platformer.game.add.button((platformer.game.width * 0.5) + 100,420,"level_arrows",this.arrowClicked,this);
		rightArrow.anchor.setTo(0.5);
		rightArrow.frame = 1;
		if(currentPage==pages-1){
			rightArrow.alpha = 0.3;
		}
		levelThumbsGroup = platformer.game.add.group();
		var levelLength = thumbWidth*thumbCols+thumbSpacing*(thumbCols-1);
		var levelHeight = thumbWidth*thumbRows+thumbSpacing*(thumbRows-1);
		for(var l = 0; l < pages; l++){
			var offsetX = (platformer.game.width-levelLength)/2+platformer.game.width*l;
			var offsetY = 20;
		     for(var i = 0; i < thumbRows; i ++){
		     	for(var j = 0; j < thumbCols; j ++){
					var levelNumber = i*thumbCols+j+l*(thumbRows*thumbCols);
					if(levelNumber < platformer.game.global.starsArray.length){
						var levelThumb = platformer.game.add.button(offsetX+j*(thumbWidth+thumbSpacing), offsetY+i*(thumbHeight+thumbSpacing), "levels", this.thumbClicked, this);	
						levelThumb.frame=platformer.game.global.starsArray[levelNumber];
						levelThumb.levelNumber = levelNumber+1;
						levelThumbsGroup.add(levelThumb);
						if(platformer.game.global.starsArray[levelNumber]<4){
							var style = {
								font: "18px Arial",
								fill: "#ffffff"
							};
							var levelText = platformer.game.add.text(levelThumb.x+5,levelThumb.y+5,levelNumber+1,style);
							levelText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 1);
							levelThumbsGroup.add(levelText);
						}
					}else{
						break;
					}
				}
			}
		}
		levelThumbsGroup.x = currentPage * platformer.game.width * -1
	},
	arrowClicked:function(button){
		if(button.frame==1 && currentPage<pages-1){
			leftArrow.alpha = 1;
			currentPage++;
			if(currentPage == pages-1){
				button.alpha = 0.3;
			}
			var buttonsTween = platformer.game.add.tween(levelThumbsGroup);
			buttonsTween.to({
				x: currentPage * platformer.game.width * -1
			}, 500, Phaser.Easing.Cubic.None);
			buttonsTween.start();
		}
		if(button.frame==0 && currentPage>0){
			rightArrow.alpha = 1;
			currentPage--;
			if(currentPage == 0){
				button.alpha = 0.3;
			}
			var buttonsTween = platformer.game.add.tween(levelThumbsGroup);
			buttonsTween.to({
				x: currentPage * platformer.game.width * -1
			}, 400, Phaser.Easing.Cubic.None);
			buttonsTween.start();
		}		
	},
	thumbClicked:function(button){
		if(button.frame < 4){
			platformer.game.global.level = button.levelNumber;
			platformer.game.state.start("GameEngine");
		}
		else{
			var buttonTween = platformer.game.add.tween(button)
			buttonTween.to({
				alpha: 0.5
			}, 20, Phaser.Easing.Cubic.None);
			buttonTween.to({
				alpha: 1
			}, 20, Phaser.Easing.Cubic.None);
			buttonTween.to({
				alpha: 0.5
			}, 20, Phaser.Easing.Cubic.None);
			buttonTween.to({
				alpha: 1
			}, 20, Phaser.Easing.Cubic.None);
			buttonTween.start();
		}
	}
}