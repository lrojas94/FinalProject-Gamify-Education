import Phaser from 'phaser';
import axios from 'axios';
import { centerGameObjects } from '../utils';
import constants from '../constants';

var stateManager;

export default class ProblemLoader extends Phaser.State {
  init (problem) {
    if(this.game.remainingProblems < 0) {
        this.state.start('Results');
        return;
    }
    this.game.remainingProblems = this.game.remainingProblems - 1;
    this.problem = problem;

    this.filesToLoad = {};


  }

  preload() {
      stateManager = this;
      this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
      this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
      centerGameObjects([this.loaderBg, this.loaderBar]);
      this.game.load.crossOrigin = 'anonymous';
      this.game.load.setPreloadSprite(this.loaderBar);
      this.game.load.onLoadComplete.add(this.loadComplete);
      this.game.load.onFileComplete.add(this.fileComplete);
  }

  create() {

      if(this.problem){
        this.shouldSelectProblem = false;
        this.loadProblemData(this.problem);
      }
      else{
        this.shouldSelectProblem = true;
        this.start();
      }
  }

  fileComplete(progress, key, success, totalLoadedFiles, totalFiles){
    stateManager.filesToLoad[key].loaded = true;
    console.log(progress);
    console.log('Loaded -> ' + totalLoadedFiles);
    console.log('Total -> ' + totalFiles);
    console.log('Key -> ' + key);
  }

  loadComplete(){
    //here, this is not this xD
    console.log('Load complete o.O');
    let changeState = true;
    let unloadedKeys = [];
    for(let key in stateManager.filesToLoad){
      if(!stateManager.filesToLoad[key].loaded){
        changeState = false;
        unloadedKeys.push(key);
      }
    }
    if(stateManager.game.remainingProblems >= 0) {
        stateManager.state.start('Game',null, null, true, false, stateManager.problem);
    }
    else {
        stateManager.state.start('Results');
    }
  }
  start(){
    let problemLoader = this;
    // Load from API:
    if(this.shouldSelectProblem){
      axios.post(`${constants.API_URL}problems/random`,{
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
    problem.solutions.map((solution) => {
      let solutionKey = `s${solution.id}`;
      this.filesToLoad[solutionKey] = {
        loaded: false,
        url: solution.url
      };
      this.game.load.image(solutionKey, solution.url);
    });
    this.game.load.image(problemKey, problem.url);
    this.filesToLoad[problemKey] = {
        loaded: false,
        url: problem.url
    };
    this.problem = problem;
    this.game.load.start();
  }

}
