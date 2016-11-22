/* globals __DEV__ */
import Phaser from 'phaser';
import axios from 'axios';
import constants from '../constants';
import ButtonWithText from './../sprites/ButtonWithText';
import AchievementSprite from '../sprites/AchievementSprite';
import {
    setResponsiveWidth,
    centerGameObjects
} from '../utils';

export default class Achievement extends Phaser.State {
    init() {
        this.sprites = [];
        this.page = 1;
        this.initAchievements.bind(this);
    }
    preload() {

    }

    loadPage(page) {
        this.loadingText.setText("Loading...");
        this.load.crossOrigin = 'anonymous';
        let achievementLoader = this;


        axios.get(`${constants.API_URL}achievements/`, {
            params: {
                page: page,
                limit: 4
            }
        }).then((response) => {
            const data = response.data;
            if (data.status === 1) {
                // Error on server:
                throw Error(data.message);
            } else {
                // Remove loading text
                achievementLoader.loadingText.setText("");
                achievementLoader.initAchievements(data);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    create() {
        // load bg:
        this.stage.backgroundColor = '#34495e';
        this.achievementsGroup = this.game.add.group();
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
        let titleText = this.add.text(this.game.world.centerX, 150, 'Choose a Achievement');
        titleText.font = 'Lato';
        titleText.fontSize = 40;
        titleText.fontWeight = 100;
        titleText.fill = '#F0F0F0';
        titleText.anchor.setTo(0.5);

        let loadingText = this.add.text(this.game.world.centerX, 300, 'Loading achievements...');
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

    initAchievements(achievements) {
        let keys = this.game.cache.getKeys();
        let achievementImg = this.game.make.sprite(0, 0, 'bordered_panel');
        console.log(keys);
        console.log(achievementImg);
        achievementImg.scale.setTo(0.2);
        let padding = 20;
        let count = achievements.data.length;
        // 5 items per row.
        let rows = 1;
        if (count > 5) {
            rows = Math.ceil(count / 5);
        }
        achievements.data.map((achievement, index) => {
            let y = null;
            let row = 0;

            if (rows !== 1) {
                // need to rows.
                row = Math.floor((index + 1) / 5);
            }

            let achievementSprite = new AchievementSprite({
                game: this.game,
                x: index * (achievementImg.width + padding),
                y: row * (achievementImg.height + padding),
                achievement
            });
            achievementSprite.anchor.setTo(0.5);

            this.achievementsGroup.add(achievementSprite);
            // this.sprites.push(achievementSprite);
        });

        this.achievementsGroup.x = this.game.world.centerX - this.achievementsGroup.width / 2;
        this.achievementsGroup.y = this.game.world.centerY;

    }

}
