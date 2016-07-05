import Phaser from 'phaser';
import axios from 'axios';
import { centerGameObjects } from '../utils';
import constants from '../constants';

export default class Splash extends Phaser.State {
  init (problem) {
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
    // Keep reference inside promise:
    let splash = this;
    // Load from API:
    if(this.shouldSelectProblem){
      axios.post(`${constants.API_URL}problems/random`,{ jwt_token: constants.JWT_TOKEN })
      .then((response) => {
        const data = response.data;
        if(data.status === 1){
          //Error on server:
          throw Error(data.message);
        }

        const problem = data.data;
        //We have a problem now:
        splash.loadProblemData(problem);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  loadProblemData(problem){
    this.load.image(`p${problem.id}`,problem.url);

    problem.solutions.map((solution) => {
      this.load.image(`s${solution.id}`,solution.url);
    });

    this.problem = problem;
    this.load.start();
  }

  render(){
    if(this.problem !== null && this.load.hasLoaded && !this.load.isLoading) {
      this.state.start('Game', true, false, this.problem);
    }
  }

}
