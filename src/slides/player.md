# The Player

``` javascript
function preload() {
  game.load.image('player', '../assets/player.png');
}

function create() {
  game.stage.backgroundColor = "#000000";
  player = game.add.sprite(350, 520, 'player');
}

function update() {
  // Collitions, movements, game logic
}
```

---