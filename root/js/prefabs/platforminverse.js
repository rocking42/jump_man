var MrHop = MrHop || {};
// example making smaller tiles and flipping the tiles
MrHop.PlatformInverse = function(game,floorPool, numTiles, x, y) {
  Phaser.Group.call(this, game);

  this.tileSize = 40;
  this.game = game;
  this.enableBody = true;
  this.floorPool = floorPool;

  this.prepare(numTiles, x, y);
};

MrHop.PlatformInverse.prototype = Object.create(Phaser.Group.prototype);
MrHop.PlatformInverse.prototype.constructor = MrHop.PlatformInverse;

MrHop.PlatformInverse.prototype.prepare = function(numTiles, x, y) {



    var i = 0;
    while(i < numTiles) {

    var floorTile = this.floorPool.getFirstExists(false);
    // checks if there is a floor tile if not adds a floor tile
    if(!floorTile) {
      floorTile = new Phaser.Sprite(this.game, x + i * this.tileSize, y, 'floor');
    }
    // else reuse the dead floor tile
    else {
      floorTile.reset(x + i * this.tileSize, y );
    }

    // scale a tile for when inverse is called in the future
    floorTile.scale.setTo(1, -1);
    // add the tile
    this.add(floorTile);
    i++;
  }
  // set physics properties
  this.setAll('body.immovable', true);
  this.setAll('body.allowGravity', false);
};
