namespace SpriteKind {
    export const Boss = SpriteKind.create()
    export const Camera = SpriteKind.create()
    export const Powerup = SpriteKind.create()
}
function SpawnSomething (num: number) {
    let Powerimage: number[] = []
    if (num < Powerimage.length) {
        for (let index = 0; index < num; index++) {
            SpawnLocation = tiles.getTilesByType(assets.tile`transparency16`)
        }
    } else if (num < Powerimage.length) {
    	
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    Taxicol.vy = -50
    Taxicol.x = 50
})
function Failed_slime () {
    let Boss_location: Image[] = []
    Bossspawn = Boss_location.shift()
    Theboss = sprites.create(img`
        4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 
        `, SpriteKind.Boss)
    tiles.placeOnRandomTile(Theboss, Bossspawn)
    animation.runImageAnimation(
    Theboss,
    assets.animation`myAnim1`,
    150,
    true
    )
    Theboss.lifespan = 4000
    Boss_location.push(Bossspawn)
    finalattack += 2000
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
        tiles.placeOnTile(Taxicol, tiles.getTileLocation(2, 2))
        Slime = tiles.getTilesByType(assets.tile`myTile5`)
        fireindex = 0
        finalattack = game.runtime()
        Enemy_health.setColor(4, 15)
        Healthreset()
        Failed_slime()
    } else {
    	
    }
}
function Healthreset () {
    Enemy_health.max = Bossheakth
    Enemy_health.value = Bossheakth
}
let bossattack = false
let BLueet: Sprite = null
let Lastfiretime = 0
let Turningleft = false
let fireindex = 0
let Slime: tiles.Location[] = []
let Bosshealthnearend = 0
let bossfiretime = 0
let Bossmovement = 0
let Timebetweenprojectiles = 0
let Bossheakth = 0
let bossspeed = 0
let sidescroller = 0
let Cameratarget: Sprite = null
let finalattack = 0
let Theboss: Sprite = null
let Bossspawn: Image = null
let SpawnLocation: tiles.Location[] = []
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
game.onUpdate(function () {
    if (Taxicol.vx < 0) {
        Turningleft = true
    } else if (Taxicol.vx > 0) {
        Turningleft = false
    }
    if (game.runtime() > Lastfiretime + Pause_before_shooting) {
        if (controller.B.isPressed()) {
            if (controller.up.isPressed()) {
                BLueet = sprites.createProjectileFromSprite(assets.image`TaxicolProjectile`, Taxicol, 0, 0 - Projectile_speed)
            } else if (Turningleft) {
                BLueet = sprites.createProjectileFromSprite(assets.image`TaxicolProjectile`, Taxicol, 0 - Projectile_speed, 0)
            } else {
                BLueet = sprites.createProjectileFromSprite(assets.image`TaxicolProjectile`, Taxicol, Projectile_speed, 0)
            }
            BLueet.vx += Taxicol.vx
            Lastfiretime = 0
        }
    }
})
game.onUpdate(function () {
	
})
forever(function () {
    if (Currentboss == 0) {
        if (Theboss.isHittingTile(CollisionDirection.Bottom) || Theboss.isHittingTile(CollisionDirection.Top)) {
            bossattack = true
            pause(Bossmovement)
            bossattack = true
            if (Theboss.isHittingTile(CollisionDirection.Bottom)) {
                Theboss.vy = 0 - bossspeed
            } else {
                Theboss.vy = bossspeed
            }
            pause(100)
        }
    }
})
