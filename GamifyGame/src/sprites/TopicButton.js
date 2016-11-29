import Phaser from 'phaser';
import * as _ from 'lodash';

export default class TopicButton extends Phaser.Button {

    constructor({game, x, y, asset, callback, callbackContext, title, description, titleStyle, extraData}) {
        super(game, x, y, null, callback, callbackContext);
        this.background = this.addChild(this.game.make.sprite(0, 0, asset || 'bordered_panel'));
        this.background.anchor.setTo(0.5);
        this.background.scale.setTo(0.2);

        let topic = extraData.topic;

        // stars;
        let starCount = Math.ceil(3 * (parseInt(topic.correctAnswers) / parseInt(topic.totalAnswers)));
        this.stars = this.game.make.group();
        this.addChild(this.stars);
        let starImage = this.game.make.sprite(0,0,'star');
        starImage.scale.setTo(0.05);
        let padding = 20;

        for(var i = 0; i < starCount; i++) {
            // add stars:
            let star = this.game.make.sprite(i * (starImage.width + 20),0,'star');
            star.scale.setTo(0.05);
            star.anchor.setTo(0.5);
            this.stars.add(star);
        }
        this.game = game;
        this.anchor.setTo(0.5);

        var textOpts = {
            wordWrap: true,
            wordWrapWidth: this.background.width - 80,
            font: 'Lato',
            fontSize: 20,
            align: 'center',
            fill: '#ffffff'
        };
        this.titleText = this.addChild(this.game.make.text(0, 0, title, _.merge(textOpts, {
            fontWeight: 700,
            lineSpacing: 100,
            stroke: "#86969A",
            strokeThickness: 3
        }, titleStyle)));

        if(description) {
            this.descText = this.addChild(this.game.make.text(0, this.titleText.height/2 + 5, description, _.merge(textOpts, {
                fontWeight: 400,
                fontSize: 17,
                lineSpacing: 100
            })));
            this.descText.anchor.setTo(0.5);
            this.descText.anchor.y = 0;
        }
        this.titleText.anchor.setTo(0.5);
        this.stars.y = this.titleText.y - this.stars.height;
        this.stars.x = -this.stars.width/2 + starImage.width / 2;
        this.extraData = extraData || {};
    }

    // this may come in handy for a few things xD...
    getExtraData() {
        return this.extraData;
    }

}
