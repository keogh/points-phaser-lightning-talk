# The Enemies

``` javascript
...

var enemies;

function preload() {
  ...
  game.load.image('enemy', '../assets/enemyShip.png');
}

function create() {
  ...

  enemies = game.add.group();
  enemies.enableBody = true;
  enemies.physicsBodyType = Phaser.Physics.ARCADE;

  var enemyWidth = 64, enemyHeight = 33, enemyDelta = 9;
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
      var x = (i * enemyWidth) + (i * enemyDelta);
      var y = (j * enemyHeight) + (j * enemyDelta);
      var e = enemies.create(x, y, 'enemy');
    }
  }
  
  ...
}

...

```

---