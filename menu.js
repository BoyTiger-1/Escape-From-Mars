function menuPreload() {

  //Load the skins
  game.load.spritesheet('player', 'assets/players/robot_red.png', 114, 114);
  game.load.spritesheet('chimp', 'assets/players/chimp.png', 114, 114);
  game.load.spritesheet('astronaut1', 'assets/players/astronaut_green.png', 114, 114);
  game.load.spritesheet('astronaut2', 'assets/players/astronaut_purple.png', 114, 114);
  game.load.spritesheet('pirate', 'assets/players/pirate_blue.png', 114, 114);
  game.load.spritesheet('robot', 'assets/players/robot_orange.png', 114, 114);
  game.load.spritesheet('supergirl', 'assets/players/superhero_female.png', 114, 114)
  game.load.spritesheet('superman', 'assets/players/superhero_male.png', 114, 114);

  //Load image for enemies
  game.load.spritesheet('enemy1', 'assets/enemies/chomper.png', 114, 114);
  game.load.spritesheet('enemy2', 'assets/enemies/zombie.png', 114, 114);
  game.load.spritesheet('enemy3', 'assets/enemies/ghost.png', 114, 114);
  game.load.spritesheet('zigZagEnemy', 'assets/enemies/bat.png', 114, 114);
  game.load.spritesheet('chaserEnemy', 'assets/enemies/octopus.png', 114, 114);
  game.load.spritesheet('speederEnemy', 'assets/enemies/mine.png', 114, 114);
  game.load.image('warning', 'assets/ui/warning.png');

  //Load the image for our background
  game.load.image('background', 'assets/backgrounds/background3.png');
  game.load.image('shopBackground', 'assets/backgrounds/background4.png')

  //Load our font
  game.load.bitmapFont('font', 'assets/fonts/font5.png', 'assets/fonts/font5.fnt');

  //Load an image for our coins
  game.load.image('coin', 'assets/pickups/coin2.png');

  //Load the images for our powerups
  game.load.image('shield', 'assets/pickups/powerup2.png');
  game.load.image('magnet', 'assets/pickups/powerup1.png');
  game.load.image('boom', 'assets/pickups/powerup3.png');

  //Load the image for our explosion
  game.load.image('explosion', 'assets/effects/laserBlue01.png');

  //Load the audio for our game
  game.load.audio('mainMusic', 'assets/music/8BitMetal.mp3');
  game.load.audio('coinSound', 'assets/soundFX/coin1.mp3');
  game.load.audio('lose', 'assets/soundFX/warpJingle.mp3');
  game.load.audio('blowUp', 'assets/soundFX/fire.mp3');

  //Load some buttons
  game.load.image('button', 'assets/ui/blankButton.png');
  game.load.image('backButton', 'assets/ui/back.png');
  game.load.image('lock', 'assets/ui/lock.png');

}

function menuCreate() {

  //Register our states in the state registry
  game.state.add('menu', menuState);
  game.state.add('game', gameState);
  game.state.add('shop', shopState);

  //Scale the game
  game.scale.setUserScale(window.innerWidth/960, window.innerHeight/640);
  game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

  //Make a background
  game.menuBackground = game.add.tileSprite(0, 0, 960, 640, 'background');

  //Create the title text
  var menuText = game.add.bitmapText(game.world.centerX, 175, 'font', 'ESCAPE FROM MARS');
  menuText.anchor.setTo(0.5, 0.5);
  menuText.scale.setTo(1.9, 2.5);

  //Create a play button
  var playButton = game.add.button(game.world.centerX, game.world.centerY, 'button',
    function() {
      game.state.start('game');
    }
  );
  playButton.anchor.setTo(0.5, 0.5);
  var playButtonText = game.add.bitmapText(playButton.x, playButton.y - 10, 'font', 'PLAY');
  playButtonText.anchor.setTo(0.5, 0.5);
  playButtonText.scale.setTo(1.25, 1.25);

  //Create some credits text
  var creditsText = game.add.bitmapText(450, 575, 'font', 'Game By Ronit Agarwal');
  creditsText.scale.setTo(0.75, 0.75)
  creditsText.align = 'center';

  //Create the skin list
  if(!localStorage.getItem('robotSkinList'))
  {
    //                 0      1     2      3       4     5      6      7
    game.skinList = [true, false, false, false, false, false, false, false];
  }
  else {
    game.skinList = JSON.parse(localStorage.getItem('robotSkinList'));
  }

  game.currentSkin = 'player'

}

function menuUpdate() {

  //Move the background
  game.menuBackground.tilePosition.x -= 2;

}
