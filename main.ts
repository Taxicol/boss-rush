namespace SpriteKind {
    export const Boss = SpriteKind.create()
    export const BossProjectile = SpriteKind.create()
    export const Camera = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    clearStage()
    createBoss(currentBoss)
    tiles.placeOnTile(Taxicol, tiles.getTileLocation(7, 4))
})
function createBoss (current: number) {
    if (current == 0) {
        bossSpeed = 50
        bossHealth = 100
        timeBetweenBossFire = 100
        timeBetweenBossMove = 2000
        Theboss = sprites.create(assets.image`myImage`, SpriteKind.Boss)
        Theboss.setPosition(145, 58)
        Theboss.setVelocity(0, 50)
        resetHealth()
    } else if (current == 1) {
        if (bossHealth == 0) {
            bossHealth = 100
            resetHealth()
        }
        cameraSpeed = 20
        Theboss = sprites.create(img`
            2 2 2 2 2 
            2 2 2 2 2 
            2 2 2 2 2 
            2 2 2 2 2 
            2 2 2 2 2 
            `, SpriteKind.Boss)
        Theboss.setFlag(SpriteFlag.GhostThroughWalls, true)
        Theboss.setPosition(12, 59)
        lastBossFireTime = game.runtime()
        animation.runImageAnimation(
        Theboss,
        assets.animation`myAnim`,
        200,
        false
        )
        Enemy_Health.setColor(6, 1)
        initialize_camera()
    } else if (current == 2) {
        bossHealth = 50
        bossHealthThreshold = bossHealth / 3
        tiles.setTilemap(tilemap`level0`)
        tiles.placeOnTile(Taxicol, tiles.getTileLocation(2, 2))
        bossLocations = tiles.getTilesByType(assets.tile`myTile5`)
        currentFireIndex = 0
        lastBossFireTime = game.runtime()
        Enemy_Health.setColor(4, 1)
        resetHealth()
        Failed_slime()
    }
}
function clearStage () {
    Theboss.destroy()
    for (let value of sprites.allOfKind(SpriteKind.BossProjectile)) {
        value.destroy()
    }
    for (let value2 of sprites.allOfKind(SpriteKind.Projectile)) {
        value2.destroy()
    }
    for (let value22 of sprites.allOfKind(SpriteKind.Camera)) {
        value22.destroy()
    }
}
function resetHealth () {
    Enemy_Health.max = bossHealth
    Enemy_Health.value = bossHealth
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Taxicol.isHittingTile(CollisionDirection.Bottom)) {
        Taxicol.vy = jumpVelocity
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Boss, function (sprite, otherSprite) {
    sprite.destroy(effects.disintegrate, 10)
    bossHealth += -1
    Enemy_Health.value += -1
    if (bossHealth == 50 && currentBoss == 0) {
        timeBetweenBossMove = 1000
        bossSpeed = 100
    } else if (bossHealth == 0) {
        currentBoss += 1
        sprites.destroy(otherSprite)
        createBoss(currentBoss)
    }
    if (currentBoss == 2 && bossHealth <= 1) {
        game.gameOver(true)
    }
})
sprites.onDestroyed(SpriteKind.Boss, function (sprite) {
    if (currentBoss == 2 && bossHealth > 0) {
        Failed_slime()
    }
})
function Pleasemakesomething (num: number) {
    if (num < Foodlist.length) {
        for (let index = 0; index < num; index++) {
            let list: Image[] = []
            FoodLocation = tiles.getTilesByType(assets.tile`myTile16`)
            powerup = sprites.create(list._pickRandom(), SpriteKind.Food)
            tiles.placeOnRandomTile(powerup, assets.tile`myTile16`)
        }
    }
}
sprites.onOverlap(SpriteKind.BossProjectile, SpriteKind.Player, function (sprite, otherSprite) {
    sprite.destroy(effects.disintegrate, 10)
    info.changeLifeBy(-1)
})
function initialize_camera () {
    camera_target = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Camera)
    camera_target.setFlag(SpriteFlag.Ghost, true)
    camera_target.setFlag(SpriteFlag.Invisible, true)
    camera_target.setVelocity(cameraSpeed, 0)
    scene.cameraFollowSprite(camera_target)
}
function Failed_slime () {
    bossSpawn = bossLocations.shift()
    Theboss = sprites.create(img`
        5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 
        `, SpriteKind.Boss)
    tiles.placeOnTile(Theboss, bossSpawn)
    animation.runImageAnimation(
    Theboss,
    assets.animation`myAnim1`,
    150,
    true
    )
    Theboss.lifespan = 4000
    bossLocations.push(bossSpawn)
    lastBossFireTime += 2000
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeLifeBy(1)
    pause(5000)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.BossProjectile, function (sprite, otherSprite) {
    if (currentBoss == 1) {
        sprite.destroy(effects.disintegrate, 10)
        sprites.changeDataNumberBy(otherSprite, "health", -1)
        if (sprites.readDataNumber(otherSprite, "health") == 8) {
            otherSprite.image.replace(15, 4)
        } else if (sprites.readDataNumber(otherSprite, "health") == 4) {
            otherSprite.image.replace(4, 2)
        } else if (sprites.readDataNumber(otherSprite, "health") == 0) {
            otherSprite.destroy()
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss, function (sprite, otherSprite) {
    if (currentBoss == 1) {
        if (game.runtime() > lastBossFireTime + 1000) {
            info.changeLifeBy(-1)
            camera_target.vx = cameraSpeed / 4
            scene.cameraShake(4, 500)
            pause(1000)
            camera_target.vx = cameraSpeed
        }
    } else {
        info.changeLifeBy(-1)
        pause(500)
    }
})
let projectile2: Sprite = null
let fireAngle = 0
let isBossAttacking = false
let projectile: Sprite = null
let lastFireTime = 0
let isFacingLeft = false
let bossSpawn: tiles.Location = null
let camera_target: Sprite = null
let powerup: Sprite = null
let FoodLocation: tiles.Location[] = []
let currentFireIndex = 0
let bossLocations: tiles.Location[] = []
let bossHealthThreshold = 0
let lastBossFireTime = 0
let cameraSpeed = 0
let Theboss: Sprite = null
let timeBetweenBossMove = 0
let timeBetweenBossFire = 0
let bossHealth = 0
let bossSpeed = 0
let Foodlist: Sprite[] = []
let Enemy_Health: StatusBarSprite = null
let currentBoss = 0
let Taxicol: Sprite = null
let jumpVelocity = 0
tiles.setTilemap(tilemap`level`)
let gravity = 300
let jumpHeight = 34
let playerSpeed = 100
let projectilespeed = 150
let timeBetweenFire = 100
jumpVelocity = 0 - Math.sqrt(2 * (gravity * jumpHeight))
Taxicol = sprites.create(assets.image`myImage1`, SpriteKind.Player)
Taxicol.ay = gravity
controller.moveSprite(Taxicol, playerSpeed, 0)
info.setLife(1000)
currentBoss = 0
Enemy_Health = statusbars.create(100, 11, StatusBarKind.Health)
Enemy_Health.setColor(15, 1)
Enemy_Health.setBarBorder(1, 4)
Enemy_Health.right = 160
Enemy_Health.top = 0
Enemy_Health.setFlag(SpriteFlag.RelativeToCamera, true)
Foodlist = [
sprites.create(assets.image`myImage12`, SpriteKind.Food),
sprites.create(assets.image`myImage11`, SpriteKind.Food),
sprites.create(assets.image`myImage10`, SpriteKind.Food),
sprites.create(img`
    . . . . . . . e e e e . . . . . 
    . . . . . e e 4 5 5 5 e e . . . 
    . . . . e 4 5 6 2 2 7 6 6 e . . 
    . . . e 5 6 6 7 2 2 6 4 4 4 e . 
    . . e 5 2 2 7 6 6 4 5 5 5 5 4 . 
    . e 5 6 2 2 8 8 5 5 5 5 5 4 5 4 
    . e 5 6 7 7 8 5 4 5 4 5 5 5 5 4 
    e 4 5 8 6 6 5 5 5 5 5 5 4 5 5 4 
    e 5 c e 8 5 5 5 4 5 5 5 5 5 5 4 
    e 5 c c e 5 4 5 5 5 4 5 5 5 e . 
    e 5 c c 5 5 5 5 5 5 5 5 4 e . . 
    e 5 e c 5 4 5 4 5 5 5 e e . . . 
    e 5 e e 5 5 5 5 5 4 e . . . . . 
    4 5 4 e 5 5 5 5 e e . . . . . . 
    . 4 5 4 5 5 4 e . . . . . . . . 
    . . 4 4 e e e . . . . . . . . . 
    `, SpriteKind.Food)
]
createBoss(currentBoss)
Pleasemakesomething(0)
game.onUpdate(function () {
    if (Taxicol.vx < 0) {
        isFacingLeft = true
    } else if (Taxicol.vx > 0) {
        isFacingLeft = false
    }
    if (controller.B.isPressed()) {
        if (game.runtime() > lastFireTime + timeBetweenFire) {
            if (controller.up.isPressed()) {
                projectile = sprites.createProjectileFromSprite(assets.image`TaxicolProjectile`, Taxicol, 0, 0 - projectilespeed)
            } else if (isFacingLeft) {
                projectile = sprites.createProjectileFromSprite(assets.image`TaxicolProjectile`, Taxicol, 0 - projectilespeed, 0)
            } else {
                projectile = sprites.createProjectileFromSprite(assets.image`TaxicolProjectile`, Taxicol, projectilespeed, 0)
            }
            projectile.vx += Taxicol.vx
            lastFireTime = game.runtime()
        }
    }
})
game.onUpdate(function () {
    if (currentBoss == 1) {
        if (Taxicol.right + 16 < scene.cameraLeft()) {
            clearStage()
            createBoss(currentBoss)
            tiles.placeOnTile(Taxicol, tiles.getTileLocation(7, 4))
        }
    }
})
game.onUpdate(function () {
    if (currentBoss == 0) {
        if (isBossAttacking) {
            if (game.runtime() > lastBossFireTime + timeBetweenBossFire) {
                projectile = sprites.createProjectileFromSprite(img`
                    1 1 1 1 1 
                    1 1 1 1 1 
                    1 1 1 1 1 
                    1 1 1 1 1 
                    1 1 1 1 1 
                    `, Theboss, -75, 0)
                projectile.setKind(SpriteKind.BossProjectile)
                projectile.y += Math.randomRange(-16, 16)
                lastBossFireTime = game.runtime()
            }
        }
    } else if (currentBoss == 1) {
        Theboss.left = scene.cameraLeft() + 12
        Theboss.y = Math.map(Math.sin(game.runtime() / 1000), -1, 1, 32, scene.screenHeight() - 32)
    } else if (currentBoss == 2) {
        if (game.runtime() > lastBossFireTime + timeBetweenBossFire) {
            animation.stopAnimation(animation.AnimationTypes.All, Theboss)
            Theboss.setImage(assets.image`Failedslimegame`)
            if (bossHealth > bossHealthThreshold) {
                fireAngle = 0.7854 / 2 * currentFireIndex
                projectile = sprites.createProjectileFromSprite(img`
                    4 4 4 4 4 
                    4 4 4 4 4 
                    4 4 4 4 4 
                    4 4 4 4 4 
                    4 4 4 4 4 
                    `, Theboss, Math.cos(fireAngle) * projectilespeed, Math.sin(fireAngle) * projectilespeed)
                currentFireIndex += 1
                projectile.setKind(SpriteKind.BossProjectile)
            } else {
                for (let index = 0; index <= 7; index++) {
                    fireAngle = 0.7854 * index
                    projectile = sprites.createProjectileFromSprite(img`
                        4 4 4 4 4 
                        4 4 4 4 4 
                        4 4 4 4 4 
                        4 4 4 4 4 
                        4 4 4 4 4 
                        `, Theboss, Math.cos(fireAngle) * projectilespeed, Math.sin(fireAngle) * projectilespeed)
                    projectile.setKind(SpriteKind.BossProjectile)
                }
            }
            lastBossFireTime = game.runtime()
        }
    }
})
forever(function () {
    if (currentBoss == 0) {
        if (Theboss.isHittingTile(CollisionDirection.Bottom) || Theboss.isHittingTile(CollisionDirection.Top)) {
            isBossAttacking = true
            pause(timeBetweenBossMove)
            isBossAttacking = false
            if (Theboss.isHittingTile(CollisionDirection.Bottom)) {
                Theboss.vy = 0 - bossSpeed
            } else {
                Theboss.vy = bossSpeed
            }
            pause(100)
        }
    }
})
game.onUpdateInterval(3000, function () {
    if (currentBoss == 1) {
        projectile2 = sprites.createProjectileFromSprite(assets.image`myImage6`, Theboss, 10, 0)
        projectile2.setKind(SpriteKind.BossProjectile)
        projectile2.follow(Taxicol, 35)
        sprites.setDataNumber(projectile2, "health", 12)
    }
})
