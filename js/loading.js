var platformer = platformer || {};

platformer.loading = {
	init: function(){
		
	},
	preload: function(){
		// preloading various assets
		platformer.game.load.image('logo', 'assets/logo.png');
		platformer.game.load.spritesheet("play_button", "assets/play_button.png", 256, 64);
        platformer.game.load.spritesheet("levels", "assets/levels.png", 64, 64);
		platformer.game.load.spritesheet("level_arrows", "assets/level_arrows.png", 48, 48);
		platformer.game.load.tilemap('level_1', 'assets/level_1.json', null, Phaser.Tilemap.TILED_JSON);
		platformer.game.load.tilemap('level_2', 'assets/level_2.json', null, Phaser.Tilemap.TILED_JSON);
		platformer.game.load.image('player', 'assets/alienGreen_front.png');
		platformer.game.load.image('player_ship', 'assets/shipGreen_manned.png');
		//platformer.game.load.image('bg', 'assets/bg.png');
		platformer.game.load.image('tiles_ground', 'assets/tiles_ground.png');
		platformer.game.load.image('coin_bronze', 'assets/coinBronze.png');
		platformer.game.load.image('coin_silver', 'assets/coinSilver.png');
		platformer.game.load.image('coin_gold', 'assets/coinGold.png');
		platformer.game.load.image('gem_red', 'assets/gemRed.png');
		platformer.game.load.image('gem_green', 'assets/gemGreen.png');
		platformer.game.load.image('gem_blue', 'assets/gemBlue.png');
		platformer.game.load.image('spikes', 'assets/spikes.png');
		platformer.game.load.image('door_closed', 'assets/doorClosed.png');
		platformer.game.load.image('door_open', 'assets/doorOpen.png');
	},
	create: function(){
		// going to level select state
		platformer.game.state.start("StartPage");
	}
}