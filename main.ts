namespace SpriteKind {
    export const Boss = SpriteKind.create()
    export const BossProjectile = SpriteKind.create()
    export const Camera = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    clearStage()
    createBoss(currentBoss)
    tiles.placeOnTile(thePlayer, tiles.getTileLocation(7, 4))
})
function createBoss (current: number) {
    if (current == 0) {
        bossSpeed = 50
        bossHealth = 100
        timeBetweenBossFire = 100
        timeBetweenBossMove = 2000
        theBoss = sprites.create(assets.image`myImage`, SpriteKind.Boss)
        theBoss.setPosition(145, 58)
        theBoss.setVelocity(0, 50)
        resetHealth()
    } else if (current == 1) {
        if (bossHealth == 0) {
            bossHealth = 100
            resetHealth()
        }
        cameraSpeed = 20
        theBoss = sprites.create(img`
            2 2 2 2 2 
            2 2 2 2 2 
            2 2 2 2 2 
            2 2 2 2 2 
            2 2 2 2 2 
            `, SpriteKind.Boss)
        theBoss.setFlag(SpriteFlag.GhostThroughWalls, true)
        theBoss.setPosition(12, 59)
        lastBossFireTime = game.runtime()
        animation.runImageAnimation(
        theBoss,
        assets.animation`myAnim`,
        200,
        false
        )
        statusbar.setColor(6, 1)
        initialize_camera()
    } else if (current == 2) {
        bossHealth = 50
        bossHealthThreshold = bossHealth / 3
        tiles.setTilemap(tilemap`level6`)
        tiles.placeOnTile(thePlayer, tiles.getTileLocation(2, 2))
        bossLocations = tiles.getTilesByType(assets.tile`myTile1`)
        currentFireIndex = 0
        lastBossFireTime = game.runtime()
        statusbar.setColor(4, 1)
        resetHealth()
        initialize_chase()
    } else if (current == 3) {
        bossHealth = 100
        darylHorizontalSpeed = 60
        tiles.setTilemap(tilemap`level7`)
        theBoss = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Boss)
        theBoss.ay = gravity
        theBoss.right = 155
        statusbar.setColor(8, 1)
        resetHealth()
    } else {
    	
    }
}
function initialize_chase () {
    bossSpawn = bossLocations.shift()
    theBoss = sprites.create(img`
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
    tiles.placeOnTile(theBoss, bossSpawn)
    animation.runImageAnimation(
    theBoss,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    150,
    true
    )
    theBoss.lifespan = 4000
    bossLocations.push(bossSpawn)
    lastBossFireTime += 2000
}
function clearStage () {
    theBoss.destroy()
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
    statusbar.max = bossHealth
    statusbar.value = bossHealth
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (thePlayer.isHittingTile(CollisionDirection.Bottom)) {
        thePlayer.vy = jumpVelocity
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Boss, function (sprite, otherSprite) {
    sprite.destroy(effects.disintegrate, 10)
    bossHealth += -1
    statusbar.value += -1
    if (bossHealth == 0) {
        currentBoss += 1
    } else if (bossHealth == 50 && currentBoss == 0) {
        timeBetweenBossMove = 1000
        bossSpeed = 100
    }
})
sprites.onDestroyed(SpriteKind.Boss, function (sprite) {
    if (currentBoss == 2 && bossHealth > 0) {
        initialize_chase()
    }
})
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
        . . . . . . . 3 3 . . . . . . . 
        . . . . . . . 3 3 . . . . . . . 
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
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.BossProjectile, function (sprite, otherSprite) {
    if (currentBoss == 1) {
        sprite.destroy(effects.disintegrate, 10)
        sprites.changeDataNumberBy(otherSprite, "health", -1)
        if (sprites.readDataNumber(otherSprite, "health") == 8) {
            otherSprite.image.replace(5, 4)
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
let camera_target: Sprite = null
let bossSpawn: tiles.Location = null
let darylHorizontalSpeed = 0
let currentFireIndex = 0
let bossLocations: tiles.Location[] = []
let bossHealthThreshold = 0
let lastBossFireTime = 0
let cameraSpeed = 0
let theBoss: Sprite = null
let timeBetweenBossMove = 0
let timeBetweenBossFire = 0
let bossHealth = 0
let bossSpeed = 0
let statusbar: StatusBarSprite = null
let currentBoss = 0
let thePlayer: Sprite = null
let jumpVelocity = 0
let gravity = 0
tiles.setTilemap(tilemap`level`)
gravity = 300
let jumpHeight = 34
let playerSpeed = 100
let projectileVelocity = 150
let timeBetweenFire = 100
jumpVelocity = 0 - Math.sqrt(2 * (gravity * jumpHeight))
thePlayer = sprites.create(assets.image`myImage1`, SpriteKind.Player)
thePlayer.ay = gravity
controller.moveSprite(thePlayer, playerSpeed, 0)
info.setLife(10)
currentBoss = 0
statusbar = statusbars.create(100, 11, StatusBarKind.Health)
statusbar.setColor(12, 1)
statusbar.setBarBorder(1, 3)
statusbar.right = 160
statusbar.top = 0
statusbar.setFlag(SpriteFlag.RelativeToCamera, true)
createBoss(currentBoss)
game.onUpdate(function () {
    if (thePlayer.vx < 0) {
        isFacingLeft = true
    } else if (thePlayer.vx > 0) {
        isFacingLeft = false
    }
    if (controller.B.isPressed()) {
        if (game.runtime() > lastFireTime + timeBetweenFire) {
            if (controller.up.isPressed()) {
                projectile = sprites.createProjectileFromSprite(assets.image`TaxicolProjectile`, thePlayer, 0, 0 - projectileVelocity)
            } else if (isFacingLeft) {
                projectile = sprites.createProjectileFromSprite(assets.image`TaxicolProjectile`, thePlayer, 0 - projectileVelocity, 0)
            } else {
                projectile = sprites.createProjectileFromSprite(assets.image`TaxicolProjectile`, thePlayer, projectileVelocity, 0)
            }
            projectile.vx += thePlayer.vx
            lastFireTime = game.runtime()
        }
    }
})
game.onUpdate(function () {
    if (currentBoss == 1) {
        if (thePlayer.right + 16 < scene.cameraLeft()) {
            clearStage()
            createBoss(currentBoss)
            tiles.placeOnTile(thePlayer, tiles.getTileLocation(7, 4))
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
                    `, theBoss, -75, 0)
                projectile.setKind(SpriteKind.BossProjectile)
                projectile.y += Math.randomRange(-16, 16)
                lastBossFireTime = game.runtime()
            }
        }
    } else if (currentBoss == 1) {
        theBoss.left = scene.cameraLeft() + 12
        theBoss.y = Math.map(Math.sin(game.runtime() / 1000), -1, 1, 32, scene.screenHeight() - 32)
    } else if (currentBoss == 2) {
        if (game.runtime() > lastBossFireTime + timeBetweenBossFire) {
            animation.stopAnimation(animation.AnimationTypes.All, theBoss)
            theBoss.setImage(assets.image`Failedslimegame`)
            if (bossHealth > bossHealthThreshold) {
                fireAngle = 0.7854 / 2 * currentFireIndex
                projectile = sprites.createProjectileFromSprite(img`
                    4 4 4 4 4 
                    4 4 4 4 4 
                    4 4 4 4 4 
                    4 4 4 4 4 
                    4 4 4 4 4 
                    `, theBoss, Math.cos(fireAngle) * projectileVelocity, Math.sin(fireAngle) * projectileVelocity)
                currentFireIndex += 1
                projectile.setKind(SpriteKind.BossProjectile)
            } else {
                for (let index = 0; index <= 7; index++) {
                    fireAngle = 0.7854 * index
                    projectile = sprites.createProjectileFromSprite(img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        `, theBoss, Math.cos(fireAngle) * projectileVelocity, Math.sin(fireAngle) * projectileVelocity)
                    projectile.setKind(SpriteKind.BossProjectile)
                }
            }
            lastBossFireTime = game.runtime()
        }
    } else {
    	
    }
})
forever(function () {
    if (currentBoss == 0) {
        if (theBoss.isHittingTile(CollisionDirection.Bottom) || theBoss.isHittingTile(CollisionDirection.Top)) {
            isBossAttacking = true
            pause(timeBetweenBossMove)
            isBossAttacking = false
            if (theBoss.isHittingTile(CollisionDirection.Bottom)) {
                theBoss.vy = 0 - bossSpeed
            } else {
                theBoss.vy = bossSpeed
            }
            pause(100)
        }
    }
})
game.onUpdateInterval(3000, function () {
    if (currentBoss == 1) {
        projectile2 = sprites.createProjectileFromSprite(assets.image`myImage6`, theBoss, 10, 0)
        projectile2.setKind(SpriteKind.BossProjectile)
        projectile2.follow(thePlayer, 35)
        sprites.setDataNumber(projectile2, "health", 12)
    }
})
