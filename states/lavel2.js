

techtip.level2 = function (game) {
}
var text1 = ''; var cnt1 = 1; var counterdown1 = 3;

techtip.level2.prototype = {
    preload: function () {
        game.time.events.add(Phaser.Timer.SECOND, function sld() {
            cnt1++;
            game.time.events.loop(Phaser.Timer.SECOND * cnt1, updateCounter1, this);
        }, this);
    },
    create: function () {
        game.load.crossOrigin = 'Anonymous';
        game.input.enabled = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#0e1255';
        var backgroundScaleHeight = window.innerHeight;
        this.tilemap = game.add.tilemap('level2_map', 16, 16, 800, 600);
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


        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        tileSprite = game.add.sprite(0, 0, 'starfield');
        layer.alpha = 0.5;
        this.tilemap.myLayers[1] = layer;
        for (var i = 2; i > 1; i--) {
            var layer = this.tilemap.createLayer('layer' + i);
            game.physics.arcade.enable(layer);
            this.tilemap.setCollisionByExclusion([MAP_OBJECTS_INDEX[i - 1]], true, layer);
            // layer.alpha = (3-i)/2;
            // this.tilemap.myLayers[i-1] = layer;
            layer.alpha = (3 - i);
            this.tilemap.myLayers[i - 1] = layer;
        }
        tileSprite.height = this.game.height;
        tileSprite.width = (this.game.height * tileSprite.width) / tileSprite.height;
        this.game.world.setBounds(0, 0, tileSprite.width, this.game.height);
        tileSprite.height = backgroundScaleHeight;
        this.phaserDude = game.add.sprite(20, 20, 'dude');
        game.physics.arcade.enable(this.phaserDude);
        this.phaserDude.body.acceleration.y = 400;
        this.phaserDude.body.collideWorldBounds = true;
        game.camera.follow(this.phaserDude);
        
        //text1 = game.add.text(100, 30, 'Countdown: ' + counterdown1, { fill: "#ffffff"});
        
    },
    collisionHandler: function (index, phaserDude) {
        return function (sprite, layer) {
            //console.log("game.world.centerX :" + game.world.centerX + 100);
            game.input.enabled = false;
            game.input.mouse.enabled = false;
        }
    },
    update: function () {
        //game.time.events.loop(Phaser.Timer.SECOND, updateCounter1, this);       
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

function updateCounter1() {
    //console.log("counterdown1 :"+counterdown1);
    if (counterdown1 > 0) {
        //alert(counterdown1);
        if (text1 == '') {
            text1 = game.add.text(100, 30, 'Countdown: ' + counterdown1, { fill: "#ffffff"});
        }
        else {
            text1.setText("Countdown : " + counterdown1);
        }
        text1.fixedToCamera = true;
        text1.cameraOffset.setTo(100, 30);
    }
    else if (counterdown1 == 0) {
        //text1 = game.add.text(100, 30, 'Countdown: ' + counterdown1, { fill: "#ffffff", align: "center" });
        game.state.start('level3');
    }
    cnt1++;
    counterdown1--;
}