import Phaser from 'phaser';

export default class SolutionButton extends Phaser.Sprite {

  constructor ({ game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, solution }) {
    super(game, x, y, null);
    this.button = new Phaser.Button(game, 0, 0, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);
    this.addChild(this.button);
    this.button.anchor.setTo(0.5);

    this.solution = solution;
    this.game = game;

    //create solution sprite:
    this.solutionSprite = this.addChild(this.game.make.sprite(0,0,`s${this.solution.id}`));
    this.solutionSprite.anchor.setTo(0.5);
    this.anchor.setTo(0.5);
  }

  setBGSize(size) {
      this.button.width = size.width;
      this.button.height = size.height;
  }

  solutionWidth() {
      return this.solutionSprite.width;
  }
  solutionHeight() {
      return this.solutionSprite.height;
  }

  setX(x) {
      this.x = x;
  }

}
