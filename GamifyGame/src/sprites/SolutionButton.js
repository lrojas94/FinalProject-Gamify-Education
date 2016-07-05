import Phaser from 'phaser';

export default class SolutionButton extends Phaser.Button {

  constructor ({ game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, solution }) {
    super(game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);

    this.solution = solution;
    this.game = game;
    this.anchor.setTo(0.5);

    //create solution sprite:
    this.solutionSprite = this.addChild(this.game.make.sprite(0,0,`s${this.solution.id}`));
    this.solutionSprite.anchor.setTo(0.5);
  }

}
