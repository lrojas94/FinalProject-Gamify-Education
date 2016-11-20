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

export default class Topic extends Phaser.State {
    init() {
        this.topicSelected = false;
        this.page = 1;
        this.initTopics.bind(this);
    }
    preload() {

    }

    loadPage(page) {
        this.loadingText.setText("Loading...");
        this.load.crossOrigin = 'anonymous';
        let topicLoader = this;

        axios.get(`${constants.API_URL}topics/`, {
            page: page,
            limit: 10
        }).then((response) => {
            const data = response.data;
            if (data.status === 1) {
                // Error on server:
                throw Error(data.message);
            } else {
                // Remove loading text
                topicLoader.loadingText.setText("");
                topicLoader.initTopics(data);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    create() {
        // load bg:
        this.stage.backgroundColor = '#34495e';
        this.topicsGroup = this.game.add.group();
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

        let loadingText = this.add.text(this.game.world.centerX, 300, 'Loading topics...');
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

    initTopics(topics) {
        let keys = this.game.cache.getKeys();
        let topicImg = this.game.make.sprite(0, 0, 'panel');
        topicImg.scale.setTo(0.2);
        let padding = 20;
        let count = topics.data.length;

        // 5 items per row.
        let rows = 1;
        if (count > 5) {
            rows = Math.ceil(count / 5);
        }

        topics.data.map((topic, index) => {

            let y = null;
            let row = 0;

            if (row !== 1) {
                row = Math.floor((index + 1) / 5);
            }

            let panelButton = new PanelButton({
                game: this.game,
                x: index * (topicImg.width + padding),
                y: row * (topicImg.height + padding),
                title: topic.name,
                description: topic.description,
                callback: () => {
                    // Select Topic:
                    if (this.topicSelected) {
                        return;
                    }

                    this.topicSelected = true;
                    this.state.start('Difficulties');
                },
                callbackContext: this
            });
            panelButton.anchor.setTo(0.5);

            this.topicsGroup.add(panelButton);
        });

        this.topicsGroup.x = this.game.world.centerX - this.topicsGroup.width / 2;
        this.topicsGroup.y = this.game.world.centerY;

    }

}
