import Phaser from 'phaser';
import * as _ from 'lodash';


export default class AchievementSprite extends Phaser.Button {

  constructor ({ game, x, y, asset, achievement }) {
    super(game, x, y, null);
    this.background = this.addChild(this.game.make.sprite(0,0,asset || 'panel'));
    this.background.anchor.setTo(0.5);
    this.background.scale.setTo(0.2);

    this.achievement = achievement;
    this.game = game;
    this.anchor.setTo(0.5);
    //create solution sprite:
    // Add achievement text:
    var textOpts = {
      wordWrap : true,
      wordWrapWidth: this.background.width - 20,
      font: 'Lato',
      fontSize: 20,
      align: 'center',
    }
    this.achievementTitle = this.addChild(this.game.make.text(0,0, this.achievement.name, _.merge({ fontWeight: 700 }, textOpts)));
    this.achievementDesc = this.addChild(this.game.make.text(0,this.achievementTitle.height + 10, this.achievement.description, _.merge({ fontWeight: 400, fontSize: 15 }, textOpts)));
    this.achievementTitle.anchor.setTo(0.5);
    this.achievementDesc.anchor.setTo(0.5);
  }

}
