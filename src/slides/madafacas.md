# Kill the Madafacas!

``` javascript
...

function update() {
  game.physics.arcade.overlap(bullets, enemies, collisionHandler, null, this);

  ...
}

...

function collisionHandler(bullet, enemy) {
  bullet.kill();
  enemy.kill();
}
```

---