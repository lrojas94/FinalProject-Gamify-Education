/* globals __DEV__ */
import Phaser from 'phaser';
import axios from 'axios';
import constants from '../constants';
import SolutionButton from '../sprites/SolutionButton';
import { setResponsiveWidth, centerGameObjects } from '../utils';

export default class Game extends Phaser.State {
  init (problem) {
    this.problem = problem;
  }
  preload () {}

  create () {
    // load bg:
    this.background = this.add.sprite(this.game.world.centerX,this.game.world.centerY,'background');
    // Load title text.
    let titleText = this.add.text(this.game.world.centerX, 150, 'Resuelva el Siguiente Problema');
    titleText.font = 'Lato';
    titleText.fontSize = 40;
    titleText.fontWeight = 100;
    titleText.fill = '#000';
    titleText.anchor.setTo(0.5);
    // Problem:
    this.problemSprite = this.add.sprite(this.game.world.centerX,this.game.world.centerY - 100,`p${this.problem.id}`);
    // Solutions:
    let buttonImg = this.game.cache.getFrameByName('ui-grey','grey_button00.png');
    let padding = 5;
    this.solutionButtons = [];
    this.solutionSelected = false;
    this.problem.solutions.map((solution, index) => {

      let button =  new SolutionButton({
        game: this.game,
        solution: solution,
        x: this.game.world.centerX,
        y: this.game.world.centerY + index * (buttonImg.height + padding),
        key: 'ui-grey',
        upFrame: 'grey_button04.png',
        outFrame: 'grey_button01.png',
        overFrame: 'grey_button03.png',
        downFrame: 'grey_button02.png',
        callback: () => {
          //Answer question:
          if(this.solutionSelected){
            return;
          }

          this.solutionSelected = true;
          var answerData = {
            jwt_token: constants.JWT_TOKEN,
            solutionId: solution.id,
            problemId: solution.problemId,
            studentId: 1
          };

          axios.post(`${constants.API_URL}answers/add`, answerData)
          .then((response) => {
            let data = response.data;
            if(data.status === 1){
              throw Error(data.message);
            }

            //else, we have a new problem:D!
            let problem = data.data.newProblem;
            this.state.start('ProblemLoader', true, false, problem);
          })
          .catch((err) => {
            console.log(err);
          });
        },
        callbackContext: this
      });

      this.game.add.existing(button);
      this.solutionButtons.push(button);
    });



    // set the sprite width to 30% of the game width
    setResponsiveWidth(this.background, 100, this.game.world);
    centerGameObjects([this.background, this.problemSprite]);
  }

  render () {
    // if (__DEV__) {
    //   this.game.debug.spriteInfo(this.mushroom, 32, 32);
    // }
  }
}
