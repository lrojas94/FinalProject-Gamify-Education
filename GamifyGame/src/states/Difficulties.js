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
                difficultyLoader.loadingText.setText("");
                difficultyLoader.initDifficulties(data);
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
        this.difficultiesGroup = this.game.add.group();
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
        let titleText = this.add.text(this.game.world.centerX, 150, 'Choose a Difficulty',{
            font: 'Lato',
            fontSize: 40,
            fontWeight: 400,
            fill: '#FFCC00',
            strokeThickness: 2,
            stroke: '#C69F00'
        });

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
        let difficultyImg = this.game.make.sprite(0, 0, 'bordered_panel');
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
                    this.game.selectedDifficulty = difficulty;
                    this.state.start('ProblemCountSelector');
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
