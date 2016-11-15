/* globals __DEV__ */
import Phaser from 'phaser';
import axios from 'axios';
import constants from '../constants';
import ButtonWithText from './../sprites/ButtonWithText';
import SolutionButton from '../sprites/SolutionButton';
import {
    setResponsiveWidth,
    centerGameObjects
} from '../utils';

export default class Game extends Phaser.State {
    init(problem) {
        this.problem = problem;
    }
    preload() {}

    create() {
        // load bg:
        // this.background = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background');

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
                let response = confirm('Are you sure you want to quit? All progress in this session will be lost.');
                if (response === true) {
                    this.state.start('Menu');
                }
            },
            callbackContext: this
        });

        this.closeButton.anchor.setTo(0.5);

        this.bg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'panel');
        // bg.smoothed = false;
        this.bg.anchor.setTo(0.5);
        this.bg.scale.y = 0.5;
        this.bg.scale.x = 0.55;
        // this.bg.smoothed = false;

        // Load title text.
        let titleText = this.add.text(this.game.world.centerX, 150, 'Resuelva el Siguiente Problema');
        titleText.font = 'Lato';
        titleText.fontSize = 40;
        titleText.fontWeight = 100;
        titleText.fill = '#000';
        titleText.anchor.setTo(0.5);
        // Problem:
        this.problemSprite = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 100, `p${this.problem.id}`);
        this.problemSprite.anchor.setTo(0.5);
        // Solutions:
        this.solutionButtons = this.game.add.group();
        let buttonImg = this.game.cache.getFrameByName('ui-grey', 'grey_button00.png');
        let padding = 5;
        this.solutionSelected = false;
        this.problem.solutions.map((solution, index) => {

            let button = new SolutionButton({
                game: this.game,
                solution: solution,
                x: index * (buttonImg.width + padding),
                y: 0,
                key: 'ui-blue',
                upFrame: 'blue_button05.png',
                outFrame: 'blue_button02.png',
                overFrame: 'blue_button04.png',
                downFrame: 'blue_button04.png',
                callback: () => {
                    //Answer question:
                    if (this.solutionSelected) {
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
                            if (data.status === 1) {
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
            button.anchor.setTo(0.5);

            this.solutionButtons.add(button);
        });

        this.solutionButtons.x = this.game.world.centerX + buttonImg.width / 2 - this.solutionButtons.width / 2 ;
        this.solutionButtons.y = this.game.world.centerY;
        this.game.add.existing(this.solutionButtons);
        this.game.add.existing(this.closeButton);
    }

    render() {
        this.bg.smoothed = !this.bg.smoothed;
    }

}
