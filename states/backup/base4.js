// var techtip = {};
var map;
var layer;
var marker; var counter = 0; var final_step; var jump = 2; var globalGravity = 9; var jumptimer = 0;

techtip.base4 = function (game) {
    var text1; var text2;
}
techtip.base4.prototype = {
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
        game.stage.backgroundColor = '#1c25ad';
        game.scale.refresh();
        cursors = game.input.keyboard.createCursorKeys();
        var backgroundScaleHeight = window.innerHeight;
        this.tilemap = game.add.tilemap('level5', 16, 16, 800, 600);
        var layer = this.tilemap.createLayer('layer1');
        this.tilemap.addTilesetImage('ngtile1');
        this.tilemap.addTilesetImage('l1');
        this.tilemap.addTilesetImage('l2');
        this.tilemap.addTilesetImage('l3');
        this.tilemap.addTilesetImage('l4');
        this.tilemap.addTilesetImage('l5');
        this.tilemap.addTilesetImage('h1');
        this.tilemap.addTilesetImage('h2');
        this.tilemap.addTilesetImage('h3');
        this.tilemap.addTilesetImage('h11');
        this.tilemap.addTilesetImage('h12');
        this.tilemap.addTilesetImage('w11');
        this.tilemap.addTilesetImage('w12');
        this.tilemap.addTilesetImage('w1');
        this.tilemap.addTilesetImage('w2');
        this.tilemap.addTilesetImage('hpart');
        this.tilemap.addTilesetImage('hpart2');
        this.tilemap.addTilesetImage('pipe1');
        this.tilemap.addTilesetImage('pipe2');
        this.tilemap.addTilesetImage('moonimahes');
        this.tilemap.addTilesetImage('flag');
        this.tilemap.addTilesetImage('s1');
        this.tilemap.addTilesetImage('s2');
        this.tilemap.addTilesetImage('s3');
        this.tilemap.addTilesetImage('wolken_l5');


        this.tilemap.myLayers = [];


        cursor = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        tileSprite = game.add.sprite(0, 0, 'starfield');
        for (var i = 4; i > 1; i--) {
            var layer = this.tilemap.createLayer('layer' + i);
            game.physics.arcade.enable(layer);
            this.tilemap.setCollisionByExclusion([MAP_OBJECTS_INDEX[i - 1]], true, layer);
            layer.alpha = (5 - i);
            this.tilemap.myLayers[i - 1] = layer;
        }

        tileSprite.height = this.game.height;
        tileSprite.width = (this.game.height * tileSprite.width) / tileSprite.height;
        this.game.world.setBounds(0, 0, tileSprite.width, this.game.height);
        tileSprite.height = backgroundScaleHeight;
        this.phaserDude = game.add.sprite(0, 350, 'player5');
        game.physics.enable([this.phaserDude], Phaser.Physics.ARCADE);
        this.phaserDude.body.setSize(30, 50, 50, +97);
        var walk = this.phaserDude.animations.add('walk');
        game.physics.arcade.enable(this.phaserDude);
        this.phaserDude.body.acceleration.y = 700; // setting up gravity
        this.phaserDude.body.collideWorldBounds = true;
        if (game.load.hasLoaded) {
            game.time.events.add(Phaser.Timer.SECOND * 2, function sld() {
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

        var star = stars.create(700, 280, 'star');
        var star = stars.create(1000, 300, 'star');
        var star = stars.create(800, 300, 'star');
        var star = stars.create(1500, 300, 'star');
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
    openWindow: function () {
        score = score;
        $('#stepnum').text('base4');
        $('#scoredata').text(score);
        messagebox.style.display = "block";
    },
    update: function () {
        this.phaserDude.body.velocity.x = 0;
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
            game.time.events.add(Phaser.Timer.SECOND * 8, winWindow, this);
        }

        if (Phaser.Point.equals(this.phaserDude.body.velocity, new Phaser.Point(0, 0)) && this.phaserDude.body.velocity.y == -0) {
            this.openWindow();
        }

        for (var i = 1; i < 4; i++) {
            game.physics.arcade.collide(this.tilemap.myLayers[i], this.phaserDude, this.collisionHandler(i, this.phaserDude));
        }

        if (cursors.right.isDown) {
            this.phaserDude.animations.play('walk', 15, true);
            this.phaserDude.body.velocity.x = 240;
            game.physics.arcade.overlap(this.phaserDude, stars, collectStar, null, this);
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
    }
}

function winWindow() {
    // score = score+score_level;
    // localStorage.setItem('scorevalue', score); 
    // window.location.href = "login.html";
    $('#stepnum').text('base1');
    $('#scoredata').text(score);
    winmessagebox.style.display = "block";
}