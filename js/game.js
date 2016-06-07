var platformer = platformer || {};

platformer.game = new Phaser.Game(800, 600, Phaser.AUTO, "platformer-game", { init: init, preload: preload, create: create, update: update });

platformer.game.global = {
	coins: 0,
	// array with finished levels and stars collected.
	// 0 = playable yet unfinished level
	// 1, 2, 3 = level finished with 1, 2, 3 stars
	// 4 = locked
	starsArray : [0,4],
	// level currently playing
	level : 0
}


function init() {
	platformer.game.stage.backgroundColor = "#FFFFFF";
	platformer.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

	//platformer.game.scale.pageAlignHorizontally = true;
	//platformer.game.scale.pageAlignVertically = true;
	//platformer.game.scale.setScreenSize(true);
}

function preload() {
	
}

function create() {
	platformer.game.state.start("Loading");
}

function update() {
	//console.log("update");
}

// game states
 
platformer.game.state.add("Loading", platformer.loading);
platformer.game.state.add("StartPage", platformer.startPage);
platformer.game.state.add("LevelSelect", platformer.levelSelect);
platformer.game.state.add("GameEngine", platformer.gameEngine);