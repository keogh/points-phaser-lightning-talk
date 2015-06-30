# Pause

``` javascript
...

var pauseKey;

...

function create() {
  ...

  pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
  pauseKey.onDown.add(togglePause, this);
}

...

function togglePause() {
  game.physics.arcade.isPaused = !game.physics.arcade.isPaused;
}
```

---