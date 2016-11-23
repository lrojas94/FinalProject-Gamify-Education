import Phaser from 'phaser';
import * as _ from 'lodash';


export default class AchievementSprite extends Phaser.Button {

    constructor({game, x, y, asset, achievement}) {
        super(game, x, y, null);
        this.background = this.addChild(this.game.make.sprite(0, 0, asset || 'bordered_panel'));
        this.background.anchor.setTo(0.5);
        this.background.scale.setTo(0.2);

        this.achievement = achievement;
        this.game = game;
        this.anchor.setTo(0.5);
        //create solution sprite:
        // Add achievement text:
        var textOpts = {
            wordWrap: true,
            wordWrapWidth: this.background.width - 80,
            font: 'Lato',
            fontSize: 20,
            align: 'center',
            fill: '#ffffff'
        };
        this.medal = this.addChild(this.game.make.sprite(0,0,'medal'));
        this.medal.scale.setTo(1.2);
        this.achievementTitle = this.addChild(this.game.make.text(0, -10, this.achievement.name, _.merge(textOpts, {
            fontWeight: 700,
            stroke: "#86969A",
            strokeThickness: 3
        })));

        var completedBy = _.filter(this.achievement.completedBy, (u) => {
            return u.id === this.game.user.id;
        });

        console.log(completedBy);

        if(completedBy.length !== 0) {
            // means that the achievement was NOT copleted by user
            this.medal.alpha = 0.5;
        }
        this.medal.y -= this.medal.height/2 - 35;
        this.achievementDesc = this.addChild(this.game.make.text(0, this.achievementTitle.height + 10, this.achievement.description,
            _.merge(textOpts, {
            fontWeight: 400,
            fontSize: 15
        })));

        this.medal.anchor.x = 0.5;
        this.medal.anchor.y = 1;
        this.achievementTitle.anchor.x = 0.5;
        this.achievementTitle.anchor.y = 0;
        this.achievementDesc.anchor.setTo(0.5);
    }

}
