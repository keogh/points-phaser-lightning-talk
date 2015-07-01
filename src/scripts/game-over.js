var splashState = function (game){}
splashState.prototype = (function () {
  function create() {
    var style = { font: "35px minecraftia", fill: "#00ff00", align: "center" };
    var text = this.game.add.text(
      this.game.world.centerX,
      this.game.world.centerY,
      "Falling Invaders",
      style
    );

    text.anchor.set(0.5);
    this.input.onDown.add(startGame, this);
  }

  function startGame() {
      this.game.state.start('play');
  }

  return {
    create: create
  }
})();

var playState = function (game) {}
playState.prototype = (function () {
  var player;
  var bullets;

  var enemies;
  var enemiesTotal = 0;
  var downTime = 0;

  var cursors;

  var bulletTime = 0;
  var bullet;

  var direction;

  var pauseKey;
  var fireKey;

  var gameInitialTime = 0; 

  function preload() {
    this.game.load.image('player', '../assets/player.png');
    this.game.load.image('bullet', '../assets/laserRed.png');
    this.game.load.image('enemy', '../assets/enemyShip.png');
    this.game.load.image('laserGreen', '../assets/laserGreen.png');
  }

  function create() {
    direction = 1;
    this.game.stage.backgroundColor = "#000000";

    bullets = this.game.add.group();
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
        var y = (j * enemyHeight) + (j * enemyDelta) + 220;
        var e = enemies.create(x, y, 'enemy');
        e.body.velocity.x = 100;
      }
    }
    enemiesTotal = enemies.countLiving();

    player = this.game.add.sprite(350, 520, 'player');
    this.game.physics.enable(player, Phaser.Physics.ARCADE);

    cursors = this.game.input.keyboard.createCursorKeys();
    
    pauseKey = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
    pauseKey.onDown.add(togglePause, this);

    fireKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    fireKey.onDown.add(fireBullet, this);

    gameInitialTime = this.game.time.now;
    this.game.physics.arcade.isPaused = true;
    //console.log(gameInitialTime);
  }

  function update() {
    if (gameInitialTime && this.game.time.now - gameInitialTime > 1500) {
      this.game.physics.arcade.isPaused = false;
      gameInitialTime = null;
    }

    this.game.physics.arcade.overlap(bullets, enemies, collisionHandler, null, this);

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

    var touchBound = false;
    var that = this;
    enemies.forEachAlive(function (enemy) {
      if (enemy.y + enemy.height > player.y) {
        that.game.state.start('gameover');
        return false;
      }
      if (direction == 1 && enemy.x > this.game.width - enemy.width) {
        changePath(enemy.body.velocity.x);
        touchBound = true;
      } else if (direction == -1 && enemy.x < 0) {
        changePath(enemy.body.velocity.x);
        touchBound = true;
      }

      if (touchBound) {
        enemies.setAll('body.velocity.y', 80, true);
        downTime = this.game.time.now + 150;
        return false;
      }
    }, this);

    var currentEnemiesTotal = enemies.countLiving();
    if (currentEnemiesTotal <= 0) {
      this.game.state.start('play', true, true);
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

  function togglePause() {
    this.game.physics.arcade.isPaused = !this.game.physics.arcade.isPaused;
  }

  function changePath(initialVelocity) {
    enemies.setAll('body.velocity.x', initialVelocity * - 1, true);
    direction = direction * -1;
  }

  function fireBullet () {
    if (this.game.time.now > bulletTime) {
      bullet = bullets.getFirstExists(false);

      if (bullet) {
        bullet.reset(player.x + 45, player.y - 8);
        bullet.body.velocity.y = -350;
        bulletTime = this.game.time.now + 450;
      }
    }
  }

  function resetBullet(bullet) {
    bullet.kill();
  }

  function collisionHandler(bullet, enemy) {
    bullet.kill();
    enemy.kill();
  }

  return {
    preload: preload,
    create: create,
    update: update
  };
})();

var gameOverState = function (game){}
gameOverState.prototype = (function () {
  function create() {
    var style = { font: "35px minecraftia", fill: "#FFFFFF", align: "center" };
    var text = this.game.add.text(
      this.game.world.centerX,
      this.game.world.centerY,
      "GAME OVER",
      style
    );

    text.anchor.set(0.5);
    this.input.onDown.add(restartGame, this);
  }

  function restartGame() {
      this.game.state.start('splash');
  }

  return {
    create: create
  }
})();

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'falling-invaders');

game.state.add('splash', splashState)
game.state.add('play', playState);
game.state.add('gameover', gameOverState);
game.state.start('splash');