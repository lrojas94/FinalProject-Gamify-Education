/* globals __DEV__ */
import Phaser from 'phaser';
import axios from 'axios';
import constants from '../constants';
import ButtonWithText from './../sprites/ButtonWithText';
import SolutionButton from '../sprites/SolutionButton';
import {
    setResponsiveWidth,
    centerGameObjects
} from '../utils';

export default class Topic extends Phaser.State {
    init(topics) {
        this.topics = topics;
    }
    preload() {}

    create() {
        // load bg:
        this.stage.backgroundColor = '#34495e';
        // this.background = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background');
        // this.background.anchor.setTo(0.5, 0.5);

        this.closeButton = new ButtonWithText({
            game: this.game,
            text: "",
            x: 32,
            y: 32,
            key: 'ui-red',
            upFrame: 'red_boxCross.png',
            outFrame: 'red_boxCross.png',
            overFrame: 'red_boxCross.png',
            downFrame: 'red_boxCross.png',
            callback: () => {
                this.state.start('Menu');
            },
            callbackContext: this
        });
        this.closeButton.anchor.setTo(0.5);

        // Load title text.
        let titleText = this.add.text(this.game.world.centerX, 150, 'Choose a Topic');
        titleText.font = 'Lato';
        titleText.fontSize = 40;
        titleText.fontWeight = 100;
        titleText.fill = '#F0F0F0';
        titleText.anchor.setTo(0.5);

        // Topics:
        let buttonImg = this.game.cache.getFrameByName('ui-grey', 'grey_button00.png');
        let padding = 5;
        this.topicButton = [];
        this.topicSelected = false;
        this.topics.data.map((topic, index) => {

            let button = new ButtonWithText({
                game: this.game,
                text: topic.name,
                x: this.game.world.centerX,
                y: this.game.world.centerY + index * (buttonImg.height + padding),
                key: 'ui-grey',
                upFrame: 'grey_button04.png',
                outFrame: 'grey_button01.png',
                overFrame: 'grey_button03.png',
                downFrame: 'grey_button02.png',
                style: { font: "20px Arial", fill: "#34495e", align: "center" },
                callback: () => {
                    // Select Topic:
                    if (this.topicSelected) {
                        return;
                    }

                    this.topicSelected = true;
                    this.state.start('ProblemLoader');
                },
                callbackContext: this
            });
            button.anchor.setTo(0.5);

            this.game.add.existing(button);
            this.topicButton.push(button);
        });

        this.game.add.existing(this.closeButton);
    }

}
