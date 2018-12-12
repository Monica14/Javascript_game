
this.$stage = document.getElementById("sleepwalkershow");
 var game = new Phaser.Game(480, window.innerHeight, Phaser.CANVAS, 'sleepwalkershow');
var jumpTimer = 0;
game.state.add('base', techtip.menu);
game.state.add('base1', techtip.base1);
game.state.add('base2', techtip.base2);
game.state.add('base3', techtip.base3);
game.state.add('base4', techtip.base4);
game.state.add('countdown', techtip.countdown);

console.log("==", techtip.level2);
game.state.start('base', true, false, 2, 3, '', 0, 0);
