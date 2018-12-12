
var map;
var layer;
var marker; var final_step; var counterdown3 = 3; var text3 = ''; var globalGravity = 9; var jumptimer = 0;

techtip.base1 = function (game) {
}

techtip.base1.prototype = {
    init: function (jump_count, cnt, txt, fs, scoredata, scorel) {
        jump = jump_count;
        text3 = txt;
        counterdown3 = cnt;
        var counter = 0;
        var fail = 0;
        final_step = fs;
        score_level = scorel;
        game.input.enabled = false;
        score = parseInt(scoredata);
        game.input.mouse.enabled = false;
    },
    preload: function () {
    },
    create: function () {
        game.load.crossOrigin = 'Anonymous';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#0e1255';
        game.scale.refresh();
        cursors = game.input.keyboard.createCursorKeys();
        var backgroundScaleHeight = window.innerHeight;
        this.tilemap = game.add.tilemap('level2', 16, 16, 800, 600);
        var layer = this.tilemap.createLayer('layer1');
        this.tilemap.addTilesetImage('moonimahes');
        this.tilemap.addTilesetImage('flag');


        this.tilemap.addTilesetImage('skyline');
        this.tilemap.addTilesetImage('clouds');
        this.tilemap.addTilesetImage('spritesheet');

        this.tilemap.myLayers = [];


        cursor = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        // tileSprite = game.add.sprite(0, 0, 'starfield');
        for (var i = 4; i > 1; i--) {
            var layer = this.tilemap.createLayer('layer' + i);
            game.physics.arcade.enable(layer);
            this.tilemap.setCollisionByExclusion([MAP_OBJECTS_INDEX[i - 1]], true, layer);
            layer.alpha = (5 - i);
            this.tilemap.myLayers[i - 1] = layer;
        }
        // tileSprite.height = this.game.height;
        // tileSprite.width = (this.game.height * tileSprite.width) / tileSprite.height;
        // console.log("tileSprite.width : " + tileSprite.width);
        this.game.world.setBounds(0, 0, 4800, this.game.height);
        // tileSprite.height = backgroundScaleHeight;
        this.phaserDude = game.add.sprite(0, 350, 'player2');
        game.physics.enable([this.phaserDude], Phaser.Physics.ARCADE);
        this.phaserDude.body.setSize(30, 50, 50, +97);
        var walk = this.phaserDude.animations.add('walk');
        game.physics.arcade.enable(this.phaserDude);
        this.phaserDude.body.acceleration.y = 700; // setting up gravity
        this.phaserDude.body.collideWorldBounds = true;
        if (game.load.hasLoaded) {
            game.time.events.add(Phaser.Timer.SECOND, function sld() {
                game.time.events.loop(Phaser.Timer.SECOND, countdown, this);
            }, this);
        }
        //////////// star collect ///////////////////
        stars = game.add.group();
        stars.enableBody = true;
        text1 = game.add.text(100, 100, "Score : " + score, {
            font: "30px Arial",
            fill: "#ff0044",
            align: "top-center"
        });

        var star = stars.create(156.33, 403.67, 'chair');
        var star = stars.create(417.33, 378.00, 'chair');
        var star = stars.create(768.33, 302.33, 'chair');
        // var star = stars.create(780.67, 768.33, 'chair');
        // var star = stars.create(915.00, 775.67, 'chair');
        var star = stars.create(1121.176, 450.50, 'chair');
        var star = stars.create(1413.67, 605.00, 'chair');
        var star = stars.create(1499.00, 455.00, 'chair');
        var star = stars.create(1792.33, 812.33, 'chair');
        // var star = stars.create(2509.00, 490.00, 'chair');
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
        score = score;
        $('#stepnum').text('base1');
        $('#scoredata').text(score);
        game.input.enabled = false;
        player.body.velocity.x = 0;
        game.input.mouse.enabled = false;
        messagebox.style.display = "block";
    },
    update: function () {
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
                score = score + score_level;
                game.state.start('base2', true, false, 2, 3, '', 0, score, 0);
            }, this);
        }

        if(this.phaserDude.getBounds().y==753 && this.phaserDude.getBounds().x==240)
        {
            move=false;
          this.openWindow(this.phaserDude);
        }

        for (var i = 1; i < 4; i++) {
            game.physics.arcade.collide(this.tilemap.myLayers[i], this.phaserDude, this.collisionHandler(i, this.phaserDude));
        }

        if (cursors.right.isDown) {
            this.phaserDude.animations.play('walk', 15, true);
            game.physics.arcade.overlap(this.phaserDude, stars, collectStar, null, this);
            this.phaserDude.body.velocity.x = 180;
        }
        else if (cursors.right.isUp) {
            this.phaserDude.animations.stop();
        }
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

        if (game.load.hasLoaded) {
            if (move == true) {
                this.phaserDude.body.velocity.x = 180;
                this.phaserDude.animations.play('walk', 15, true);
                game.physics.arcade.overlap(this.phaserDude, stars, collectStar, null, this);
            }
        }
    }
}







