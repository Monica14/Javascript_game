
techtip.about = function (game) {
    var text;
    this.platforms = null;
}

var map;
var layer;
var marker;
var facing = 'left';
var jumpTimer = 0; var text = '';
var jumpButton; var jump = 2; var counter = 0; var phaserDude; var counterdown = 3; var cnt = 1; var cnt1 = 2;

var final_step = 0;

var MAP_OBJECTS_INDEX = [59, 32, 15, 14];

techtip.about.prototype = {
    preload: function () {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setMinMax(0, 10, 480, 460);
        game.scale.fullScreenScaleMode = true;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.parentIsWindow = true;
        game.load.image('messagebox', 'assets/pics/bubble-on.png');
        game.load.image('close', 'assets/sprites/orb-red.png');
        game.load.image('starfield', 'assets/sprites/skyline.png');
        game.load.image('star', 'assets/games/starstruck/star2.png');
        game.load.image('background', 'assets/sprites/waters_game.png');
        game.load.spritesheet('dude', 'assets/sprites/phaser-dude.png');
        game.load.spritesheet('button', 'assets/buttons/flixel-button.png', 80, 20);
        game.load.bitmapFont('shortStack', 'assets/fonts/bitmapFonts/shortStack.png', 'assets/fonts/bitmapFonts/shortStack.xml');
        game.load.tilemap('map', 'assets/tilemaps/maps/demo23.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level2_map', 'assets/tilemaps/maps/level2_map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level3_map', 'assets/tilemaps/maps/level3_map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level4_map', 'assets/tilemaps/maps/level4_map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level5_map', 'assets/tilemaps/maps/level5_map.json', null, Phaser.Tilemap.TILED_JSON);
        // game.load.image('scr_01', 'assets/sprites/ngtile1.png');
        game.load.image('wolken', 'assets/sprites/wolken.png');
        game.load.image('ngtile', 'assets/sprites/ngtile.png');
        game.load.image('ngtile1', 'assets/sprites/ngtile1.png');
        game.load.image('ngtile3', 'assets/sprites/ngtile3.png');
        game.load.image('pipe1', 'assets/sprites/pipe1.png');
        game.load.image('pipe2', 'assets/sprites/pipe2.png');
        game.load.image('slp1', 'assets/sprites/slp1.png');
        game.load.image('slp2', 'assets/sprites/slp2.png');
        // game.load.image('pipe3', 'assets/sprites/pipe3.png');
        game.load.image('moonimahes', 'assets/sprites/moonimahes.png');
        game.load.image('flag', 'assets/sprites/flag.png');
        // game.world.setBounds(0, 0, 128 * 16, 10 * 16);
        game.load.image('brick', 'assets/sprites/brick.png');
        game.load.image('brick20', 'assets/sprites/brick20.png');
        game.physics.startSystem(Phaser.Physics.P2JS);
        timer = game.time.create(false);
        //timer.repeat(Phaser.Timer.SECOND, 1, 1, this);
        //console.log("Phaser.Timer.SECOND :" + Phaser.Timer.SECOND * 1000);
    },
    create: function () {
        game.load.crossOrigin = 'Anonymous';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#090C38';
        game.scale.refresh();       
        cursors = game.input.keyboard.createCursorKeys();


        // game.stage.backgroundColor = '#090C38';
        //tileSprite = game.add.tileSprite(0, 200, 2000, 2000, 'starfield');
        var backgroundScaleHeight = window.innerHeight;
        // wolken = game.add.sprite(0, 0, 'wolken');
        // wolken.height = this.game.height;


        // console.log("width : "+tileSprite.width+"height :"+tileSprite.height);
        //wolken.width = tileSprite.width;

        // Set Worldbounds exact to the skyline





        // setting up tilemap
        this.tilemap = game.add.tilemap('map', 16, 16, 800, 600);
        var layer = this.tilemap.createLayer('layer1');
        this.tilemap.addTilesetImage('ngtile1');
        this.tilemap.addTilesetImage('ngtile');
        this.tilemap.addTilesetImage('ngtile3');
        this.tilemap.addTilesetImage('pipe1');
        this.tilemap.addTilesetImage('pipe2');
        // this.tilemap.addTilesetImage('pipe3');
        this.tilemap.addTilesetImage('slp1');
        this.tilemap.addTilesetImage('slp2');
        this.tilemap.addTilesetImage('moonimahes');
        this.tilemap.addTilesetImage('flag');
        this.tilemap.addTilesetImage('wolken');

        this.tilemap.myLayers = [];


        cursor = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        //this.phaserDude.body.setSize(20, 32, 5, 16);
        // this.phaserDude.animations.add('left', [0, 1, 2, 3], 10, true);
        // this.phaserDude.animations.add('turn', [4], 20, true);
        // this.phaserDude.animations.add('right', [5, 6, 7, 8], 10, true);
        tileSprite = game.add.sprite(0, 0, 'starfield');
        for (var i = 2; i > 1; i--) {
            var layer = this.tilemap.createLayer('layer' + i);
            // enabling collisions for this layer
            game.physics.arcade.enable(layer);
            this.tilemap.setCollisionByExclusion([MAP_OBJECTS_INDEX[i - 1]], true, layer);
            // layer.alpha = (3-i)/2;
            // this.tilemap.myLayers[i-1] = layer;
            layer.alpha = (3 - i);
            this.tilemap.myLayers[i - 1] = layer;
            //this.tilemap.myLayers[1] = 0.10;
        }
        this.tilemap.addTilesetImage('brick');
        this.tilemap.addTilesetImage('brick20');
        tileSprite.height = this.game.height;
        tileSprite.width = (this.game.height * tileSprite.width) / tileSprite.height;
        this.game.world.setBounds(0, 0, tileSprite.width, this.game.height);
        tileSprite.height = backgroundScaleHeight;
        this.phaserDude = game.add.sprite(20, 20, 'dude');
        

        //this.phaserDude.scale.setTo(2, 2);
        game.physics.arcade.enable(this.phaserDude);
        this.phaserDude.body.acceleration.y = 400; // setting up gravity
        this.phaserDude.body.collideWorldBounds = true;

        game.camera.follow(this.phaserDude);
    },
    go: function () {
        game.state.start('menu');
    },
    lavel2: function () {
        game.state.start('level2');
    },
    gameover: function () {
        alert("Game Over");
        game.state.start('menu');
    },
    collisionHandler: function (index, phaserDude) {
        return function (sprite, layer) {
            //console.log("game.world.centerX :" + game.world.centerX + 100);
            if (layer.index == 933) {
                final_step = layer.index;
                game.input.enabled = false;
                game.input.mouse.enabled = false;

            }
        }
    },
    update: function () {
        this.phaserDude.body.velocity.x = 0;
        if (final_step == 933) {
            if (counter == 0) {
                game.time.events.add(Phaser.Timer.SECOND * 0.5, function sld() {
                    this.phaserDude.body.velocity.x = 500;
                }, this);
                counter++;
            }
            game.time.events.add(Phaser.Timer.SECOND * 2, function sld() {
                if (jump > 0) {
                    jump--;
                    game.time.events.repeat(Phaser.Timer.SECOND * 2, 2, function sld() {
                        this.phaserDude.body.velocity.y = -200;
                    }, this);
                }
            }, this);
            game.time.events.add(Phaser.Timer.SECOND * 5, function sld() {
                // cnt++;
                // game.time.events.loop(Phaser.Timer.SECOND * cnt, updateCounter, this);
                game.state.start('level2');
            }, this);
        }

        if (this.phaserDude.body.velocity.y >= 700) {
            this.gameover();
        }

        for (var i = 1; i < 2; i++) {
            game.physics.arcade.collide(this.tilemap.myLayers[i], this.phaserDude, this.collisionHandler(i, this.phaserDude));
        }

        if (cursors.left.isDown) {
            this.phaserDude.body.velocity.x = -150;

            if (facing != 'left') {
                this.phaserDude.animations.play('left');
                facing = 'left';
            }
        }
        else if (cursors.right.isDown) {
            this.phaserDude.body.velocity.x = 150;

            if (facing != 'right') {
                this.phaserDude.animations.play('right');
                facing = 'right';
            }
        }
        if (jumpButton.isDown && this.phaserDude.body.onFloor() && game.time.now > jumpTimer) {
            this.phaserDude.body.velocity.y = -250;
            jumpTimer = game.time.now + 750;
        }
    }

}


