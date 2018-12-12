

techtip.countdown = function (game) {
}
var level;var move = false;
var MAP_OBJECTS_INDEX = [59, 32, 15, 14];
techtip.countdown.prototype = {
    init: function (customParam1, num, text3_data) {
        level = customParam1;
        counterdown3 = num;
        text3 = text3_data;
    },
    preload: function () {
        if (counterdown3 < 0) {
            counterdown3 = 3;
        }
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.fullScreenScaleMode = true;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.parentIsWindow = true;

        game.load.image('starfield', 'assets/sprites/skyline.png');
        game.load.image('background', 'assets/sprites/waters_game.png');
        game.load.image('wolken', 'assets/sprites/wolken.png');
        game.physics.startSystem(Phaser.Physics.P2JS);
    },
    create: function () {
        game.load.crossOrigin = 'Anonymous';
        game.input.enabled = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#090C38';
        var backgroundScaleHeight = window.innerHeight;



        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        tileSprite = game.add.sprite(0, 0, 'starfield');
        tileSprite.height = this.game.height;
        tileSprite.width = (this.game.height * tileSprite.width) / tileSprite.height;
        this.game.world.setBounds(0, 0, tileSprite.width, this.game.height);
        tileSprite.height = backgroundScaleHeight;
        game.time.events.add(Phaser.Timer.SECOND, function sld() {
            game.time.events.loop(Phaser.Timer.SECOND, countdown, this);
        }, this);
    },
    update: function () {
    }
}

function countdown() {
//alert(counterdown3);
    if (counterdown3 >= 0) {
        if (text3 == '') {
            text3 = game.add.text((480 / 2) - 50, game.world.centerY - 200, counterdown3, { fill: "#ffffff", font: "200px Arial", });
        }
        else {
            text3.setText(counterdown3);
        }
        text3.fixedToCamera = true;
        text3.cameraOffset.setTo((480 / 2) - 50, game.world.centerY - 200);
        counterdown3--;
    }
    // else if (counterdown3 < 0) {
    //     text3.fixedToCamera = true;
    //     if (level == 1) {
    //         game.state.start('base', true, false, 2);
    //     }
    //     else if (level == 2) {
    //         game.state.start('base1', true, false, 2);
    //     }
    //     else if (level == 3) {
    //         game.state.start('base2', true, false, 2);
    //     }
    //     else if (level == 4) {
    //         game.state.start('base3', true, false, 2);
    //     }
    //     else if (level == 5) {
    //         game.state.start('base4', true, false, 2);
    //     }

    // }
    else if (counterdown3 < 0) {
        text3.setText('');
        game.input.enabled = true;
        game.input.mouse.enabled = true;
        move = true;
    }
}