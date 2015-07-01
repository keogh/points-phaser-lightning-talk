# Speed the Madafacas!

``` javascript
...

var enemiesTotal = 0;

...

function create() {
  ...

  enemies = this.game.add.group();
  ...
  enemiesTotal = enemies.countLiving();
  
  ...
}

function update() {
  ...

  var currentEnemiesTotal = enemies.countLiving();
  if (currentEnemiesTotal <= 0) {
    // End Level
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
```

---