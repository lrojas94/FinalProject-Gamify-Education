import Phaser from 'phaser';
import axios from 'axios';
import {
    centerGameObjects
} from '../utils';
import constants from '../constants';

export default class TopicLoader extends Phaser.State {
    init(page) {
        this.loadComplete.bind(this);
        this.page = page || 1;
    }

    preload() {
        console.log('preloading topics');
        this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
        this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
        centerGameObjects([this.loaderBg, this.loaderBar]);

        this.load.crossOrigin = 'anonymous';
        this.load.setPreloadSprite(this.loaderBar);
    }

    loadComplete(topics) {
        console.log(topics);
        var transitionOut = Phaser.Plugin.StateTransition.Out.SlideTop;
        var transitionIn = Phaser.Plugin.StateTransition.In.SlideTop;
        this.state.start('Topics', transitionOut, transitionIn, true, false, topics);
    }
    create() {
        console.log('creating topics loader');
        let topicLoader = this;
        // Load from API:
        axios.get(`${constants.API_URL}topics/`, {
            page: topicLoader.page,
            limit: 10
        }).then((response) => {
            console.log('getting data...');
            const data = response.data;
            if (data.status === 1) {
                // Error on server:
                console.log('Error retrieving topics...');
                throw Error(data.message);
            } else {
                // We have a topic now:
                console.log('We got data now!');
                const topics = data;
                topicLoader.loadComplete(topics);
            }
        }).catch((err) => {
            console.log(err);
        });
    }
}
