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

export default class Difficulty extends Phaser.State {
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
        let titleText = this.add.text(this.game.world.centerX, 150, 'Select the number of problems you\'d like to work with', {
            font: 'Lato',
            fontSize: 40,
            fontWeight: 400,
            fill: '#FFCC00',
            strokeThickness: 2,
            stroke: '#C69F00'
        });
        titleText.anchor.setTo(0.5);
        this.initOpts([5,10,20])
        this.game.add.existing(this.closeButton);
    }

    initOpts(opts) {
        let panelTemplate = this.game.make.sprite(0, 0, 'bordered_panel');
        panelTemplate.scale.setTo(0.2);
        let padding = 20;

        opts.map((opt, index) => {
            console.log(opt);
            let panelButton = new PanelButton({
                game: this.game,
                x: index * (panelTemplate.width + padding),
                y: 0,
                title: opt,
                titleStyle: {
                    fontSize: 100,
                },
                callback: () => {
                    this.optSelected = true;
                    this.game.problemCount = opt;
                    this.game.remainingProblems = opt;
                    this.state.start('ProblemLoader');
                },
                callbackContext: this,
            });
            panelButton.anchor.setTo(0.5);
            this.optionGroup.add(panelButton);
        });

        this.optionGroup.x = this.game.world.centerX - this.optionGroup.width / 2;
        this.optionGroup.y = this.game.world.centerY;
    }

}
