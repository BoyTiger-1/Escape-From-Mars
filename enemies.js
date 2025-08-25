/*#######################################################################
                           REGULAR ENEMY
########################################################################*/
function Enemy(x, y, speed, image) {

//Run the Sprite code
  Phaser.Sprite.call(this, game, x, y, image);

//Add are object to the game
game.enemyGroup.add(this);

//Set ths size for collision
this.size = 40;

//Center the anchor point
this.anchor.setTo(0.5, 0.5);

//Add and play an animation
this.animations.add('walk');
this.animations.play('walk', 5, true);

//Set the enemy's speed
this.speed = speed;

}
//Tell the enemy to inherit from the sprite
Enemy.prototype = Object.create(Phaser.Sprite.prototype);

Enemy.prototype.update = function() {

  this.x -= this.speed;

  //If we're off the screen
  if(this.x < -150)
  {
     this.destroy();
  }

  //If we hit the player
  if(checkCollision(this, player) && !game.isGameOver)
  {
    //If the player is shielded
    if(player.safe)
    {
      //Create an explosion
      for(var i = 0; i < 50; i++)
      {
        //Spawn a particle
        var particle = new ExplosionParticle(this.x, this.y, 'explosion', true);
      }
      //Shake the screen
      var srcnShake = new AutoScreenShake(45, 80, true);

      player.stopShield();
      this.destroy();
      game.blowUpSound.play();
    }
    //End the game
    else {
      gameOver();
    }
  }

};

/*#######################################################################
                           ZIGZAG ENEMY
########################################################################*/
function ZigZagger(x, y, speed) {

  //Run the regular enemy code
  Enemy.call(this, x, y, speed, 'zigZagEnemy');

}
ZigZagger.prototype = Object.create(Enemy.prototype);

//ZigZagger update function
ZigZagger.prototype.update = function() {

  //Run the regular enemy function
  Enemy.prototype.update.call(this);

  //Move up and down
  this.y = Math.sin(this.x * 0.01) * 225 + 300;

};

/*#######################################################################
                           CHASER ENEMY
########################################################################*/
function Chaser(x, y, speed) {

  //Run the regualr enemy code
  Enemy.call(this, x, y, speed, 'chaserEnemy');

  //Create current speed variable
  this.ySpeed = 0;
  //Create maximum speed variable
  this.maxSpeed = 5;
  //Create acceleration variable
  this.acc = 0.1;

}
Chaser.prototype = Object.create(Enemy.prototype);

Chaser.prototype.update = function() {

  //Run the regular enemy function
  Enemy.prototype.update.call(this);

  //If we're above the player
  if(this.y < player.y)
  {
    //If not moving a maximum speed
    if(this.ySpeed < this.maxSpeed)
    {
      //Accelerate down
      this.ySpeed += this.acc;
    }
  }
  // If we're below the player
  else {
    if(this.ySpeed > -this.maxSpeed)
    {
      //Accelerate up
      this.ySpeed -= this.acc;
    }
  }
  //Move the enemy based on its speed
  this.y += this.ySpeed

};

/*#######################################################################
                           SPEEDER ENEMY
########################################################################*/
function Speeder(y) {

  //Run the regular enemy code
  Enemy.call(this, 3000, y, 30, 'speederEnemy');

  //Create a flash warning sign
  this.warning = game.add.sprite(880, y, 'warning');
  this.warning.anchor.setTo(0.5, 0.5);
  this.warning.flash = function() {

    //If it's visible
    if(this.visible)
    {
      this.visible = false;
    }
    //If not visible
    else {
      this.visible = true;
    }

    //Add a new timer
    game.time.events.add(200, this.flash, this)

  };
  this.warning.flash();

  //Set a timer to destroy the warning sign
  game.time.events.add(2000,
    function() {
      this.warning.destroy();
    },
    this
  );

}
Speeder.prototype = Object.create(Enemy.prototype);

Speeder.prototype.update = function() {

  //Run the regular enemy function
  Enemy.prototype.update.call(this);

  //If we're on the screen
  if(this.x < 900)
  {
    //Destroy the warning sign
    this.warning.destroy();
  }

};