function updateCounter() {
    if (counterdown > 0) {
        if (text == '') {
            text = game.add.text(100, 30, 'Countdown: ' + counterdown, { fill: "#ffffff", align: "center" });
        }
        else {
            text.setText("Countdown : " + counterdown);
        }
        text.fixedToCamera = true;
        text.cameraOffset.setTo(100, 30);
    }
    else if (counterdown == 0) {
        game.state.start('level2');
    }

    counterdown--;
}

function render() {

    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 500);

}

function start() {

    sounds.shift();

    bass.loopFull(0.6);
    bass.onLoop.add(hasLooped, this);

    text.text = 'bass';

}

function hasLooped(sound) {

    loopCount++;

    if (loopCount === 1) {
        sounds.shift();
        drums.loopFull(0.6);
        text.text = 'drums';
        game.add.tween(speakers.scale).to({ x: 1.3, y: 1.1 }, 230, "Sine.easeInOut", true, 0, -1, true);
    }
    else if (loopCount === 2) {
        current = game.rnd.pick(sounds);
        current.loopFull();
        text.text = current.key;
    }
    else if (loopCount > 2) {
        current.stop();
        current = game.rnd.pick(sounds);
        current.loopFull();
        text.text = current.key;
    }

}
function collectStar(player, star) {
    star.kill();
    var score = 0;
    score += 10;
    text.setText("Score : " + score);

}