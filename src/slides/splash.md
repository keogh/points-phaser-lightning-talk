# Splash Screen

``` javascript
var splashState = function (game){}
splashState.prototype = (function () {
  function create() {
    var style = { font: "35px arial", fill: "#00ff00", align: "center" };
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
  ...

  function preload() {
*   this.game.load.image('player', '../assets/player.png');
    ...
  }

  function create() {
    ...

*   this.game.physics.enable(player, Phaser.Physics.ARCADE);

    ...
  }

  function update() {
    ...
  }

  ...

  return {
    preload: preload,
    create: create,
    update: update
  };
})();

var game = new Phaser.Game(
  800, 
  600, 
  Phaser.CANVAS, 
  'falling-invaders');

game.state.add('splash', splashState)
game.state.add('play', playState);
game.state.start('splash');
```

---