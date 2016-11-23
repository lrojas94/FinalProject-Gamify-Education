import 'pixi';
import 'p2';
import Phaser from 'phaser';
import BootState from './states/Boot';
import SplashState from './states/Splash';
import GameState from './states/Game';
import ProblemLoaderState from './states/ProblemLoader';
import LoginState from './states/Login';
import MenuState from './states/Menu';
import TopicsState from './states/Topics';
import ResultsState from './states/Results';
import AchievementsState from './states/Achievements';
import DifficultiesState from './states/Difficulties';
import ProblemCountSelectorState from './states/ProblemCountSelect';
// import TopicLoaderState from './states/TopicLoader';

class Game extends Phaser.Game {

    constructor() {
        let width = document.documentElement.clientWidth;
        let height = (width/16) * 9;

        super(width, height, Phaser.AUTO, 'content', null);
        console.log(this.plugins);
        this.transparent = true;
        this.state.add('Boot', BootState, false);
        this.state.add('Splash', SplashState, false);
        this.state.add('ProblemLoader', ProblemLoaderState, false);
        this.state.add('Game', GameState, false);
        this.state.add('Login', LoginState, false);
        this.state.add('Menu', MenuState, false);
        this.state.add('Topics', TopicsState, false);
        this.state.add('Difficulties', DifficultiesState, false);
        this.state.add('Achievements', AchievementsState, false);
        this.state.add('ProblemCountSelector', ProblemCountSelectorState, false);
        this.state.add('Results', ResultsState, false);
        // this.state.add('TopicLoader', TopicLoaderState, false);

        this.state.start('Boot');
    }
}

window.game = new Game();
