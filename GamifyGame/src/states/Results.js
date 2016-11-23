/* globals __DEV__ */
import Phaser from 'phaser';
import axios from 'axios';
import constants from '../constants';
import ButtonWithText from './../sprites/ButtonWithText';
import PanelButton from '../sprites/PanelButton';
import {
    setResponsiveWidth,
    centerGameObjects
} from '../utils';

export default class Results extends Phaser.State {
    init() {
    }

    preload() {

    }

    create() {
        // load bg:
        this.stage.backgroundColor = '#34495e';
        this.optionGroup = this.game.add.group();
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
        let titleText = this.add.text(this.game.world.centerX, 130, 'You\'re done! Check out your results!', {
            font: 'Lato',
            fontSize: 40,
            fontWeight: 400,
            fill: '#FFCC00',
            strokeThickness: 2,
            stroke: '#C69F00'
        });
        titleText.anchor.setTo(0.5);

        // Stars:
        this.stars = this.game.add.group();
        let starImage = this.game.make.sprite(0,0,'star');
        starImage.scale.setTo(0.2);
        let padding = 20;
        // start count:
        var starCount = Math.round(3 * (this.game.correctAnswers / this.game.problemCount));

        for(var i = 0; i < starCount; i++) {
            // add stars:
            let star = this.add.sprite(i * (starImage.width + 20),0,'star');
            star.scale.setTo(0.2);
            star.anchor.setTo(0.5);
            this.stars.add(star);
        }
        // messages:
        var msg = '';
        switch (starCount) {
            case 3:
                msg = "Excellent! You're doing really good! Keep it up!"
            break;
            case 2:
                msg = "Great! There's still work to do, but keep at it!"
            break;
            case 1:
                msg = "Not bad! Keep at this and you'll soon be getting a lot more"
            break;
            case 0:
                msg = "It's alright! You didn't get any stars now, but you're working towards it!"
            break;
            default:
        }

        msg = `${msg}\nCorrect Problems: ${this.game.correctAnswers} / ${this.game.problemCount}`;

        this.stars.x = this.game.world.centerX - this.stars.width / 2 + starImage.width/2;
        this.stars.y = this.game.world.centerY - 20;

        let panel = this.add.sprite(this.game.world.centerX, 0, 'panel');
        panel.width = this.game.world.width - 120;
        panel.anchor.x = 0.5;
        panel.y = this.stars.y + this.stars.height / 1.5;

        let messageText = this.add.text(0,0, msg, {
            font: 'Lato',
            fontSize: 40,
            fontWeight: 400,
            fill: '#FFCC00',
            strokeThickness: 2,
            stroke: '#C69F00',
            align: 'center',
            wordWrapWidth: panel.width - 20
        });

        messageText.anchor.x = 0.5;
        messageText.y = panel.y + 60;
        messageText.x = panel.x;
        this.game.add.existing(this.closeButton);

        // Add the button:
        this.loginButton = new ButtonWithText({
            game: this.game,
            text: "Go to Main Menu",
            x: this.game.world.centerX,
            y: messageText.y + messageText.height + 30,
            key: 'ui-green',
            upFrame: 'green_button05.png',
            outFrame: 'green_button02.png',
            overFrame: 'green_button04.png',
            downFrame: 'green_button04.png',
            callback: () => {
                this.state.start('Menu');
            },
            callbackContext: this
        });

        this.game.add.existing(this.loginButton);


    }

}
