import Phaser from 'phaser';
import axios from 'axios';
import { centerGameObjects } from '../utils';
import constants from '../constants';

var stateManager;

export default class ProblemLoader extends Phaser.State {
  init (problem) {
    if(this.game.remainingProblems === 0) {
        stateManager.state.start('Results');
    }
    this.game.remainingProblems = this.game.remainingProblems - 1;
    console.log(this.game.remainingProblems);

    this.filesToLoad = {};

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
    stateManager = this;
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    centerGameObjects([this.loaderBg, this.loaderBar]);


    this.load.crossOrigin = 'anonymous';
    this.load.setPreloadSprite(this.loaderBar);
    this.load.onLoadComplete.add(this.loadComplete);
    this.load.onFileComplete.add(this.fileComplete);

  }
  fileComplete(progress, key, success, totalLoadedFiles, totalFiles){
    stateManager.filesToLoad[key].loaded = true;
  }

  loadComplete(){
    //here, this is not this xD
    let changeState = true;
    let unloadedKeys = [];
    for(let key in stateManager.filesToLoad){
      if(!stateManager.filesToLoad[key].loaded){
        changeState = false;
        unloadedKeys.push(key);
      }
    }
    if(changeState){
      stateManager.state.start('Game',null,null, true, false, stateManager.problem);
    }
    else if (stateManager.load.hasLoaded) {
      //Check which files are NOT loading:
      unloadedKeys.map((key) => {
        //Load keys:
        stateManager.load.image(key, stateManager.filesToLoad[key].url);
      });

      stateManager.load.start();
    }
  }
  create(){
    let problemLoader = this;
    // Load from API:
    if(this.shouldSelectProblem){
      axios.post(`${constants.API_URL}problems/random`,{
          jwt_token: constants.JWT_TOKEN,
          topicId: this.game.selectedTopic.id,
          difficultyId: this.game.selectedDifficulty.id,

      })
      .then((response) => {
        const data = response.data;
        if(data.status === 1){
          //Error on server:
          throw Error(data.message);
        }

        const problem = data.data;
        //We have a problem now:
        problemLoader.loadProblemData(problem);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  loadProblemData(problem){
    let problemKey = `p${problem.id}`;
    this.load.image(problemKey,problem.url);
    this.filesToLoad[problemKey] = {
      loaded: false,
      url: problem.url
    };
    problem.solutions.map((solution) => {
      let solutionKey = `s${solution.id}`;
      this.filesToLoad[solutionKey] = {
        loaded: false,
        url: solution.url
      };
      this.load.image(solutionKey,solution.url);
    });
    this.problem = problem;
    this.load.start();
  }

}
