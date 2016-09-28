import Phaser from 'phaser';

export default class ButtonWithText extends Phaser.Button {

  constructor ({ game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, text, style }) {
    super(game, x, y, key, callback, callbackContext, downFrame, outFrame,overFrame, upFrame);
    style = style || { font: "20px Arial", fill: "#ffffff", align: "center" };

    this.game = game;
    this.anchor.setTo(0.5);

    //create solution sprite:
    this.textSprite = this.addChild(this.game.make.text(0, 0, text, style));
    this.textSprite.anchor.setTo(0.5);
  }

  setText(text) {
    this.textSprite.setText(text);
  }

}
