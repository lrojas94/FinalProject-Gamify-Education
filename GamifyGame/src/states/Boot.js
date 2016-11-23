import Phaser from 'phaser';
import WebFont from 'webfontloader';
import axios from 'axios';
import constants from './../constants';

export default class Boot extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#EDEEC9';
    this.fontsReady = true;
    this.fontsLoaded = this.fontsLoaded.bind(this);
  }

  preload () {
    // WebFont.load({
    //   google: {
    //     families: ['Nunito', 'Lato']
    //   },
    //   active: this.fontsLoaded
    // });

    let text = this.add.text(this.world.centerX, this.world.centerY, 'Loading Fonts..', {
      font: '16px Arial',
      fill: '#000000',
      align: 'center'
    });


    text.anchor.setTo(0.5, 0.5);

    this.load.image('loaderBg', './assets/images/loader-bg.png');
    this.load.image('loaderBar', './assets/images/loader-bar.png');
    this.load.image('background', './assets/images/background.png');
    this.load.image('yellow_btn', './assets/images/yellow_button.png');
    this.load.image('panel', './assets/images/grey_panel.png');
    this.load.image('bordered_panel', './assets/images/new_panel.png');
    this.load.image('star', './assets/images/star.png');
    /** Medals: **/
    this.load.image('medal', './assets/images/medals/shaded_medal1.png');
  }

  render () {
    if (this.fontsReady) {
      this.state.start('Splash');
    }
  }

  fontsLoaded () {
    this.fontsReady = true;
  }

}
