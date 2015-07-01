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

var player;
var cursors;

function preload() {
  game.load.image('player', '../assets/player.png');
}

function create() {
  game.stage.backgroundColor = "#000000";
  
  player = game.add.sprite(350, 520, 'player');
  this.game.physics.enable(player, Phaser.Physics.ARCADE);

  cursors = this.game.input.keyboard.createCursorKeys();
}

function update() {
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;

  if (cursors.left.isDown) {
    if (player.x <= 0) {
      player.x = 0;
    } else {
      player.body.velocity.x = -350;
    }
  } else if (cursors.right.isDown) {
    if (player.x + player.width >= game.width) {
      player.x = game.width - player.width;
    } else {
      player.body.velocity.x = 350;
    }
  }
}