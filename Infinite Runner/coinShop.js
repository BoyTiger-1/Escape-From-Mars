function shopPreload() {

}

function shopCreate() {

  //Add a shop background
  var background = game.add.sprite(0, 0, 'shopBackground');

  //Add a shop title
  var titleText = game.add.bitmapText(game.world.centerX, 100, 'font', 'COIN SHOP');
  titleText.anchor.setTo(0.5, 0.5);
  titleText.scale.setTo(2.5, 2.5);

  //Add a back button
  var backButton = game.add.button(25, 25, 'backButton',
    function() {
      //Go back to the game
      game.state.start('game');
    }
  );

  //Add the coin amount
  game.coinScoreText = game.add.bitmapText(960-25, 25, 'font', 'Zoop Zap zipitty');
  game.coinScoreText.anchor.setTo(1, 0);

  //Create the skins
  var robot = new Skin(200, 210, 'player', 'ROBOT', 0, 0);
  var chimp = new Skin(400, 210, 'chimp', 'MONKEY', 10, 1);
  var boyAstronaut = new Skin(625, 210, 'astronaut1', 'ASTRONAUT 1', 50, 2);
  var girlAstronaut = new Skin(200, 360, 'astronaut2', 'ASTRONAUT 2', 50, 3);
  var pirate = new Skin(490, 360, 'pirate', 'CAPTAIN LAVA', 100, 4);
  var superbot = new Skin(750, 360, 'robot', 'SUPERBOT', 500, 5);
  var femaleSuperhero = new Skin(200, 525, 'supergirl', 'SUPERGIRL', 1000, 6);
  var maleSuperhero = new Skin(450, 525, 'superman', 'SUPERMAN', 1000, 7);

}

function shopUpdate() {

  //Update the coin score text
  game.coinScoreText.text = 'Coins ' + game.coinScore.toString();

}

/*#######################################################################
                            SKIN CONSTRUCTOR
########################################################################*/
function Skin(x, y, image, name, price, id) {

  //Run the sprite code
  Phaser.Sprite.call(this, game, x, y, image);
  //Add the spite to the game
  game.add.existing(this);
  //Set the anchor point
  this.anchor.setTo(0.5, 0.5);

  //Set the name of the constructor
  this.nameText = game.add.bitmapText(this.x, this.y + 75, 'font', name);
  this.nameText.anchor.setTo(0.5, 0.5);
  this.nameText.scale.setTo(0.75, 0.75);

  //Set the price
  this.price = price;

  //Figure out if it's purchased;
  this.purchased = game.skinList[id];

  //If the skin has not been purchased
  if(!this.purchased)
  {
    //Create the lock icon
    this.lock = game.add.sprite(this.x, this.y, 'lock');
    this.lock.anchor.setTo(0.5, 0.5);
    //Add the price text
    this.priceText = game.add.bitmapText(this.x, this.y + 100, 'font', this.price.toString());
    this.priceText.anchor.setTo(0.5, 0.5);
    this.priceText.scale.setTo(0.75, 0.75);
  }

  //Handle input
  this.inputEnabled = true;
  this.events.onInputDown.add(this.click, this);

  //Create image variable
  this.skinImage = image;
  this.id = id;

}
Skin.prototype = Object.create(Phaser.Sprite.prototype);

Skin.prototype.click = function() {

  if(this.purchased)
  {
    game.currentSkin = this.skinImage;
  }
  // the skin is not yet purchased
  else {
    if(game.coinScore  >= this.price)
    {
      //Subtract the coins
      game.coinScore -= this.price;
      //Destroy the lock icon
      this.lock.destroy();
      //Destroy the price text
      this.priceText.destroy();
      //Set the purchased variable to true
      this.purchased = true;
      //Update the skin list
      game.skinList[this.id] = true;
      //Save the game
      saveGame();
    }
  }

};
