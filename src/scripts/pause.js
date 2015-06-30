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
var bullets;

var bullet;
var bulletTime = 0;

var pauseKey;
var fireKey;

function preload() {
  game.load.image('player', '../assets/player.png');
  game.load.image('bullet', '../assets/laserRed.png');
}

function create() {
  game.stage.backgroundColor = "#000000";

  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;

  for (var i = 0; i < 20; i++) {
    var b = bullets.create(0, 0, 'bullet');
    b.name = 'bullet' + i;
    b.exists = false;
    b.visible = false;
    b.checkWorldBounds = true;
    b.events.onOutOfBounds.add(resetBullet, this);
  }
  
  player = game.add.sprite(350, 520, 'player');
  game.physics.enable(player, Phaser.Physics.ARCADE);

  cursors = game.input.keyboard.createCursorKeys();

  fireKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  fireKey.onDown.add(fireBullet, this);

  pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
  pauseKey.onDown.add(togglePause, this);
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

function fireBullet () {
  if (game.time.now > bulletTime) {
    bullet = bullets.getFirstExists(false);

    if (bullet) {
      bullet.reset(player.x + 45, player.y - 8);
      bullet.body.velocity.y = -350;
      bulletTime = game.time.now + 450;
    }
  }
}

function resetBullet(bullet) {
  bullet.kill();
}

function togglePause() {
  game.physics.arcade.isPaused = !game.physics.arcade.isPaused;
}