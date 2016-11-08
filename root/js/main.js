var MrHop = MrHop || {};

MrHop.game = new Phaser.Game(560, 320, Phaser.CANVAS);

MrHop.game.state.add('Boot', MrHop.BootState);
MrHop.game.state.add('Preload', MrHop.PreloadState);
MrHop.game.state.add('Home', MrHop.HomeState);
MrHop.game.state.add('Game', MrHop.GameState);

MrHop.game.state.start('Boot');
