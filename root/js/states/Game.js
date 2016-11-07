var MrHop = MrHop || {};

MrHop.GameState = {
  init: function() {

    // pool floors
    this.floorPool = this.add.group();

    // gravity enable
    this.game.physics.arcade.gravity.y = 1000;

    // max jumping distance
    this.maxJumpDistance = 60;
    this.maxJumpDistance2 = 200;

    // move player with up kety
    this.cursors = this.game.input.keyboard.createCursorKeys();

    // coins
    this.myCoins = 0;
  },
  create: function() {

    // create the player
    this.player = this.add.sprite(50, 80, 'player');
    this.player.anchor.setTo(0.5);
    this.player.animations.add('running', [0, 1, 2, 3, 2, 1], 15, true);
    this.game.physics.arcade.enable(this.player);
    // change player bounding box = x, y and the two origin points
    // used for collision
    this.player.body.setSize(34, 60, 7, 5);
    this.player.play('running');
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
    this.platform = new MrHop.Platform(this.game, this.floorPool, 12, 0, 280);
    this.add.existing(this.platform);
    //
    // var platform2 = new MrHop.Platform(this.game, this.floorPool, 6, 100, 240);
    // this.add.existing(platform);
    //
    this.platformI2 = new MrHop.PlatformInverse(this.game,this.floorPool, 12, 0, 40);

    this.add.existing(this.platformI2);

  },
  update: function() {
    this.game.physics.arcade.collide(this.player, this.platform);
    this.game.physics.arcade.collide(this.player2, this.platform);
    this.game.physics.arcade.collide(this.player, this.platformI2);
    this.game.physics.arcade.collide(this.player2, this.platformI2);
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
  },
  // great for debugging
  render: function() {
    // used for dubugging bounding box
    this.game.debug.body(this.player);
    this.game.debug.body(this.player2);
    // add the body info regarding selected
    this.game.debug.bodyInfo(this.player, 0, 30);
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
  }

};
