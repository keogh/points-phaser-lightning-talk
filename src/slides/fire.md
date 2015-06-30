# Fire!

``` javascript
...
var bullets;
var bullet;
var bulletTime = 0;

var fireKey;

function preload() {
  game.load.image('player', '../assets/player.png');
  game.load.image('bullet', '../assets/laserRed.png');
}

function create() {
  ...

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
  
  ...

  fireKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  fireKey.onDown.add(fireBullet, this);
}

function resetBullet(bullet) {
  bullet.kill();
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
```

---