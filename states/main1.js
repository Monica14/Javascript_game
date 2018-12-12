// var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'game-area');
// var gameRatio = window.innerWidth/window.innerHeight;	
var conf = {
    width: 480,
    height: window.innerHeight,
    renderer: Phaser.AUTO,
    parent: 'sleepwalkershow',
    // transparent: false,
    // antialias: false,
    // state: this,
    scaleMode: Phaser.ScaleManager.EXACT_FIT
};
this.$stage = document.getElementById("sleepwalkershow");
 var game = new Phaser.Game(480, window.innerHeight, Phaser.AUTO, 'sleepwalkershow');
 
//var game = new Phaser.Game(conf);
//game.world.height = 458;
var jumpTimer = 0;
game.state.add('countdown', techtip.countdown);
game.state.add('base', techtip.menu);
game.state.add('base1', techtip.menu);
// game.state.add('base2', techtip.menu);
// game.state.add('base3', techtip.menu);
// game.state.add('base4', techtip.menu);
game.state.add('contact', techtip.about);
// game.state.add('menu', techtip.menu);
// game.state.add('level2', techtip.level2);
// game.state.add('level3', techtip.level3);
// game.state.add('level4', techtip.level4);
// game.state.add('level5', techtip.level5);
console.log("==",techtip.level2)

game.state.start('base');