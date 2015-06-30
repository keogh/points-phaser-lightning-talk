# Falling From the Skies

``` javascript
...

var downTime = 0;
var direction;

...

function create() {
  direction = 1;
  ...

  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
      var x = (i * enemyWidth) + (i * enemyDelta);
      var y = (j * enemyHeight) + (j * enemyDelta);
      var e = enemies.create(x, y, 'enemy');
*      e.body.velocity.x = 100;
    }
  }
  
  ...
}

function update() {
  ...

  if (downTime > 0 && game.time.now > downTime) {
    enemies.setAll('body.velocity.y', 0, true);
    downTime = 0;
  }

  enemies.forEachAlive(function (enemy) {
    if (direction == 1 && enemy.x > game.width - enemy.width
     || direction == -1 && enemy.x < 0) {
      changePath(enemy.body.velocity.x);
      enemies.setAll('body.velocity.y', 80, true);
      downTime = game.time.now + 150;
      return false; 
    }
  }, this);
}

...

function changePath(initialVelocity) {
  enemies.setAll('body.velocity.x', initialVelocity * - 1, true);
  direction = direction * -1;
}
```

---