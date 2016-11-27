import Phaser from 'phaser';
import * as _ from 'lodash';

export default class PanelButton extends Phaser.Button {

    constructor({game, x, y, asset, callback, callbackContext, title, description, titleStyle, extraData}) {
        super(game, x, y, null, callback, callbackContext);
        this.background = this.addChild(this.game.make.sprite(0, 0, asset || 'bordered_panel'));
        this.background.anchor.setTo(0.5);
        this.background.scale.setTo(0.2);

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
            lineSpacing: 20,
            stroke: "#86969A",
            strokeThickness: 3
        }, titleStyle)));

        if(description) {
            this.descText = this.addChild(this.game.make.text(0, this.titleText.height/2 + 5, description, _.merge(textOpts, {
                fontWeight: 400,
                fontSize: 17,
                lineSpacing: 10
            })));
            this.descText.anchor.setTo(0.5);
            this.descText.anchor.y = 0;
        }
        this.titleText.anchor.setTo(0.5);
        this.extraData = extraData || {};
    }

    // this may come in handy for a few things xD...
    getExtraData() {
        return this.extraData;
    }

}
