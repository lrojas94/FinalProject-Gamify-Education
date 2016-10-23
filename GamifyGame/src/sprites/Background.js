import Phaser from 'phaser'
import {
  scaleFitScreen,
  randomInt
} from '../utils';

export default class extends Phaser.Sprite {

  constructor ({ game, x, y}) {
    x = x || game.world.centerX;
    y = y || game.world.centerY;
    super(game, x, y);
    this.game = game;

    // game.add.existing(this);
    game.stage.addChildAt(this,0);
    this.back = this.addChild(game.make.sprite(0,0, 'bg-back'));
    this.anchor.setTo(0.5);
    this.back.anchor.setTo(0.5);
    // this.anchor.setTo(0.5);
    //
    var numClouds = randomInt(5,15);
    var layers = randomInt(2,4);
    var finalLayers = [];

    for(var l = 0; l < layers;l++) {
      finalLayers.push([]);
    };

    for(var i = 0; i < numClouds;i++) {

      var cloudId = randomInt(1,4);
      var cloudSprite = `cloud${cloudId}.png`;
      var posY = randomInt(-this.back.height/2, 0);
      var posX = randomInt(-this.back.width/2, this.back.width/2);

      var sprite = game.make.sprite(posX,posY,'bg-assets',cloudSprite);
      var spriteLayer = randomInt(0, layers);
      sprite.scale.setTo(0.3+Math.random());
      finalLayers[spriteLayer].push(this.addChild(sprite));

    }

    this.items = finalLayers;
    this.main = this.addChild(game.make.sprite(0,0, 'bg-main'));
    this.main.anchor.setTo(0.5);
    scaleFitScreen(this.main, game);
  }

  update() {
    for(var i = 0; i < this.items.length; i++) {
      var items = this.items[i];
      for(var j = 0; j < items.length; j++) {
        // console.log( (items[j].scale.x * 100)*(this.game.time.elapsed/1000))
        items[j].x -= (25/items[j].scale.x)*(this.game.time.elapsed/1000);
        if(items[j].x + items[j].width < this.main.x - this.main.width/2) {
          var posY = randomInt(-this.back.height/2, 0);
          items[j].x = this.main.x + this.main.width/2 + items[j].width/2;
          items[j].y = posY;
          items[j].scale.setTo(0.3+Math.random());

        }
      }
    }
  }

}
