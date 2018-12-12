// var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'game-area');
// var gameRatio = window.innerWidth/window.innerHeight;	
var game = new Phaser.Game(480, window.innerHeight, Phaser.AUTO);
var jumpTimer = 0;
game.state.add('contact', techtip.about);
game.state.add('menu', techtip.menu);
game.state.add('level2', techtip.level2);
game.state.add('level3', techtip.level3);
game.state.add('level4', techtip.level4);
game.state.add('level5', techtip.level5);
console.log("==",techtip.level2)

game.state.start('menu');