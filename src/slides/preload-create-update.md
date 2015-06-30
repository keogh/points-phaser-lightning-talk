# Preload, Create, Update

``` javascript
var game = new Phaser.Game(
  800, 
  600, 
  Phaser.CANVAS, 
  'falling-invaders', 
  {
    preload: preload, 
    create: create, 
    update: update
  });

function preload() {
  // Load assets
}

function create() {
  // Initialize game
}

function update() {
  // Collitions, movements, game logic
}
```

---