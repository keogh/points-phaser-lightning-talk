# Did you kill them all?

``` javascript
...

var playState = function (game) {}
playState.prototype = (function () {
  ...

  function update() {
    ...

    var currentEnemiesTotal = enemies.countLiving();
    if (currentEnemiesTotal <= 0) {
*     this.game.state.start('play', true, true);
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

  ...
})();

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'falling-invaders');

game.state.add('splash', splashState)
game.state.add('play', playState);
game.state.start('splash');
```

---