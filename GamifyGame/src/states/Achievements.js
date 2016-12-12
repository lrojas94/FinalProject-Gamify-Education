/* globals __DEV__ */
import Phaser from 'phaser';
import axios from 'axios';
import constants from '../constants';
import ButtonWithText from './../sprites/ButtonWithText';
import AchievementSprite from '../sprites/AchievementSprite';
import AchievementUnlocked from '../sprites/AchievementUnlocked';
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
                data.currentPage=data.page;
                this.page = data.currentPage;
                console.log(this.page);

                if(data.nextPage <= data.currentPage){
                    this.next.alpha=0;
                }
                else{
                    this.next.alpha=1;
                }
                if(data.currentPage <= 1) {
                    this.prev.alpha=0;
                }
                else{
                    this.prev.alpha=1;
                }
                achievementLoader.loadingText.setText("");
                achievementLoader.initAchievements(data);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    nextPage() {
        this.page = this.page+1;
        return this.loadPage(this.page);
    }

    prevPage() {
        if(this.page<=1){
            return;
        }
        this.page=this.page-1;
        return this.loadPage(this.page);
    }

    create() {
        // load bg:
        this.stage.backgroundColor = '#34495e';
        this.achievementsGroup = this.game.add.group();
        // this.background = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background');
        // this.background.anchor.setTo(0.5, 0.5);
        this.next = game.add.button(game.world.width - 5, game.world.centerY, 'next', this.nextPage, this, 2, 1, 0);
        this.next.anchor.y = 0.5;
        this.next.anchor.x = 1;
        this.next.scale.setTo(0.5);
        this.next.alpha=0;

        this.prev = game.add.button(5, game.world.centerY, 'prev', this.prevPage, this, 2, 1, 0);
        this.prev.anchor.y = 0.5;
        this.prev.anchor.x = 0;
        this.prev.scale.setTo(0.5);
        this.prev.alpha=0;


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
        let titleText = this.add.text(this.game.world.centerX, 120, 'Available Achievements',{
            font: 'Lato',
            fontSize: 40,
            fontWeight: 400,
            fill: '#FFCC00',
            strokeThickness: 2,
            stroke: '#C69F00'
        });
        titleText.anchor.setTo(0.5);

        let loadingText = this.add.text(this.game.world.centerX, 300, 'Loading achievements...', {
            font: 'Lato',
            fontSize: 40,
            fontWeight: 400,
            fill: '#FFCC00',
            strokeThickness: 2,
            stroke: '#C69F00'
        });
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
