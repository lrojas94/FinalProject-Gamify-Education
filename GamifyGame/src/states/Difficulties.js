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
        this.difficultySelected = false;
        this.page = 1;
        this.initDifficulties.bind(this);
    }
    preload() {

    }

    loadPage(page) {
        this.loadingText.setText("Loading...");
        this.load.crossOrigin = 'anonymous';
        let difficultyLoader = this;

        axios.get(`${constants.API_URL}difficultys/`, {
            page: page,
            limit: 10
        }).then((response) => {
            const data = response.data;
            if (data.status === 1) {
                // Error on server:
                throw Error(data.message);
            } else {
                // Remove loading text
                difficultyLoader.loadingText.setText("");
                difficultyLoader.initDifficulties(data);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    create() {
        // load bg:
        this.stage.backgroundColor = '#34495e';
        this.difficultiesGroup = this.game.add.group();
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
        let titleText = this.add.text(this.game.world.centerX, 150, 'Choose a Difficulty');
        titleText.font = 'Lato';
        titleText.fontSize = 40;
        titleText.fontWeight = 100;
        titleText.fill = '#F0F0F0';
        titleText.anchor.setTo(0.5);

        let loadingText = this.add.text(this.game.world.centerX, 300, 'Loading difficultys...');
        loadingText.font = 'Lato';
        loadingText.fontSize = 40;
        loadingText.fontWeight = 100;
        loadingText.fill = '#F0F0F0';
        loadingText.anchor.setTo(0.5);

        this.loadingText = loadingText;
        this.loadPage(this.page || 1);
        // Load from API

        this.game.add.existing(this.closeButton);
    }

    initDifficulties(difficultys) {
        let keys = this.game.cache.getKeys();
        let difficultyImg = this.game.make.sprite(0, 0, 'panel');
        difficultyImg.scale.setTo(0.2);
        let padding = 20;
        let count = difficultys.data.length;

        // 5 items per row.
        let rows = 1;
        if (count > 5) {
            rows = Math.ceil(count / 5);
        }

        difficultys.data.map((difficulty, index) => {

            let y = null;
            let row = 0;

            if (row !== 1) {
                row = Math.floor((index + 1) / 5);
            }

            let panelButton = new PanelButton({
                game: this.game,
                x: index * (difficultyImg.width + padding),
                y: row * (difficultyImg.height + padding),
                title: difficulty.name,
                description: '',
                callback: () => {
                    // Select Difficulty:
                    if (this.difficultySelected) {
                        return;
                    }

                    this.difficultySelected = true;
                    this.state.start('ProblemLoader');
                },
                callbackContext: this
            });
            panelButton.anchor.setTo(0.5);

            this.difficultiesGroup.add(panelButton);
        });

        this.difficultiesGroup.x = this.game.world.centerX - this.difficultiesGroup.width / 2;
        this.difficultiesGroup.y = this.game.world.centerY;
    }

}
