var MrHop = MrHop || {};

MrHop.HomeState = {

  create: function() {
    this.background = this.game.add.sprite(0,0, 'background');
    this.background.inputEnabled = true;
    this.background.scale.setTo(0.47);
    // starts the game when clicked
    var style = {font: '40px Arial', fill: '#260404'};
    // Adds the text for the homepage
    var homeText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Touch to start", style);
    this.background.events.onInputDown.add(function() {
      this.state.start('Game');
    }, this);


    homeText.anchor.setTo(0.5);
  }
};
