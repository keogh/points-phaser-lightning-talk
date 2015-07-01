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

var enemies;

var downTime = 0;
var direction;

var enemiesTotal = 0;

function preload() {
  game.load.image('player', '../assets/player.png');
  game.load.image('bullet', '../assets/laserRed.png');
  game.load.image('enemy', '../assets/enemyShip.png');
}

function create() {
  direction = 1;
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

  enemies = this.game.add.group();
  enemies.enableBody = true;
  enemies.physicsBodyType = Phaser.Physics.ARCADE;

  var enemyWidth = 64;
  var enemyHeight = 33;
  var enemyDelta = 9;
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
      var x = (i * enemyWidth) + (i * enemyDelta);
      var y = (j * enemyHeight) + (j * enemyDelta);
      var e = enemies.create(x, y, 'enemy');
      e.body.velocity.x = 100;
    }
  }
  enemiesTotal = enemies.countLiving();
  
  player = game.add.sprite(350, 520, 'player');
  game.physics.enable(player, Phaser.Physics.ARCADE);

  cursors = game.input.keyboard.createCursorKeys();

  fireKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  fireKey.onDown.add(fireBullet, this);

  pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
  pauseKey.onDown.add(togglePause, this);
}

function update() {
  game.physics.arcade.overlap(bullets, enemies, collisionHandler, null, this);

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

  if (downTime > 0 && game.time.now > downTime) {
    enemies.setAll('body.velocity.y', 0, true);
    downTime = 0;
  }

  enemies.forEachAlive(function (enemy) {
    if (direction == 1 && enemy.x > game.width - enemy.width || direction == -1 && enemy.x < 0) {
      changePath(enemy.body.velocity.x);
      enemies.setAll('body.velocity.y', 80, true);
      downTime = this.game.time.now + 150;
      return false; 
    }
  }, this);

  var currentEnemiesTotal = enemies.countLiving();
  if (currentEnemiesTotal <= 0) {
    // End Level
  } else if (enemiesTotal - currentEnemiesTotal >= 3) {
    var enemy = enemies.getFirstExists(true);
    if (enemy) {
      var velocity = enemy.body.velocity.x;
      if (velocity > 0) {        
        enemies.setAll('body.velocity.x', velocity + 30, true);
      } else {
        enemies.setAll('body.velocity.x', velocity - 30, true);
      }
    }
    enemiesTotal = currentEnemiesTotal;
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

function changePath(initialVelocity) {
  enemies.setAll('body.velocity.x', initialVelocity * - 1, true);
  direction = direction * -1;
}

function collisionHandler(bullet, enemy) {
  bullet.kill();
  enemy.kill();
}