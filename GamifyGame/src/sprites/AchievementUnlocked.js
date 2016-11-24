import Phaser from 'phaser';
import * as _ from 'lodash';


export default class AchievementSprite extends Phaser.Button {

    constructor({game, x, y, asset, achievements}) {

        super(game, game.world.centerX, 65, null);
        game.stage.addChild(this);

        this.currentState = 'APPEARING';
        this.stateTimer = 1000;
        console.log(`FPS: ${game.time.fps} - StateTimer: ${this.stateTimer}`);
        this.proportion = (game.time.fps/this.stateTimer);
        console.log(`proportion: ${this.proportion}`);

        this.alpha = 0;
        this.background = this.addChild(this.game.make.sprite(0, 0, asset || 'achievementUnlocked'));
        this.background.anchor.setTo(0.5);
        this.background.scale.setTo(0.3);

        this.achievements = achievements;
        this.game = game;
        this.anchor.setTo(0.5);
        //create solution sprite:
        // Add achievement text:
        var textOpts = {
            wordWrap: true,
            wordWrapWidth: this.background.width - 300,
            font: 'Lato',
            fontSize: 20,
            align: 'center',
            fill: '#ffffff'
        };
        this.medal = this.addChild(this.game.make.sprite(-this.background.width / 2 + 80, 0, 'medal'));
        this.medal.anchor.setTo(0.5);

        var text = achievements.length > 1 ?
        `You've unlocked ${achievements.length} Achivements - Check them out later on`
        : `You've unlocked an achievement: ${achievements[0].title}`;

        this.title = this.addChild(this.game.make.text(0, 0, text, _.merge(textOpts, {
            fontWeight: 700,
            stroke: "#86969A",
            strokeThickness: 3
        })));

        this.title.anchor.setTo(0.5);
        // let that = this;
        // let tween = this.game.add.tween(this).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false).start();
        // tween.onComplete.add(() => {
        //     let newTween = this.game.add.tween(that).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 3000, 0, false).start();
        // });
    }

    update() {
        this.stateTimer = this.stateTimer - this.game.time.elapsed;
        switch (this.currentState) {
            case 'APPEARING':
                console.log(this.alpha);
                var a = this.alpha;
                a += this.proportion;
                this.alpha = a;
                if(this.stateTimer <= 0 || this.alpha > 1) {
                    // change state:
                    this.currentState = 'SHOWING';
                    this.stateTimer = 3000; // 3s here
                    this.alpha = 1;
                }
                console.log(this.alpha);
                break;
            case 'SHOWING':
                if(this.stateTimer <= 0) {
                    // change state:
                    this.currentState = 'DISAPPEARING';
                    this.stateTimer = 1000; // 1s
                }
            break;
            case 'DISAPPEARING':
                var a = this.alpha;
                a -= this.proportion;
                this.alpha = a;
                if(this.stateTimer <= 0 || this.alpha <= 0) {
                    // change state:
                    this.alpha = 0;
                    this.destroy()
                }
            break;
            default:
            break;
        }

    }

}
