var MrHop = MrHop || {};

MrHop.GameState = {
  init: function() {

    // pool floors
    this.floorPool = this.add.group();
    this.floorPool2 = this.add.group();

    // pool of platforms
    this.platformPool1 = this.add.group();
    this.platformpool2 = this.add.group();

    // gravity enable
    this.game.physics.arcade.gravity.y = 1000;

    // max jumping distance
    this.maxJumpDistance = 60;
    this.maxJumpDistance2 = 200;

    // Allow keyboard movement in game
    this.cursors = this.game.input.keyboard.createCursorKeys();

    // coins
    this.myCoins = 0;
    // speed level
    this.levelSpeed = 200;
  },
  create: function() {
    this.background = this.game.add.sprite('background', 0, 0);
    this.background.scale.setTo(0.1);


    this.player = this.add.sprite(100,230, 'bot', 4);
    this.player.anchor.setTo(0.5);
    this.player.scale.setTo(0.35);
    this.player.animations.add('walk',[10,11], 10, true);
    this.player.animations.play('walk');
    this.game.physics.arcade.enable(this.player);
    this.player.body.setSize(120, 155, 0, 50);
  //   jellyfish.animations.add('swim', Phaser.Animation.generateFrameNames('blueJellyfish', 0, 32, '', 4), 30, true);
  //  jellyfish.animations.play('swim');
    // create the player
    // this.player = this.add.sprite(50, 80, 'player');
    // this.player.anchor.setTo(0.5);
    // this.player.animations.add('running', [0, 1, 2, 3, 2, 1], 15, true);
    // this.game.physics.arcade.enable(this.player);
    // change player bounding box = x, y and the two origin points
    // used for collision
    // this.player.body.setSize(34, 60, 7, 5);
    // this.player.play('running');
    // create the second player
    this.player2 = this.add.sprite(100, 200, 'player');
    this.player2.anchor.setTo(0.5);
    this.player2.scale.setTo(1, -1);
    this.player2.animations.add('running', [0, 1, 2, 3, 2, 1], 15, true);
    this.game.physics.arcade.enable(this.player2);
    this.player2.body.gravity.y += -2000;
    this.player2.body.setSize(34, 60, 7, 5);
    this.player2.play('running');

    // hard code first platform
    this.current_platform = new MrHop.Platform(this.game, this.floorPool, 8, 0, 280, this.levelSpeed);
    // create a pool of platforms and add those platforms to the group
    this.platformPool1.add(this.current_platform);
    //
    // this.platform2 = new MrHop.Platform(this.game, this.floorPool, 8, 400, 280, this.levelSpeed);
    // this.platformPool1.add(this.platform2);

    //
    // var platform2 = new MrHop.Platform(this.game, this.floorPool, 6, 100, 240);
    // this.add.existing(platform);
    //
    this.current_platformI1 = new MrHop.PlatformInverse(this.game,this.floorPool2, 12, 0, 40, this.levelSpeed);
    this.platformPool1.add(this.current_platformI1);
    //
    // this.platformI2 = new MrHop.PlatformInverse(this.game,this.floorPool2, 12, 560, 40, this.levelSpeed);
    // this.platformPool1.add(this.platformI2);
    // this.platformPool2.add(this.platformI2);
    this.loadLevel();

  },
  update: function() {
    // iterate through the group of groups checking those alive so as to add collision to each player
    this.platformPool1.forEachAlive(function(platform, index) {
      this.game.physics.arcade.collide(this.player2, platform);
      this.game.physics.arcade.collide(this.player, platform);
      // this.game.physics.arcade.collide(this.player3, platform);

    }, this);
    // checks that the player is touching the ground before increasing x
    if(this.player2.body.touching.up) {
      this.player2.body.velocity.x = this.levelSpeed;
    }
    else {
      //velocity does not change
      this.player2.body.velocity.x = 0;
    }

    if (this.player.body.touching.down) {
      this.player.body.velocity.x = this.levelSpeed;
    }
    else {
      //velocity does not change
      this.player.body.velocity.x = 0;
    }

    // adds the keyboard configuration will apply touch configuration soon
    if(this.cursors.left.isDown) {
      this.playerJump();
    }
    else if(this.cursors.left.isUp) {
      this.isJumping1 = false;
    }
    if(this.cursors.right.isDown) {
      this.player2Jump();
    }
    else if(this.cursors.right.isUp) {
      this.isJumping2 =false;
    }

    if(this.current_platform.length && this.current_platform.children[this.current_platform.length - 1].right < this.game.world.width) {
      this.createPlatform();
    }
    if(this.current_platformI1.length && this.current_platformI1.children[this.current_platformI1.length - 1].right < this.game.world.width) {
      this.createPlatformI();
    }
  },
  // great for debugging
  render: function() {
    // used for dubugging bounding box
    this.game.debug.body(this.player);
    this.game.debug.body(this.player2);
    // add the body info regarding selected
    this.game.debug.bodyInfo(this.player2, 0, 30);
  },
  playerJump:function() {
    if(this.player.body.touching.down) {
      console.log("hello");
      // starting point of the jump
      this.startJumpY = this.player.y;
      // keep track of the fact it is jumping
      this.isJumping1 = true;
      // true once peak jump is reached
      this.jumpPeaked1 = false;
      // the jumps value
      this.player.body.velocity.y = -300;
    }
    // confirms player is jumping as well as not peaked
    else if(this.isJumping1 && !this.jumpPeaked1) {
      // distance jumped worked out by workig out starting point of jump
      // then minuses playeers current position to find out how high jumped
      var distanceJumped = this.startJumpY - this.player.y;
      // confirms the distance jumped is less than the max distance determined previously
      if(distanceJumped <= this.maxJumpDistance) {
        // jump value
        this.player.body.velocity.y = -300;
      }
      else {
        // if max distance descend
        this.jumpPeaked1 = true;
      }
    }
  },
  player2Jump: function() {
    if(this.player2.body.touching.up) {
      console.log("down");
      // starting point of the jump
      this.startJumpY = this.player2.y;
      // keep track of the fact it is jumping
      this.isJumping2 = true;
      this.jumpPeaked2 = false;

      this.player2.body.velocity.y = 300;
    }
    else if(this.isJumping2 && !this.jumpPeaked2) {
      var distanceJumped = this.startJumpY + this.player2.y;

      if(distanceJumped <= this.maxJumpDistance2) {
        this.player2.body.velocity.y = 300;
      }
      else {
        this.jumpPeaked2 = true;
      }
    }
  },
  loadLevel: function() {
    this.levelData = {
      platforms: [
        {
          separation: 0,
          y: 280,
          numTiles: 4
        },
        {
          separation: 50,
          y: 280,
          numTiles: 6
        },
        {
          separation: 100,
          y: 280,
          numTiles: 3
        },
        {
          separation: 50,
          y: 200,
          numTiles: 4
        },
        {
          separation: 50,
          y: 200,
          numTiles: 4
        },
        {
          separation: 50,
          y: 250,
          numTiles: 8
        },
        {
          separation: 50,
          y: 250,
          numTiles: 4
        },
        {
          separation: 50,
          y: 250,
          numTiles: 3
        },
        {
          separation: 50,
          y: 250,
          numTiles: 5
        },
        {
          separation: 50,
          y: 250,
          numTiles: 3
        },
        {
          separation: 50,
          y: 250,
          numTiles: 2
        }
      ],
      platformsI: [
        {
          separation: 50,
          y: 40,
          numTiles: 4
        },
        {
          separation: 50,
          y:40,
          numTiles: 4
        },
        {
          separation: 50,
          y: 40,
          numTiles: 6
        },
        {
          separation: 50,
          y: 40,
          numTiles: 4
        },
        {
          separation: 50,
          y: 40,
          numTiles: 6
        },
        {
          separation: 50,
          y: 40,
          numTiles: 4
        },
        {
          separation: 50,
          y: 40,
          numTiles: 6
        },
        {
          separation: 50,
          y: 40,
          numTiles: 4
        }
      ]
    };

    this.currentIndex = 0;
    this.currentIndexI = 0;

    this.createPlatform();
    this.createPlatformI();
  },
  createPlatform: function() {
    var nextPlatformdata = this.levelData.platforms[this.currentIndex];


    if(nextPlatformdata) {
      console.log("hi");
      this.current_platform = new MrHop.Platform(this.game, this.floorPool, nextPlatformdata.numTiles, this.game.world.width + nextPlatformdata.separation, nextPlatformdata.y, this.levelSpeed );

      this.platformPool1.add(this.current_platform);

      this.currentIndex++;
    }

  },
  createPlatformI: function() {
    var nextIPlatformdata = this.levelData.platformsI[this.currentIndex];

    if(nextIPlatformdata) {
      console.log("hello");
      this.current_platformI1 = new MrHop.PlatformInverse(this.game, this.floorPool, nextIPlatformdata.numTiles, this.game.world.width + nextIPlatformdata.separation, nextIPlatformdata.y, this.levelSpeed );

      this.platformPool1.add(this.current_platformI1);

      this.currentIndexI++;
    }
  }

};
