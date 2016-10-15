import Phaser from 'phaser';
import axios from 'axios';
import {
    centerGameObjects
} from '../utils';
import constants from '../constants';
import ButtonWithText from './../sprites/ButtonWithText';
import * as Fabrique from 'phaser-input';

export default class Menu extends Phaser.State {
    /**
     * Elements:
     * background
     * usernameField => TextField for username input.
     * passwordField => TextField for password input.
     *
     */
    create() {
        let menu = this;

        this.stage.backgroundColor = '#34495e';
        // this.background = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background');
        // this.background.anchor.setTo(0.5, 0.5);

        this.menuTitle = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 150, 'yellow_btn');
        this.menuTitle.anchor.setTo(0.5);
        this.menuTitle.scale.setTo(1.5);

        let style = {
            fill: "#FFFFFF",
            align: "center"
        };
        this.title = this.add.text(this.game.world.centerX, this.game.world.centerY - 150, "Gamify Education", style);
        this.title.anchor.setTo(0.5);

        this.menuPanel = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'panel');
        this.menuPanel.anchor.setTo(0.5);
        this.menuPanel.width = this.menuTitle.width;
        this.menuPanel.height = 250;

        this.menuButtons = this.game.add.group();

        this.playButton = new ButtonWithText({
            game: this.game,
            text: "Play",
            x: this.game.world.centerX,
            y: this.game.world.centerY - 70,
            key: 'ui-green',
            upFrame: 'green_button05.png',
            outFrame: 'green_button02.png',
            overFrame: 'green_button04.png',
            downFrame: 'green_button04.png',
            callback: () => {
                menu.state.start('TopicLoader');
            },
            callbackContext: this
        });

        this.profileButton = new ButtonWithText({
            game: this.game,
            text: "Profile",
            x: 0,
            y: 0,
            key: 'ui-blue',
            upFrame: 'blue_button05.png',
            outFrame: 'blue_button02.png',
            overFrame: 'blue_button04.png',
            downFrame: 'blue_button04.png',
            callback: () => {
                menu.state.start('Menu');
            },
            callbackContext: this
        }).alignTo(this.playButton, Phaser.BOTTOM_CENTER, 0, 16);

        this.settingsButton = new ButtonWithText({
            game: this.game,
            text: "Settings",
            x: 0,
            y: 0,
            key: 'ui-red',
            upFrame: 'red_button02.png',
            outFrame: 'red_button13.png',
            overFrame: 'red_button01.png',
            downFrame: 'red_button01.png',
            callback: () => {
                menu.state.start('Menu');
            },
            callbackContext: this
        }).alignTo(this.profileButton, Phaser.BOTTOM_CENTER, 0, 16);

        this.playButton.anchor.setTo(0.5, 0.5);
        this.profileButton.anchor.setTo(0.5, 0.5);
        this.settingsButton.anchor.setTo(0.5, 0.5);

        this.menuButtons.add(this.playButton);
        this.menuButtons.add(this.profileButton);
        this.menuButtons.add(this.settingsButton);

        this.game.add.existing(this.menuButtons);
    }
}
