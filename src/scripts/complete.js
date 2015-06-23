var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'asteroids-fall-again', {preload: preload, create: create, update: update});

function preload() {
  game.load.image('player', '../assets/player.png');
  game.load.image('asteroid', '../assets/asteroidBig.png');
  game.load.image('bullet', '../assets/laserRed.png');
  game.load.image('enemy', '../assets/enemyShip.png');
  game.load.image('laserGreen', '../assets/laserGreen.png');
}

var player;
var bullets
var asteroids;

var enemies;
var enemiesTotal = 0;
var downTime = 0;

var cursors;

var bulletTime = 0;
var bullet;

var direction = 1;

function create() {
  game.stage.backgroundColor = "#000000";

  asteroids = game.add.group();
  asteroids.enableBody = true;
  asteroids.physicsBodyType = Phaser.Physics.ARCADE;

  // a = asteroids.create(game.world.randomX, Math.random() * 500, 'asteroid');
  // a.name = 'as';
  // a.body.immovable = true;

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

  enemies = game.add.group();
  enemies.enableBody = true;
  enemies.physicsBodyType = Phaser.Physics.ARCADE;

  var enemyWidth = 64;
  var enemyHeight = 33;
  var enemyDelta = 9;
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 5; j++) {
      var x = (i * enemyWidth) + (i * enemyDelta);
      var y = (j * enemyHeight) + (j * enemyDelta);
      var e = enemies.create(x, y, 'enemy');
      // e.checkWorldBounds = true;
      e.body.velocity.x = 100;
      // e.events.onOutOfBounds.add(changePath, this);
    }
  }
  enemiesTotal = enemies.countLiving();

  player = game.add.sprite(350, 520, 'player');
  game.physics.enable(player, Phaser.Physics.ARCADE);

  cursors = game.input.keyboard.createCursorKeys();
  //game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

  fireKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {
  game.physics.arcade.overlap(bullets, enemies, collisionHandler, null, this);

  player.body.velocity.x = 0;
  player.body.velocity.y = 0;

  if (game.time.now > downTime) {
    enemies.setAll('body.velocity.y', 0, true);
  }

  if (cursors.left.isDown) {
    if (player.x <= 0) {
      player.x = 0;
    } else {
      player.body.velocity.x = -300;
    }
  } else if (cursors.right.isDown) {
    if (player.x + player.width >= game.width) {
      player.x = game.width - player.width;
    } else {
      player.body.velocity.x = 300;
    }
  }

  var touchBound = false;
  enemies.forEachAlive(function (enemy) {
    if (direction == 1 && enemy.x > game.width - enemy.width) {
      enemies.setAll('body.velocity.x', enemy.body.velocity.x * -1, true);
      direction = -1; // LEFT
      touchBound = true;
    } else if (direction == -1 && enemy.x < 0) {
      enemies.setAll('body.velocity.x', enemy.body.velocity.x * -1, true);
      direction = 1; // RIGHT
      touchBound = true;
    }

    if (touchBound) {
      enemies.setAll('body.velocity.y', 80, true);
      downTime = game.time.now + 150;
      return false;
    }
  }, this);

  game.input.keyboard.addCallbacks(this, null, function (e) {
    if (e.keyCode == Phaser.Keyboard.SPACEBAR) {
      fireBullet();
    }
  });
}

function changePath(enemy) {
  //debugger;
  console.log('bla');
  enemies.setAll('body.velocity.x', enemy.body.velocity.x * - 1, true);
}

function fireBullet () {
  if (game.time.now > bulletTime) {
    bullet = bullets.getFirstExists(false);

    if (bullet) {
      bullet.reset(player.x + 45, player.y - 8);
      bullet.body.velocity.y = -300;
      bulletTime = game.time.now + 500;
    }
  }
}

function resetBullet (bullet) {
  bullet.kill();
}

function collisionHandler (bullet, enemy) {
  bullet.kill();
  enemy.kill();
}