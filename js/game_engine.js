var platformer = platformer || {};

var PICKUPS = {
    kCoinBronze: 0,
    kCoinSilver: 1,
    kCoinGold: 2,
    kGemRed: 3,
    kGemGreen: 4,
    kGemBlue: 5
};

var player;
var map;
var layer;
var tiles;
var cursors;
var pickups = new Array();
var items = new Array();
var stars = 0;
var exit;

platformer.gameEngine = {
  	create: function(){
		/*var bg = platformer.game.add.image(0, 0, 'bg');
	    bg.fixedToCamera = true;*/
		
		platformer.game.stage.backgroundColor = "#a9f0ff";

	    //  Activate the Ninja physics system
	    platformer.game.physics.startSystem(Phaser.Physics.NINJA);

	    stars = 0;

	    map = platformer.game.add.tilemap('level_' + platformer.game.global.level);

	    map.addTilesetImage('tiles_ground');
	    
	    layer = map.createLayer('Tile Layer 1');

	    layer.resizeWorld();

	    var slopeMap = { '1': 1, '2': 1, '8': 1, '9': 1, '24': 3, '25': 3, '32': 2, '33': 2, '72': 1, '73': 1, '80': 1, '81': 1 };

	    tiles = platformer.game.physics.ninja.convertTilemap(map, layer, slopeMap);

	    var self = this;
		
		map.objects['Object Layer 1'].forEach(function(element){
			switch(element.name){
				case 'player_start':
					self.createPlayer(element.x, element.y - element.properties.height);
					break;
				case 'coin_bronze':
					var coin = self.createPickup(element.x, element.y - element.properties.height, PICKUPS.kCoinBronze);
					pickups.push(coin);
					break;
				case 'coin_silver':
					var coin = self.createPickup(element.x, element.y - element.properties.height, PICKUPS.kCoinSilver);
					pickups.push(coin);
					break;
				case 'coin_gold':
					var coin = self.createPickup(element.x, element.y - element.properties.height, PICKUPS.kCoinGold);
					pickups.push(coin);
					break;
				case 'gem_red':
					var gem = self.createPickup(element.x, element.y - element.properties.height, PICKUPS.kGemRed);
					pickups.push(gem);
					break;
				case 'gem_green':
					var gem = self.createPickup(element.x, element.y - element.properties.height, PICKUPS.kGemGreen);
					pickups.push(gem);
					break;
				case 'gem_blue':
					var gem = self.createPickup(element.x, element.y - element.properties.height, PICKUPS.kGemBlue);
					pickups.push(gem);
					break;
				case 'spikes':
					var spikes = self.createSpikes(element.x, element.y - element.properties.height);
					items.push(spikes);
					break;
				case 'exit':
					self.createExit(element.x, element.y - element.properties.height);
					break;
			}
		});

		coinsText = platformer.game.add.text(0, 0, "Coins: 0", {
			font: "18px Arial",
			fill: "#ffffff",
			align: "left",
			boundsAlignH: "left",
		});
		coinsText.setTextBounds(16, 16, 768, 568);
	    coinsText.fixedToCamera = true;
	    //coinsText.cameraOffset.setTo(200, 500);

		this.updateCoins();

		starsText = platformer.game.add.text(0, 0, "Stars: 0", {
			font: "18px Arial",
			fill: "#ffffff",
			align: "right",
			boundsAlignH: "right",
		});
		starsText.setTextBounds(16, 16, 768, 568);
	    starsText.fixedToCamera = true;
	    //starsText.cameraOffset.setTo(200, 500);

		this.updateStars();

	    cursors = platformer.game.input.keyboard.createCursorKeys();
	},
	createPlayer: function(x, y) {
		player = platformer.game.add.sprite(x, y, 'player');
		/*playerShip = platformer.game.add.sprite(50, 50, 'player_ship');
		playerShip.visible = false;*/
		
		/*player.anchor.x = 0.5;
		player.anchor.y = 0.5;*/
		player.anchor.set(0.5);
		
		/*playerShip.anchor.x = 0.5;
		playerShip.anchor.y = 0.5;*/
		//playerShip.anchor.set(0.5);
		
		//platformer.game.physics.ninja.enableCircle(player, player.width / 2);
		platformer.game.physics.ninja.enable(player);
		
		//console.log(player.body.aabb);
		//player.body.aabb.xw = 32;
		player.body.aabb.yw = 75;
		player.anchor.y = 0.7;

	    //  A little more bounce
	    player.body.bounce = 0.2;

	    platformer.game.camera.follow(player);
	},
	createPickup: function(x, y, type) {
		var assetName;
		switch(type) {
			case PICKUPS.kCoinBronze:
				assetName = 'coin_bronze';
				break;
			case PICKUPS.kCoinSilver:
				assetName = 'coin_silver';
				break;
			case PICKUPS.kCoinGold:
				assetName = 'coin_gold';
				break;
			case PICKUPS.kGemRed:
				assetName = 'gem_red';
				break;
			case PICKUPS.kGemGreen:
				assetName = 'gem_green';
				break;
			case PICKUPS.kGemBlue:
				assetName = 'gem_blue';
				break;
		}
		
		var pickup = platformer.game.add.sprite(x, y, assetName);

		pickup.pickupType = type;
		
		platformer.game.physics.ninja.enable(pickup);
		
		pickup.body.gravityScale = 0;
		
		return pickup;
	},
	createSpikes: function(x, y) {
		spikes = platformer.game.add.sprite(x, y, 'spikes');
		
		//platformer.game.physics.ninja.enableCircle(spikes, spikes.width / 2);
		platformer.game.physics.ninja.enable(spikes);
		
	    spikes.body.gravityScale = 0;

	    return spikes;
	},
	createExit: function(x, y) {
		exit = platformer.game.add.sprite(x, y, 'door_closed');
		
		//platformer.game.physics.ninja.enableCircle(exit, exit.width / 2);
		platformer.game.physics.ninja.enable(exit);
		
	    exit.body.gravityScale = 0;
	},
	update: function() {
		if(player.body.aabb.xw == 64)
		{
			player.body.aabb.xw = 32;
		}

	    for (var i = 0; i < tiles.length; i++)
	    {
			player.body.aabb.collideAABBVsTile(tiles[i].tile);
	    }
		
		for (var i = 0; i < pickups.length; i++)
		{
			platformer.game.physics.ninja.overlap(player, pickups[i], function(player, pickup){
				if(pickup.pickupType == PICKUPS.kCoinBronze){
					platformer.game.global.coins += 1;
					this.updateCoins();
				}else if(pickup.pickupType == PICKUPS.kCoinSilver){
					platformer.game.global.coins += 5;
					this.updateCoins();
				}else if(pickup.pickupType == PICKUPS.kCoinGold){
					platformer.game.global.coins += 10;
					this.updateCoins();
				}else if(pickup.pickupType == PICKUPS.kGemRed){
					stars++;
					this.updateStars();
				}else if(pickup.pickupType == PICKUPS.kGemGreen){
					stars++;
					this.updateStars();
				}else if(pickup.pickupType == PICKUPS.kGemBlue){
					stars++;
					this.updateStars();
				}
				pickup.destroy();
				pickups.splice(i, 1);
				i--;
			}, null, this);
		}

		for (var i = 0; i < items.length; i++)
		{
			platformer.game.physics.ninja.overlap(player, items[i], function(player, item){
				stars = 0;
				platformer.game.state.start("LevelSelect");
			}, null, this);
		}

		platformer.game.physics.ninja.overlap(player, exit, function(player, exit){
			if(platformer.game.global.starsArray[platformer.game.global.level-1]<stars){
				platformer.game.global.starsArray[platformer.game.global.level-1] = stars;
			}
			// if we completed a level and next level is locked - and exists - then unlock it
			if(stars>0 && platformer.game.global.starsArray[platformer.game.global.level]==4 && platformer.game.global.level<platformer.game.global.starsArray.length){
				platformer.game.global.starsArray[platformer.game.global.level] = 0;	
			}
			// back to level selection
			platformer.game.state.start("LevelSelect");
		}, null, this);

	    if (cursors.left.isDown)
	    {
	        player.body.moveLeft(20);
	    }
	    else if (cursors.right.isDown)
	    {
	        player.body.moveRight(20);
	    }

	    if (cursors.up.isDown || cursors.down.isDown)
	    {
	        player.body.moveUp(20);
			//player.visible = false;
			//playerShip.visible = true;
			player.loadTexture("player_ship");
	    }
	    else
	    {
	        //player.visible = true;
			//playerShip.visible = false;
			player.loadTexture("player");
	    }
		
		//playerShip.x = player.x;
		//playerShip.y = player.y;
	},
	updateCoins: function(){
		coinsText.setText("Coins: " + platformer.game.global.coins);
	},
	updateStars: function(){
		starsText.setText("Stars: " + stars);
	},
	levelFinished: function(button){
		// did we improved our stars in current level?
		if(platformer.game.global.starsArray[platformer.game.global.level-1]<button.frame){
			platformer.game.global.starsArray[platformer.game.global.level-1] = button.frame;
		}
		// if we completed a level and next level is locked - and exists - then unlock it
		if(button.frame>0 && platformer.game.global.starsArray[platformer.game.global.level]==4 && platformer.game.global.level<platformer.game.global.starsArray.length){
			platformer.game.global.starsArray[platformer.game.global.level] = 0;	
		}
		// back to level selection
		platformer.game.state.start("LevelSelect");
	}
}