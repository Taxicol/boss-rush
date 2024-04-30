namespace SpriteKind {
    export const Boss = SpriteKind.create()
    export const Camera = SpriteKind.create()
    export const Powerup = SpriteKind.create()
    export const bossprojectile = SpriteKind.create()
    export const Rocket = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile1`, function (sprite, location) {
    Clearmap()
    Bosscreate(Currentboss)
    tiles.placeOnTile(Taxicol, tiles.getTileLocation(7, 4))
})
function SpawnSomething (num: number) {
	
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Taxicol.isHittingTile(CollisionDirection.Bottom)) {
        Taxicol.vy = Jump_speed
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(Taxicol, effects.disintegrate, 10)
    Bossheakth += -1
    if (Bossheakth == 0) {
        game.gameOver(true)
    }
})
sprites.onDestroyed(SpriteKind.Boss, function (sprite) {
    Failed_slime()
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
sprites.onOverlap(SpriteKind.bossprojectile, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.disintegrate, 10)
    info.changeLifeBy(-1)
})
function Bosscreate (Current: number) {
    if (Current == 0) {
        Bossheakth = 100
        bossspeed = 50
        Timebetweenprojectiles = 100
        Bossmovement = 2000
        bbgun = sprites.create(assets.image`myImage5`, SpriteKind.Boss)
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
    }
}
function Healthreset () {
    Enemy_health.max = Bossheakth
    Enemy_health.value = Bossheakth
}
function Clearmap () {
    sprites.destroy(Theboss)
    for (let value of sprites.allOfKind(SpriteKind.bossprojectile)) {
        sprites.destroy(value)
    }
    for (let value2 of sprites.allOfKind(SpriteKind.Projectile)) {
        sprites.destroy(value2)
    }
    for (let value3 of sprites.allOfKind(SpriteKind.Camera)) {
        sprites.destroy(value3)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss, function (sprite, otherSprite) {
    if (Currentboss == 1) {
        if (game.runtime() > bossfiretime + 1000) {
            let cameraspeed = 0
            info.changeLifeBy(-1)
            Cameratarget.vx = cameraspeed / 4
            scene.cameraShake(4, 500)
            pause(1000)
            Cameratarget.vx = cameraspeed
        }
    } else {
        info.changeLifeBy(-1)
        pause(500)
    }
})
let projectile2: Sprite = null
let Fireangle = 0
let bossattack = false
let BLueet: Sprite = null
let Lastfiretime = 0
let Turningleft = false
let projectile: Sprite = null
let fireindex = 0
let Slime: tiles.Location[] = []
let Bosshealthnearend = 0
let bossfiretime = 0
let bbgun: Sprite = null
let Bossmovement = 0
let Timebetweenprojectiles = 0
let bossspeed = 0
let sidescroller = 0
let Cameratarget: Sprite = null
let finalattack = 0
let Theboss: Sprite = null
let Bossspawn: Image = null
let Bossheakth = 0
let Currentboss = 0
let Enemy_health: StatusBarSprite = null
let Taxicol: Sprite = null
let Jump_speed = 0
let boss = 0
tiles.setCurrentTilemap(tilemap`level`)
let Gracity = 300
let Jump_height = 34
let Player_speed = 100
let Projectile_speed = 150
let Pause_before_shooting = 100
Jump_speed = 0 - Math.sqrt(2 * (Gracity * Jump_height))
Taxicol = sprites.create(assets.image`myImage0`, SpriteKind.Player)
Taxicol.ay = Gracity
controller.moveSprite(Taxicol, Player_speed, 100)
info.setLife(18)
Enemy_health = statusbars.create(100, 11, StatusBarKind.Health)
Enemy_health.setColor(12, 1)
Enemy_health.setBarBorder(1, 4)
Enemy_health.right = 160
Enemy_health.top = 0
Enemy_health.setFlag(SpriteFlag.RelativeToCamera, true)
Bosscreate(Currentboss)
game.onUpdate(function () {
    if (Bossheakth) {
        projectile = sprites.createProjectileFromSprite(img`
            1 1 1 1 1 
            1 1 1 1 1 
            1 1 1 1 1 
            1 1 1 1 1 
            1 1 1 1 1 
            `, Theboss, 0 - Projectile_speed, 0)
        projectile.setKind(SpriteKind.bossprojectile)
        projectile.x += randint(-15, 14)
    }
})
game.onUpdate(function () {
    if (Taxicol.vx < 0) {
        Turningleft = true
    } else if (Taxicol.vx > 0) {
        Turningleft = false
    }
    if (controller.B.isPressed()) {
        if (game.runtime() > Lastfiretime + Pause_before_shooting) {
            if (controller.up.isPressed()) {
                BLueet = sprites.createProjectileFromSprite(assets.image`TaxicolProjectile`, Taxicol, 0, 0 - Projectile_speed)
            } else if (Turningleft) {
                BLueet = sprites.createProjectileFromSprite(assets.image`TaxicolProjectile`, Taxicol, 0 - Projectile_speed, 0)
            } else {
                BLueet = sprites.createProjectileFromSprite(assets.image`TaxicolProjectile`, Taxicol, Projectile_speed, 0)
            }
            BLueet.vx += Taxicol.vx
            Lastfiretime = game.runtime()
        }
    }
})
game.onUpdate(function () {
    if (Currentboss == 0) {
        if (bossattack) {
            if (game.runtime() > bossfiretime + Timebetweenprojectiles) {
                projectile = sprites.createProjectileFromSprite(img`
                    1 1 1 1 1 
                    1 1 1 1 1 
                    1 1 1 1 1 
                    1 1 1 1 1 
                    1 1 1 1 1 
                    `, Theboss, -75, 0)
                projectile.setKind(SpriteKind.bossprojectile)
                projectile.y += randint(-16, 10)
                bossfiretime = game.runtime()
            }
        }
    } else if (Currentboss == 1) {
        Theboss.left = scene.cameraProperty(CameraProperty.Left) + 12
        Theboss.y = Math.map(Math.sin(game.runtime() / 1000), -1, 1, 32, scene.screenHeight() - 32)
    } else if (Currentboss == 2) {
        if (game.runtime() > bossfiretime + Timebetweenprojectiles) {
            animation.stopAnimation(animation.AnimationTypes.All, Theboss)
            Theboss.setImage(assets.image`Failedslimegame`)
            if (Bossheakth > Bosshealthnearend) {
                Fireangle = 0.7854 / 2 * fireindex
                projectile = sprites.createProjectileFromSprite(img`
                    4 4 4 4 4 
                    4 4 4 4 4 
                    4 4 4 4 4 
                    4 4 4 4 4 
                    4 4 4 4 4 
                    `, Theboss, Math.cos(Fireangle) * Projectile_speed, Math.sin(Fireangle) * Projectile_speed)
                fireindex += 1
                projectile.setKind(SpriteKind.bossprojectile)
            } else {
                for (let index = 0; index <= 7; index++) {
                    Fireangle = 0.7854 * index
                    projectile = sprites.createProjectileFromSprite(img`
                        4 4 4 4 4 
                        4 4 4 4 4 
                        4 4 4 4 4 
                        4 4 4 4 4 
                        4 4 4 4 4 
                        `, Theboss, Math.cos(Fireangle) * Projectile_speed, Math.sin(Fireangle) * Projectile_speed)
                    projectile.setKind(SpriteKind.bossprojectile)
                }
            }
            bossfiretime = game.runtime()
        }
    } else {
    	
    }
})
game.onUpdate(function () {
    if (Currentboss == 1) {
        if (Taxicol.right + 16 < scene.cameraProperty(CameraProperty.Left)) {
            Clearmap()
            Bosscreate(Currentboss)
            tiles.placeOnTile(Taxicol, tiles.getTileLocation(7, 4))
        }
    }
})
forever(function () {
    if (Currentboss == 0) {
        if (Theboss.isHittingTile(CollisionDirection.Bottom) || Theboss.isHittingTile(CollisionDirection.Top)) {
            bossattack = true
            pause(Bossmovement)
            bossattack = false
            if (Theboss.isHittingTile(CollisionDirection.Bottom)) {
                Theboss.vy = 0 - bossspeed
            } else {
                Theboss.vy = bossspeed
            }
            pause(100)
        }
    }
})
game.onUpdateInterval(3000, function () {
    if (Currentboss == 1) {
        projectile2 = sprites.createProjectileFromSprite(assets.image`myImage6`, Theboss, 10, 0)
        projectile2.setKind(SpriteKind.bossprojectile)
        projectile2.follow(Taxicol, 15)
        sprites.setDataNumber(projectile2, "health", 12)
    }
})
