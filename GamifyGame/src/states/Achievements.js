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
          page: page,
          limit: 10
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
      let achievementImg = this.game.cache.getFrameByName('panel');
      let padding = 5;

      achievements.data.map((achievement, index) => {

          let achievementSprite = new AchievementSprite({
              game: this.game,
              x: this.game.world.centerX,
              y: this.game.world.centerY + index * (20),
              achievement
          });
          achievementSprite.anchor.setTo(0.5);

          this.game.add.existing(achievementSprite);
          this.sprites.push(achievementSprite);
      });
    }

}
