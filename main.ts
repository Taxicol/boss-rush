controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    BLueet = sprites.create(assets.image`TaxicolProjectile`, SpriteKind.Projectile)
    BLueet.setVelocity(50, 0)
})
let BLueet: Sprite = null
tiles.setCurrentTilemap(tilemap`level`)
let Gracity = 300
let Jump_height = 34
let Player_speed = 100
let Projectile_speed = 150
let Pause_before_shooting = 100
let Jump_speed = 0 - Math.sqrt(2 * (Gracity * Jump_height))
let Taxicol = sprites.create(assets.image`myImage0`, SpriteKind.Player)
scene.cameraFollowSprite(Taxicol)
Taxicol.ay = Gracity
controller.moveSprite(Taxicol, Player_speed, 100)
info.setLife(18)
let boss = 0
let Enemy_health = statusbars.create(100, 11, StatusBarKind.Health)
Enemy_health.setColor(12, 1)
Enemy_health.setBarBorder(1, 4)
Enemy_health.right = 100
Enemy_health.top = 0
