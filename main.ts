tiles.setCurrentTilemap(tilemap`level`)
let Gracity = 300
let Jump_height = 34
let Player_speed = 100
let Projectile_speed = 150
let Pause_before_shooting = 100
let Jump_speed = 0 - Math.sqrt(2 * (Gracity * Jump_height))
let Taxicol = sprites.create(assets.image`myImage0`, SpriteKind.Player)
Taxicol.ay = Gracity
controller.moveSprite(Taxicol, Player_speed, 100)
info.setLife(18)
