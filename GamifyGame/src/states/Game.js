/* globals __DEV__ */
import Phaser from 'phaser';
import axios from 'axios';
import constants from '../constants';
import ButtonWithText from './../sprites/ButtonWithText';
import AchievementUnlocked from './../sprites/AchievementUnlocked';
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

        this.bg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'y_panel');
        // bg.smoothed = false;
        this.bg.anchor.setTo(0.5);
        this.bg.scale.y = 0.5;
        this.bg.scale.x = 0.55;
        // this.bg.smoothed = false;

        // Load title text.
        let titleText = this.add.text(this.game.world.centerX, 150, 'Solve the following problem',{
            font: 'Lato',
            fontSize: 40,
            fontWeight: 400,
            fill: '#FFCC00',
            strokeThickness: 2,
            stroke: '#C69F00'
        });
        titleText.anchor.setTo(0.5);
        // Problem:
        this.problemSprite = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 100, `p${this.problem.id}`);
        this.problemSprite.anchor.setTo(0.5);
        this.bg.width = this.problemSprite.width + 40;
        this.bg.height = this.problemSprite.height + 40;
        this.bg.y = titleText.y + this.bg.height/2 + 40;
        this.problemSprite.y = this.bg.y;
        // Solutions:
        this.solutionButtons = this.game.add.group();
        let buttonImg = this.game.cache.getFrameByName('ui-grey', 'grey_button00.png');
        let padding = 5;
        this.solutionSelected = false;
        let buttonSize = {
            width: 0,
            height: 0
        };

        this.problem.solutions.map((solution, index) => {

            let button = new SolutionButton({
                game: this.game,
                solution: solution,
                x: 0,
                y: 0,
                key: 'ui-yellow',
                upFrame: 'yellow_button05.png',
                outFrame: 'yellow_button02.png',
                overFrame: 'yellow_button04.png',
                downFrame: 'yellow_button04.png',
                callback: () => {
                    //Answer question:
                    if (this.solutionSelected) {
                        return;
                    }

                    this.solutionSelected = true;

                    if(solution.isCorrect) {
                        this.game.correctAnswers += 1;
                    }

                    var answerData = {
                        solutionId: solution.id,
                        problemId: solution.problemId,
                        studentId: this.game.user.id,
                        topicId: this.game.selectedTopic.id,
                        difficultyId: this.game.selectedDifficulty.id,
                    };

                    axios.post(`${constants.API_URL}answers/add`, answerData)
                        .then((response) => {
                            let data = response.data;
                            if (data.status === 1) {
                                throw Error(data.message);
                            }

                            //else, we have a new problem:D!
                            console.log(data.data);

                            if(data.data.unlockedAchievements && data.data.unlockedAchievements.length !== 0) {
                                // create the test achievement
                                this.unlockedAchievement = new AchievementUnlocked({
                                    game: this.game,
                                    achievements: data.data.unlockedAchievements
                                });
                                this.unlockedAchievement.anchor.setTo(0.5);
                            }
                            let problem = data.data.newProblem;
                            this.state.start('ProblemLoader', null, null, true, false, problem);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                },
                callbackContext: this
            });
            button.anchor.y = 0.5;
            buttonSize = {
                width: Math.max(buttonSize.width, button.solutionWidth() + 40),
                height: Math.max(buttonSize.height, button.solutionHeight() + 20),
            }

            button.idx = index;
            this.solutionButtons.add(button);
        });
        var solutionsWidth = 0;
        this.solutionButtons.forEach(function(button) {
            button.setBGSize(buttonSize);
            button.x = button.idx * (buttonSize.width + padding);
            solutionsWidth += (buttonSize.width);
            if(button.idx > 0) {
                solutionsWidth += padding;
            }
        }, this);

        this.solutionButtons.x = this.game.world.centerX + Math.floor((buttonSize.width - solutionsWidth) / 2);
        console.log(this.solutionButtons.width);
        console.log(solutionsWidth);
        console.log(buttonSize.width);
        this.solutionButtons.y = this.bg.y + this.bg.height / 2 + 40;
        this.game.add.existing(this.solutionButtons);
        this.game.add.existing(this.closeButton);
    }

    render() {
        this.bg.smoothed = !this.bg.smoothed;
    }

}
