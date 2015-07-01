var game = new Phaser.Game(
  800, 
  600, 
  Phaser.CANVAS, 
  'falling-invaders', 
  {
    preload: preload, 
    create: create, 
    update: update
  });

function preload() {
  game.load.image('player', '../assets/player.png');
}

function create() {
  game.stage.backgroundColor = "#000000";
  player = game.add.sprite(350, 520, 'player');
}

function update() {
  // Collitions, movements, game logic
}