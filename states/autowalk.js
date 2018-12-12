var techtip = {};
var map;
var layer; var jump = 2;
var marker; var counter = 0; var phaserDude; var MAP_OBJECTS_INDEX = [59, 32, 15, 14]; var phaserDude; var facing; var level;
var counterdown3 = 3; var score = 0; var button; var fail = 0; var globalGravity = 9; var score_level = 0;
var popup;
var tween = null; var jumptimer = 0; var score_level = 0;
techtip.menu = function (game) {
    var text1; var text2;
}

techtip.menu.prototype = {
    init: function (jump_count, cnt, txt, fs, scoredata, scorel) {
        jump = jump_count;
        text3 = txt;
        counterdown3 = cnt;
        var counter = 0;
        var fail = 0;
        final_step = fs;
        // alert('score_level1:'+score_level);
        score_level = scorel;
        game.input.enabled = false;
        score = parseInt(scoredata);
        game.input.mouse.enabled = false;
    },
    preload: function () {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.fullScreenScaleMode = true;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.parentIsWindow = true;

        game.load.image('starfield', 'assets/sprites/skyline.png');
        game.load.image('l1', 'assets/sprites/l1.png');
        game.load.image('l2', 'assets/sprites/l2.png');
        game.load.image('l3', 'assets/sprites/l3.png');
        game.load.image('l4', 'assets/sprites/l4.png');
        game.load.image('l5', 'assets/sprites/l5.png');
        game.load.image('h1', 'assets/sprites/h1.png');
        game.load.image('h2', 'assets/sprites/h2.png');
        game.load.image('h3', 'assets/sprites/h3.png');
        game.load.image('h11', 'assets/sprites/h11.png');
        game.load.image('h12', 'assets/sprites/h12.png');
        game.load.image('w1', 'assets/sprites/w1.png');
        game.load.image('w2', 'assets/sprites/w2.png');
        game.load.image('w11', 'assets/sprites/w11.png');
        game.load.image('w12', 'assets/sprites/w12.png');
        game.load.spritesheet('player1', 'assets/sprites/player_1.png', 100, 147);
        game.load.spritesheet('player2', 'assets/sprites/player_2.png', 100, 147);
        game.load.spritesheet('player3', 'assets/sprites/player_3.png', 100, 149);
        game.load.spritesheet('player4', 'assets/sprites/player_4.png', 100, 147);
        game.load.spritesheet('player5', 'assets/sprites/player_5.png', 100, 147);
        game.load.tilemap('level1', 'assets/tilemaps/maps/level1set.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level2', 'assets/tilemaps/maps/level2set.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level3', 'assets/tilemaps/maps/level3.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level4', 'assets/tilemaps/maps/level4.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level5', 'assets/tilemaps/maps/level5.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('wolken', 'assets/sprites/wolken.png');
        game.load.image('wolken_l2', 'assets/sprites/wolken_l2.png');
        game.load.image('wolken_l3', 'assets/sprites/wolken_l3.png');
        game.load.image('wolken_l4', 'assets/sprites/wolken_l4.png');
        game.load.image('wolken_l5', 'assets/sprites/wolken_l5.png');
        game.load.image('ngtile1', 'assets/sprites/ngtile1.png');
        game.load.image('pipe1', 'assets/sprites/pipe1.png');
        game.load.image('pipe2', 'assets/sprites/pipe2.png');
        game.load.image('clouds', 'assets/sprites/wolken.png');
        game.load.image('flag', 'assets/sprites/main/flag.png');
        game.load.image('spritesheet', 'assets/sprites/main/spritesheet.png');
        game.load.image('skyline', 'assets/sprites/main/skyline.png');
        game.load.image('chair', 'assets/sprites/chair.png'); ////////// add sprite
        game.load.image('moonimahes', 'assets/sprites/moonimahes.png');
        // game.load.image('flag', 'assets/sprites/flag.png');
        game.load.image('hpart', 'assets/sprites/hpart.png');
        game.load.image('hpart2', 'assets/sprites/hpart2.png');
        game.load.image('s1', 'assets/sprites/s1.png');
        game.load.image('s2', 'assets/sprites/s2.png');
        game.load.image('s3', 'assets/sprites/s3.png');
        game.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71);
        game.load.image('bg', 'assets/pics/bg.png');
        game.load.image('close', 'assets/sprites/orb-red.png');
        game.physics.startSystem(Phaser.Physics.P2JS);
    },
    create: function () {
        game.load.crossOrigin = 'Anonymous';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#090C38';
        game.scale.refresh();
        cursors = game.input.keyboard.createCursorKeys();
        var backgroundScaleHeight = window.innerHeight;
        this.tilemap = game.add.tilemap('level1', 16, 16, 800, 600);
        var layer = this.tilemap.createLayer('layer1');
        // this.tilemap.addTilesetImage('ngtile1');
        // this.tilemap.addTilesetImage('l1');
        // this.tilemap.addTilesetImage('l2');
        // this.tilemap.addTilesetImage('l3');
        // this.tilemap.addTilesetImage('l4');
        // this.tilemap.addTilesetImage('l5');
        // this.tilemap.addTilesetImage('h1');
        // this.tilemap.addTilesetImage('h2');
        // this.tilemap.addTilesetImage('h3');
        // this.tilemap.addTilesetImage('h11');
        // this.tilemap.addTilesetImage('h12');
        // this.tilemap.addTilesetImage('w11');
        // this.tilemap.addTilesetImage('w12');
        // this.tilemap.addTilesetImage('w1');
        // this.tilemap.addTilesetImage('w2');
        // this.tilemap.addTilesetImage('hpart');
        // this.tilemap.addTilesetImage('hpart2');
        // this.tilemap.addTilesetImage('pipe1');
        // this.tilemap.addTilesetImage('pipe2');
        this.tilemap.addTilesetImage('moonimahes');
        // this.tilemap.addTilesetImage('wolken');

        this.tilemap.addTilesetImage('flag');
        this.tilemap.addTilesetImage('chair');

        this.tilemap.addTilesetImage('skyline');
        this.tilemap.addTilesetImage('clouds');
        this.tilemap.addTilesetImage('spritesheet');


        this.tilemap.myLayers = [];


        cursor = game.input.keyboard.createCursorKeys();
        //console.log(cursors.right);
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        //tileSprite = game.add.sprite(0, 0, 'starfield');
        for (var i = 4; i > 1; i--) {
            var layer = this.tilemap.createLayer('layer' + i);
            game.physics.arcade.enable(layer);
            this.tilemap.setCollisionByExclusion([MAP_OBJECTS_INDEX[i - 1]], true, layer);
            layer.alpha = (5 - i);
            this.tilemap.myLayers[i - 1] = layer;
        }
        // tileSprite.height = this.game.height+100;
        // tileSprite.width = (this.game.height * tileSprite.width) / tileSprite.height;
        this.game.world.setBounds(0, 0, 4800, this.game.height);
        //tileSprite.height = backgroundScaleHeight;

        this.phaserDude = game.add.sprite(0, 387, 'player1');
        game.physics.enable([this.phaserDude], Phaser.Physics.ARCADE);
        this.phaserDude.body.setSize(30, 50, 50, +97);
        //this.phaserDude.body.setSize(100, 50, 50, 25);
        var walk = this.phaserDude.animations.add('walk');

        game.physics.arcade.enable(this.phaserDude);
        this.phaserDude.body.acceleration.y = 700; // setting up gravity
        this.phaserDude.body.collideWorldBounds = true;
        if (game.load.hasLoaded) {
            game.time.events.add(Phaser.Timer.SECOND * 0.5, function sld() {
                game.time.events.loop(Phaser.Timer.SECOND, countdown, this);
            }, this);
        }

        //////////// star collect ///////////////////
        stars = game.add.group();
        stars.enableBody = true;

        text1 = game.add.text(100, 100, "Score : " + score_level, {
            font: "30px Arial",
            fill: "#ff0044",
            align: "top-center"
        });

        text1.anchor.setTo(0.5, 0.5);
        var star = stars.create(489, 476, 'chair');
        var star = stars.create(1123, 343, 'chair');
        var star = stars.create(1413.67, 605, 'chair');
        var star = stars.create(1792.33, 812.33, 'chair');
        var star = stars.create(2219.66, 586.00, 'chair');
        var star = stars.create(2509.00, 490.00, 'chair');
        var star = stars.create(2852.33, 447.67, 'chair');
        var star = stars.create(3067.00, 377.33, 'chair');
        var star = stars.create(3390.33, 298.67, 'chair');
        var star = stars.create(3397.67, 765.00, 'chair');
        var star = stars.create(3583.00, 757.00, 'chair');
        var star = stars.create(3819.00, 746.33, 'chair');
        var star = stars.create(3758.66, 207.00, 'chair');
        var star = stars.create(4188.34, 202.67, 'chair');
        var star = stars.create(4247.00, 633.00, 'chair');
        var star = stars.create(4488.33, 313.33, 'chair');
        text1.fixedToCamera = true;

        //  You can drag the pop-up window around
        popup = game.add.sprite(250, 350, 'bg');
        popup.visible = false;
        //popup.alpha = 0.8;
        //popup.alpha = 1;
        popup.anchor.set(0.5);
        // popup.width = '700px';
        // popup.height = '300px';
        popup.inputEnabled = true;
        popup.input.enableDrag();

        //  Position the close button to the top-right of the popup sprite (minus 8px for spacing)
        var pw = (popup.width / 8) - 100;
        var ph = (popup.height / 8) - 100;

        var pwt = (popup.width / 3) - 300;
        var pht = (popup.height / 3) - 100;

        popup_text = game.add.text(pwt, -pht, "Oops, failed!", {
            font: "30px Arial",
            fill: "#ff0044",
            align: "top-center"
        });

        //  And click the close button to close it down again
        //var closeButton = game.make.sprite(pw, -ph, 'close');
        var closeButton = game.add.button(pw - 80, -ph, 'button');
        closeButton.inputEnabled = true;
        closeButton.input.priorityID = 1;
        closeButton.input.useHandCursor = true;
        closeButton.events.onInputDown.add(closeWindow, this);

        //  Add the "close button" to the popup window image
        popup.addChild(popup_text);
        popup.addChild(closeButton);

        //  Hide it awaiting a click
        popup.scale.set(0.1);
        popup.fixedToCamera = true;
        game.camera.follow(this.phaserDude);
    },
    collisionHandler: function (index, phaserDude) {
        return function (sprite, layer) {
            if (layer.layer.name == 'layer3') {
                final_step = 9;
                game.input.enabled = false;
                game.input.mouse.enabled = false;

            }
        }
    },
    openWindow: function (player) {
        score = 0;
        $('#stepnum').text('base');
        $('#scoredata').text(score);
        game.input.enabled = false;
        player.body.velocity.x = 0;
        player.animations.stop();
        game.input.mouse.enabled = false;
        messagebox.style.display = "block";
    },
    update: function () {
        this.phaserDude.body.velocity.x = 0;
        
        // console.log("popup scaling...........");
        // console.log(popup.scale);
        game.add.tween(popup.scale).to({ x: 0.5, y: 0.5 }, 1000, Phaser.Easing.Elastic.Out, true);
        if (final_step == 9) {
            this.phaserDude.animations.stop();
            if (counter == 0) {
                game.time.events.add(Phaser.Timer.SECOND, function sld() {
                    this.phaserDude.body.velocity.x = 500;
                }, this);
                counter++;
            }
            game.time.events.add(Phaser.Timer.SECOND * 1.5, function sld() {
                if (jump > 0) {
                    jump--;
                    game.time.events.repeat(Phaser.Timer.SECOND * 2, 2, function sld() {
                        this.phaserDude.body.velocity.y = -200;
                    }, this);
                }
            }, this);
            game.time.events.add(Phaser.Timer.SECOND * 8, function sld() {
                score = score_level;
                game.state.start('base1', true, false, 2, 3, '', 0, score, 0);
            }, this);
        }

        console.log(this.phaserDude.body.velocity.y);

        if (Phaser.Point.equals(this.phaserDude.body.velocity, new Phaser.Point(0, 0)) && this.phaserDude.body.velocity.y == -0) {
            this.openWindow(this.phaserDude);
        }

        for (var i = 1; i < 4; i++) {
            game.physics.arcade.collide(this.tilemap.myLayers[i], this.phaserDude, this.collisionHandler(i, this.phaserDude));
        }

        if (cursors.right.isDown) {
            this.phaserDude.animations.play('walk', 15, true);
            game.physics.arcade.overlap(this.phaserDude, stars, collectStar, null, this);
            this.phaserDude.body.velocity.x = 150;
        }
        else if (cursors.right.isUp) {
            this.phaserDude.animations.stop();
        }

        // if (counterdown3 == 0) {
        //     //game.time.events.add(Phaser.Timer.SECOND, function sld() {
        //         this.phaserDude.animations.play('walk', 15, true);
        //         game.physics.arcade.overlap(this.phaserDude, stars, collectStar, null, this);
        //         this.phaserDude.body.velocity.x = 150;
        //     //});
        // }

        if (jumpButton.isDown) {
            if (this.phaserDude.body.onFloor() && jumpTimer === 0) {
                jumpTimer = 1;
                this.phaserDude.body.velocity.y = -300;
            } else if (jumpTimer > 0 && jumpTimer < 31) {
                jumpTimer++;
                this.phaserDude.body.velocity.y = -400 + (jumpTimer * 7);
            }
        } else {
            jumpTimer = 0;
        }
    }
}

function closeWindow() {
    popup.visible = false;
    // if (tween && tween.isRunning || popup.scale.x === 0.5) {
    //     return;
    // }

    //  Create a tween that will close the window, but only if it's not already tweening or closed
    //tween = game.add.tween(popup.scale).to({ x: 0.5, y: 0.5 }, 500, Phaser.Easing.Elastic.In, true);
    //game.state.start('base');
    //window.open("http://lutzjumpnrun.mediasisters.at/jump-run/index.html", "_blank");
}


function collectStar(player, star) {
    star.kill();
    score_level += 10;
    text1.setText("Score : " + (score + score_level));

}




