function Coin(x, y) {

  //Run the sprite code
  Phaser.Sprite.call(this, game, x, y, 'coin');

  //Add our coin to the game
  game.coinGroup.add(this);

  //Set the size of the coin
  this.size = 25;

  //Set the anchor point to the center
  this.anchor.setTo(0.5, 0.5);

}
Coin.prototype = Object.create(Phaser.Sprite.prototype);

Coin.prototype.update = function() {

  //Move the coin
  this.x -= 4;

  //Check if the coin collides with the player
  if(checkCollision(this, player) && !game.isGameOver)
  {
    this.destroy();
    game.coinScore++;
    game.coinSound.play();
  }

  //If the player is magnetic
  if(player.magnetic && !game.isGameOver)
  {
    var distanceX = this.x - player.x;
    var distanceY = this.y - player.y;

    //If the coins are close enough
    if(distanceX < 500)
    {
      //Move the coins
      this.x -= distanceX * 0.1;
      this.y -= distanceY * 0.1;
    }
  }

};

game.coinSpawner = {};

//Spawn coins in a zigzag pattern
game.coinSpawner.zigzag = function(x, y) {

  var coin1 = new Coin(x, y);
  var coin2 = new Coin(x + 50, y - 50);
  var coin3 = new Coin(x + 100, y - 100);
  var coin4 = new Coin(x + 150, y - 50);
  var coin5 = new Coin(x + 200, y);
  var coin6 = new Coin(x + 250, y + 50);
  var coin7 = new Coin(x + 300, y + 100);
  var coin8 = new Coin(x + 350, y + 50);
  var coin9 = new Coin(x + 400, y);

};

//Spawn coins in a diamond pattern
game.coinSpawner.diamond = function(x, y){

  var coin1 = new Coin(x, y)
  var coin2 = new Coin(x + 50, y + 50)
  var coin3 = new Coin(x + 50, y - 50)
  var coin4 = new Coin(x + 100, y + 100)
  var coin5 = new Coin(x + 100, y)
  var coin6 = new Coin(x + 100, y - 100)
  var coin7 = new Coin(x + 150, y + 50)
  var coin8 = new Coin(x + 150, y - 50)
  var coin9 = new Coin(x + 200, y)


};

//Spawn coins in a rectangle
game.coinSpawner.rectangle = function(x, y) {
  var coin1 = new Coin(x, y)
  var coin2 = new Coin(x + 50, y)
  var coin3 = new Coin(x + 100, y)
  var coin4 = new Coin(x + 150, y)
  var coin5 = new Coin(x + 200, y)
  var coin6 = new Coin(x, y + 50)
  var coin7 = new Coin(x + 50, y + 50)
  var coin8 = new Coin(x + 100, y + 50)
  var coin9 = new Coin(x + 150, y + 50)
  var coin10 = new Coin(x+ 200, y + 50)
  var coin11 = new Coin(x, y + 100)
  var coin12 = new Coin(x + 50, y + 100)
  var coin13 = new Coin(x + 100, y + 100)
  var coin14 = new Coin(x + 150, y + 100)
  var coin15 = new Coin(x + 200, y + 100)

};

//Spawqn coins in heart
game.coinSpawner.heart = function(x, y) {
  var coin1 = new Coin(x, y)
  var coin2 = new Coin(x + 50, y)
  var coin3 = new Coin(x + 150, y)
  var coin4 = new Coin(x + 200, y)
  var coin5 = new Coin(x - 50, y + 50)
  var coin6 = new Coin(x + 100, y + 50)
  var coin7 = new Coin(x + 250, y + 50)
  var coin8 = new Coin(x - 50, y + 100)
  var coin9 = new Coin(x + 250, y + 100)
  var coin10 = new Coin(x, y + 150)
  var coin11 = new Coin(x + 200, y + 150)
  var coin12 = new Coin(x + 50, y + 200)
  var coin13 = new Coin(x + 150, y + 200)
  var coin14 = new Coin(x + 100, y + 250)

};
