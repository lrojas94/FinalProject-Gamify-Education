import Phaser from 'phaser';
import axios from 'axios';
import { centerGameObjects } from '../utils';
import constants from '../constants';
import ButtonWithText from './../sprites/ButtonWithText';
import * as Fabrique from 'phaser-input';


export default class Splash extends Phaser.State {
  /**
   * Elements:
   * background
   * usernameField => TextField for username input.
   * passwordField => TextField for password input.
   *
   */
  create(){
    this.game.plugins.add(Fabrique.Plugins.InputField);
    let login = this;

    this.background = this.add.sprite(this.game.world.centerX,this.game.world.centerY,'background');
    this.background.anchor.setTo(0.5);

    this.title = this.add.text(this.game.world.centerX, this.game.world.centerY - 180, "Gamify Education");
    this.title.anchor.setTo(0.5);
    this.loginMsg = this.add.text(this.game.world.centerX, this.game.world.centerY - 140, "", {
      fill: 'red',
    });
    this.loginMsg.anchor.setTo(0.5);
    var inputWidth = 300;
    var inputHeight = 20;

    this.usernameField = this.add.inputField(this.game.world.centerX - (inputWidth + 16)/2,this.game.world.centerY - 100, {
      height: inputHeight,
      padding: 8,
      width: inputWidth,
      borderRadius: 5,
      placeHolder: 'Username',
      // type: Fabrique.InputType.password
    });

    this.passwordField = this.add.inputField(this.game.world.centerX - (inputWidth + 16)/2,this.game.world.centerY - 60, {
      height: inputHeight,
      padding: 8,
      width: inputWidth,
      borderRadius: 5,
      placeHolder: 'Password',
      type: Fabrique.InputType.password
    });

    this.logginIn = false;
    this.loginButton = new ButtonWithText({
      game: this.game,
      text: "Login Now",
      x: this.game.world.centerX,
      y: this.game.world.centerY + 20,
      key: 'ui-green',
      upFrame: 'green_button04.png',
      outFrame: 'green_button01.png',
      overFrame: 'green_button03.png',
      downFrame: 'green_button02.png',
      callback: () => {
        //Answer question:
        if(this.logginIn) {
          return;
        }

        // this.logginIn = true;
        var data = {
          username: this.usernameField.value,
          password: this.passwordField.value
        }
        console.log(data);

        login.loginButton.setText('Authenticating...');
        axios.post(`${constants.API_URL}authenticate`, data)
        .then((res) => {
          data = res.data;
          console.log(data);
          this.logginIn = false;
          if(data.status === 0) {
            //login was SUCCESS
            axios.defaults.headers.common['Authorization'] = `JWT ${data.data.token}`;
            login.state.start('ProblemLoader');
          }
          else {
            /*
            TODO:
            Update the message to something like "SUCCESS or FAILURE"
            */
           login.loginMsg.setText(data.message);
           this.loginButton.setText("Login");
          }
        })
        .catch((err) => {
          this.logginIn = false;
          console.log(err);
        })

      },
      callbackContext: this
    });

    this.loginButton.anchor.setTo(0.5);
    this.game.add.existing(this.loginButton);
  }

}
