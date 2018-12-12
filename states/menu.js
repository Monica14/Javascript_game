var techtip = {};
var map;
var layer;
var marker;var counter = 0

techtip.menu = function (game) {
    var text1; var text2;
    //game.stage.backgroundColor = "#FF00FF";
}
// techtip.level2 = function (game) {
//     console.log("dfgfdgfd");
// }
techtip.menu.prototype = {
    preload: function () {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        // game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        // game.scale.setUserScale(.7, .7, 10, 10); 
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

    },
    create: function () {
        game.load.crossOrigin = 'Anonymous';
        game.stage.backgroundColor = '#bdc0e9';
        


        // game.scale.refresh();
        game.world.setBounds(0, 0, 2000, 2000);
        tileSprite = game.add.sprite(0, 0, 'starfield');
        // tileSprite.anchor.setTo(0.5, 0.5);
        // var backgroundScaleWidth = window.innerWidth;;
        var backgroundScaleHeight = window.innerHeight;
        // tileSprite.scale.setTo(backgroundScaleWidth, backgroundScaleHeight);
        // console.log(this.game.width - 200);
        // console.log(this.game.height - 200);
        // tileSprite.height = this.game.scale.height;
        // tileSprite.width = this.game.scale.width;
        // tileSprite.height = backgroundScaleWidth;
        tileSprite.height = backgroundScaleHeight;
        // game.scale.setShowAll();
        game.scale.refresh();
        //tileSprite.scale.setTo(1,1);
        cursors = game.input.keyboard.createCursorKeys();
        makeButton('Privacy Policy', 200, 100, 'policy');
        makeConButton('Conditions of \n Participation', 200, 140, 'conditions &participation');
        makeButton('Imprint', 200, 210, 'Imprint');
        makeButton('Top 100', 200, 250, 'Top 100');
        makeButton('Start Game', 200, 290, 'contact');
        popup = game.add.sprite(240, game.world.centerY, 'messagebox');
        popup.visible = false;
        popup.alpha = 0.8;
        popup.anchor.set(0.5);
        popup.inputEnabled = true;
        popup.input.enableDrag();

        //  Position the close button to the top-right of the popup sprite (minus 8px for spacing)
        var pw = (popup.width / 2) - 30;
        var ph = (popup.height / 2) - 8;

        //  And click the close button to close it down again
        var closeButton = game.make.sprite(pw, -ph, 'close');
        closeButton.inputEnabled = true;
        closeButton.input.priorityID = 1;
        closeButton.input.useHandCursor = true;
        closeButton.events.onInputDown.add(closeWindow, this);

        //  Add the "close button" to the popup window image
        popup.addChild(closeButton);

        //  Hide it awaiting a click
        popup.scale.set(0.1);
    },
    update: function () {
        if (cursors.up.isDown) {
            game.camera.y -= 4;
        }
        else if (cursors.down.isDown) {
            game.camera.y += 4;
        }

        if (cursors.left.isDown) {
            game.camera.x -= 4;
        }
        else if (cursors.right.isDown) {
            game.camera.x += 4;
        }
    },
    contact: function () {
        // game.state.start('contact', true, false);
        // game.state.start('level2', true, false);
    }
}
var tween = null; var popup;
function openWindow() {
    popup.visible = true;
    if ((tween !== null && tween.isRunning) || popup.scale.x === 1) {
        return;
    }

    //  Create a tween that will pop-open the window, but only if it's not already tweening or open
    tween = game.add.tween(popup.scale).to({ x: 0.7, y: 0.7 }, 1000, Phaser.Easing.Elastic.Out, true);

}

function step() {
    counter++
    console.log('timer step', counter)

    if (counter == 1) {
        pauseTimer()
    }
    if (counter > 3) {
        console.log('this should never happen! Paused since step #3')
    }
}

function pauseTimer() {
    if (explicitlyPaused) return
    console.log('pause timer triggered')
    explicitlyPaused = true
    timer.pause()
}

function handleGamePaused() {
    console.log('game paused')
}
function handleGameResumed() {
    console.log('game resumed')
}

function closeWindow() {
    popup.visible = false;

    if (tween && tween.isRunning || popup.scale.x === 0.1) {
        return;
    }

    //  Create a tween that will close the window, but only if it's not already tweening or closed
    tween = game.add.tween(popup.scale).to({ x: 0.1, y: 0.1 }, 500, Phaser.Easing.Elastic.In, true);

}

function makeButton(name, x, y, eventname) {

    if (eventname != 'contact') {
        var policy = game.add.button(x, y, 'button', this.openWindow, { 'points': eventname }, this, 0, 1, 2);
        policy.name = name;
        policy.scale.set(2, 1.5);
        policy.smoothed = false;
        var text = game.add.bitmapText(x, y + 7, 'shortStack', name, 16);
        text.x += (policy.width / 2) - (text.textWidth / 2);
    }
    else {
        var policy = game.add.button(x, y, 'button', this.contact, this, 0, 1, 2);
        policy.name = name;
        policy.scale.set(2, 1.5);
        policy.smoothed = false;
        var text = game.add.bitmapText(x, y + 7, 'shortStack', name, 16);
        text.x += (policy.width / 2) - (text.textWidth / 2);
    }
}

function contact() {
    game.state.start('base', true, false);
    //game.state.start('level2', true, false);
}

function makeConButton(name, x, y, eventname) {

    var policy = game.add.button(x, y, 'button', this.event, { 'points': eventname }, this, 0, 1, 2);
    policy.name = name;
    policy.scale.set(2, 3);
    policy.smoothed = false;

    var text = game.add.bitmapText(x, y + 7, 'shortStack', name, 16);
    text.x += (policy.width / 2) - (text.textWidth / 2);

}

function event(button) {
    alert(this.points);
}

