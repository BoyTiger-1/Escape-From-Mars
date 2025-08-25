/*#######################################################################
                           SHIELD POWERUP
########################################################################*/
function Shield(x, y) {

  //Run the sprite
  Phaser.Sprite.call(this, game, x, y, 'shield');

  //Add shield to game
  game.add.existing(this);

  //Set the size
  this.size = 30;

  //Set the anchor point
  this.anchor.setTo(0.5, 0.5);

}
Shield.prototype = Object.create(Phaser.Sprite.prototype);

Shield.prototype.update = function() {

  //Move the shield
  this.x -= 4

  //Collide with the player
  if(checkCollision(this, player))
  {
    //Run the player's shield function
    player.shield();
    //Destroy this powerup
    this.destroy();
  }

};

/*#######################################################################
                           COIN MAGNET
########################################################################*/
function CoinMagnet(x, y) {

  //Run the sprite code
  Phaser.Sprite.call(this, game, x, y, 'magnet');

  //Add our sprite to the game
  game.add.existing(this);

  //Set the collison size
  this.size = 30;

  //Set the anchor point
  this.anchor.setTo(0.5, 0.5);

}
CoinMagnet.prototype = Object.create(Phaser.Sprite.prototype);

CoinMagnet.prototype.update = function() {

  //Move the magnet
  this.x -= 4

  //Check collsion
  if(checkCollision(this, player))
  {
    this.destroy();
    player.magnet();
  }

};

/*#######################################################################
                                BOOM
########################################################################*/
function Boom(x, y) {

  //Run the sprite code
  Phaser.Sprite.call(this, game, x, y, 'boom');

  //Add to the game
  game.add.existing(this);

  //Set the collison size
  this.size = 30;

  //Set the anchor point
  this.anchor.setTo(0.5, 0.5);

}
Boom.prototype = Object.create(Phaser.Sprite.prototype);

Boom.prototype.update = function() {

  //Make the boom move
  this.x -= 4

  //Check for collision
  if(checkCollision(this, player))
  {
    //Destroy self
    this.destroy();

    this.destroyEnemies();
  }

};

Boom.prototype.destroyEnemies = function() {

  //As long as there are still enemies in the group
  while(game.enemyGroup.length > 0)
  {
    //Create an explosion
    for(var i = 0; i < 50; i++)
    {
      //Spawn a particle
      var particle = new ExplosionParticle(game.enemyGroup.getTop().x, game.enemyGroup.getTop().y, 'explosion', true);
    }
    //Shake the screen
    var srcnShake = new AutoScreenShake(45, 200, true);

    //Destroy the top enemy from the group
    game.enemyGroup.getTop().destroy();

    //Play our blow up sound
    game.blowUpSound.play();

  }

};
