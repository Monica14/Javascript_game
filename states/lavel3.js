

techtip.level3 = function (game) {
}

var text2 = ''; var cnt2 = 1; var counterdown2 = 3;

techtip.level3.prototype = {
    preload: function () {
        // alert("asdsa")
    },
    create: function () {
        game.load.crossOrigin = 'Anonymous';
        game.input.enabled = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#121973';
        var backgroundScaleHeight = window.innerHeight;
        this.tilemap = game.add.tilemap('level3_map', 16, 16, 800, 600);
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
    },
    update: function () {
        game.time.events.add(Phaser.Timer.SECOND, function sld() {
            cnt2++;
            game.time.events.loop(Phaser.Timer.SECOND * cnt2, updateCounter2, this);
        }, this);
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

function updateCounter2() {
    //console.log("counterdown1 :"+counterdown1);
    if (counterdown2 > 0) {
        //alert(counterdown1);
        if (text2 == '') {
            text2 = game.add.text(100, 30, 'Countdown: ' + counterdown2, { fill: "#ffffff"});
        }
        else {
            text2.setText("Countdown : " + counterdown2);
        }
        text2.fixedToCamera = true;
        text2.cameraOffset.setTo(100, 30);
    }
    else if (counterdown2 == 0) {
        //text1 = game.add.text(100, 30, 'Countdown: ' + counterdown1, { fill: "#ffffff", align: "center" });
        game.state.start('level4');
    }
    cnt2++;
    counterdown2--;
}