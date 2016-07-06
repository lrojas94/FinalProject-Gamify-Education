import Phaser from 'phaser';
import axios from 'axios';
import { centerGameObjects } from '../utils';
import constants from '../constants';

export default class Splash extends Phaser.State {
  init (problem) {
    this.keysToLoad = [];
    if(problem){
      this.loadProblemData(problem);
      this.shouldSelectProblem = false;
    }
    else{
      this.problem = null;
      this.shouldSelectProblem = true;
    }
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
  }

  create(){
    this.state.start('ProblemLoader');
  }

}
