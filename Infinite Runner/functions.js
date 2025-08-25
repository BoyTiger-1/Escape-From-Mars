//Spawn a random enemy
function spawnEnemy() {

  var x = 1000;
  var y = game.rnd.between(50, 670);
  var speed = game.rnd.between(4, 10);
  var image = 'enemy' + game.rnd.between(1, 3);
  var enemyType = game.rnd.between(1, 100);

  //Spawn enemies
  if(enemyType < 50)
  {
    var enemy = new Enemy(x, y, speed, image);
  }
   else if(enemyType < 80)
  {
    var zig = new ZigZagger(x, y, speed)
  }
   else if(enemyType < 90)
  {
    var chase = new Chaser(x, y, speed);
  }
  else
  {
    var speedey = new Speeder(y);
  }

    //Set a timer
    var time;

    if(game.score < 15)
    {
      time = 3000;
    }
    else if(game.score < 30)
    {
      time = 2500;
    }
    else if(game.score < 45)
    {
      time = 2000;
    }
    else if(game.score < 60)
    {
      time = 1500;
    }
    else {
      time = 1000;
    }

    game.time.events.add(time, spawnEnemy, this);

}



//Checks if two objects have collided
function checkCollision(object1, object2) {

  var distance = Phaser.Math.distance(object1.x, object1.y, object2.x, object2.y);

  if(distance <= object1.size + object2.size)
  {
      return true;
  }
  else {
      return false;
  }

}

//End the game and show game over text
function gameOver() {

  //Turn the background red
  game.background.tint = 0xFF0000;

  //Destroy the player
  player.destroy();

  //Make the game over text visible
  game.gameOverText.visible = true;

  //Tell the game this it is over
  game.isGameOver = true;

  //Make the shop button visible
  game.shopButton.visible = true;
  game.shopButton.text.visible = true;

  //Set the high score
  if(game.score > game.highScore)
  {
    game.highScore = game.score;
    game.highScoreText.text = 'Best ' + game.highScore;
  }

  //Play our game over sound
  game.loseSound.play();

  //Save the game data
  saveGame();

}

//Restart the game!
function restart() {

  //Untint the screen
  game.background.tint = 0xFFFFFF

  //Make the player
  makePlayer();

  //Remove the game over text
  game.gameOverText.visible = false;

  //Remove the shop button
  game.shopButton.visible = false;
  game.shopButton.text.visible = false;

  //Tell the game it's not over
  game.isGameOver = false;

  //Reset the score to zero
  game.score = 0;

  //Destroy all enemies
  while(game.enemyGroup.length > 0)
  {
    game.enemyGroup.getTop().destroy();
  }

  //Destroy all coins
  while(game.coinGroup.length > 0)
  {
    game.coinGroup.getTop().destroy();
  }

}

//Increase the score
function increaseScore() {

  if(!game.isGameOver)
  {
    //Increase the score
    game.score++;
  }

  //Start a new timer to run this function
  game.time.events.add(1000, increaseScore, this);

}

//Spawn a random coin pattern
function spawnCoins() {

  //Create a random number
  var randomNumber = game.rnd.between(1, 4);
  //Create a random y value
  var randomY = game.rnd.between(150, 550);

  //Spawn the zigzag pattern
  if(randomNumber === 1)
  {
    game.coinSpawner.zigzag(1000, randomY);
  }
  //Spawn the diamond pattern
  if(randomNumber === 2)
  {
    game.coinSpawner.diamond(1000, randomY);
  }
  //Spawn the rectangle pattern
  if(randomNumber === 3)
  {
    game.coinSpawner.rectangle(1000, randomY);
  }
  //Spawn the heart pattern
  if(randomNumber === 4)
  {
    game.coinSpawner.heart(1000, randomY);
  }

  //Start a timer to restart this function
  game.time.events.add(5000, spawnCoins, this);

}

//Spawn a powerup
function spawnPowerup() {

  //Create random number
  var randY = game.rnd.between(50,590);
  var rndPowerup = game.rnd.between(1, 3)

  //Spawn the powerup
  if(rndPowerup === 1)
  {
    var shield = new Shield(1000, randY)
  }
  if(rndPowerup === 2)
  {
    var cnMagnet = new CoinMagnet(1000, randY)
  }
  if(rndPowerup === 3)
  {
    var blast = new Boom(1000, randY)
  }

  //Create a random variable for time
  var time = game.rnd.between(10000, 15000);

  //Start a new timer
  game.time.events.add(time, spawnPowerup, this);

}

function saveGame() {

  localStorage.setItem('robotHighScore', game.highScore);
  localStorage.setItem('robotCoinScore', game.coinScore);
  localStorage.setItem('robotSkinList', JSON.stringify(game.skinList));

}
