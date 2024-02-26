namespace SpriteKind {
    export const Boss = SpriteKind.create()
    export const Camera = SpriteKind.create()
}
function Cameramovement () {
    Cameratarget = sprites.create(assets.image`myImage7`, SpriteKind.Camera)
    Cameratarget.setFlag(SpriteFlag.Ghost, true)
    Cameratarget.setFlag(SpriteFlag.Invisible, true)
    Cameratarget.setVelocity(sidescroller, 0)
    scene.cameraFollowSprite(Cameratarget)
}
function Bosscreate (Current: number) {
    if (Current == 0) {
        bossspeed = 50
        Bossheakth = 100
        Timebetweenprojectiles = 100
        Bossmovement = 2000
        Theboss = sprites.create(assets.image`myImage5`, SpriteKind.Boss)
        Theboss.setPosition(145, 48)
        Theboss.setVelocity(0, 50)
        Healthreset()
    } else if (Current == 1) {
        if (Bossheakth == 0) {
            Bossheakth = 100
            Healthreset()
        }
        sidescroller = 20
        Theboss = sprites.create(img`
            2 2 2 2 2 
            2 2 2 2 2 
            2 2 2 2 2 
            2 2 2 2 2 
            2 2 2 2 2 
            `, SpriteKind.Boss)
        Theboss.setFlag(SpriteFlag.GhostThroughWalls, true)
        Theboss.setPosition(12, 59)
        bossfiretime = game.runtime()
        animation.runImageAnimation(
        Theboss,
        assets.animation`myAnim0`,
        150,
        false
        )
        Enemy_health.setColor(6, 8)
        Cameramovement()
    } else if (Current == 2) {
        Bossheakth = 50
        Bosshealthnearend = Bossheakth / 3
        tiles.setCurrentTilemap(tilemap`level0`)
        tiles.placeOnTile(Taxicol, tiles.getTileLocation(2, 0))
    } else {
    	
    }
}
function Healthreset () {
    Enemy_health.max = Bossheakth
    Enemy_health.value = Bossheakth
}
let Bosshealthnearend = 0
let bossfiretime = 0
let Theboss: Sprite = null
let Bossmovement = 0
let Timebetweenprojectiles = 0
let Bossheakth = 0
let bossspeed = 0
let sidescroller = 0
let Cameratarget: Sprite = null
let Currentboss = 0
let Enemy_health: StatusBarSprite = null
let Taxicol: Sprite = null
tiles.setCurrentTilemap(tilemap`level`)
let Gracity = 300
let Jump_height = 34
let Player_speed = 100
let Projectile_speed = 150
let Pause_before_shooting = 100
let Jump_speed = 0 - Math.sqrt(2 * (Gracity * Jump_height))
Taxicol = sprites.create(assets.image`myImage0`, SpriteKind.Player)
Taxicol.ay = Gracity
controller.moveSprite(Taxicol, Player_speed, 100)
info.setLife(18)
let boss = 0
Enemy_health = statusbars.create(100, 11, StatusBarKind.Health)
Enemy_health.setColor(12, 1)
Enemy_health.setBarBorder(1, 4)
Enemy_health.right = 100
Enemy_health.top = 0
Enemy_health.setFlag(SpriteFlag.RelativeToCamera, true)
Bosscreate(Currentboss)
