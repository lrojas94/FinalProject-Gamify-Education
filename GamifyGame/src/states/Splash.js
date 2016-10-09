import Phaser from 'phaser';
import axios from 'axios';
import { centerGameObjects } from '../utils';
import constants from '../constants';

export default class Splash extends Phaser.State {
  init (problem) {
    this.keysToLoad = [];
  }

  preload () {

    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.crossOrigin = 'anonymous';
    this.load.setPreloadSprite(this.loaderBar);
    //
    // load your assets
    //
    this.load.atlasXML('ui-blue','./assets/images/UI/blueSheet.png','./assets/images/UI/blueSheet.xml');
    this.load.atlasXML('ui-green','./assets/images/UI/greenSheet.png','./assets/images/UI/greenSheet.xml');
    this.load.atlasXML('ui-red','./assets/images/UI/redSheet.png','./assets/images/UI/redSheet.xml');
    this.load.atlasXML('ui-grey','./assets/images/UI/greySheet.png','./assets/images/UI/greySheet.xml');
    this.load.atlasXML('ui-yellow','./assets/images/UI/yellowSheet.png','./assets/images/UI/yellowSheet.xml');
  }

  create(){
    this.state.start('Login');
  }

}
