# Game Over

``` javascript
...
playState.prototype = (function () {
  ...

  function update() {
    ...
*   var that = this;
    enemies.forEachAlive(function (enemy) {
      if (enemy.y + enemy.height > player.y) {
        that.game.state.start('gameover');
        return false;
      }
      ...
    }, this);

    ...
  }

  ...
})();

var gameOverState = function (game){}
gameOverState.prototype = (function () {
  function create() {
    var style = { font: "35px arial", fill: "#FFFFFF", align: "center" };
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
*game.state.add('gameover', gameOverState);
game.state.start('splash');
```

---