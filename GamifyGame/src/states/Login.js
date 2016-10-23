import Phaser from 'phaser';
import axios from 'axios';
import {
    centerGameObjects
} from '../utils';
import constants from '../constants';
import ButtonWithText from './../sprites/ButtonWithText';
import * as Fabrique from 'phaser-input';
import Background from './../sprites/Background';

export default class Login extends Phaser.State {
    /**
     * Elements:
     * background
     * usernameField => TextField for username input.
     * passwordField => TextField for password input.
     *
     */

    create() {
        this.game.plugins.add(Fabrique.Plugins.InputField);
        let login = this;
        this.stage.backgroundColor = '#34495e';

        var bg = new Background({ game: this.game });
        // this.game.add.existing(bg);

        this.menuPanel = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 30, 'rect-panel');
        this.menuPanel.anchor.setTo(0.5);
        this.menuPanel.width = 400;
        this.menuPanel.height = 200;

        this.menuTitle = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 140, 'title-container');
        this.menuTitle.anchor.setTo(0.5);
        this.menuTitle.width = 400;
        this.menuTitle.height = 50;

        let style = { fill: "#FFFFFF", align: "center" };
        this.title = this.add.text(this.game.world.centerX, this.game.world.centerY - 140, "Gamify Education", style);
        this.title.anchor.setTo(0.5);

        var inputWidth = 300;
        var inputHeight = 20;

        this.usernameField = this.add.inputField(this.game.world.centerX - (inputWidth + 16) / 2, this.game.world.centerY - 100, {
            height: inputHeight,
            padding: 8,
            width: inputWidth,
            borderRadius: 5,
            borderWidth: 2,
            placeHolder: 'Username'
        });

        this.passwordField = this.add.inputField(this.game.world.centerX - (inputWidth + 16) / 2, this.game.world.centerY - 55, {
            height: inputHeight,
            padding: 8,
            width: inputWidth,
            borderRadius: 5,
            borderWidth: 2,
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
            upFrame: 'green_button05.png',
            outFrame: 'green_button02.png',
            overFrame: 'green_button04.png',
            downFrame: 'green_button04.png',
            callback: () => {
                //Answer question:
                if (this.logginIn) {
                    return;
                }

                // this.logginIn = true;
                var data = {
                    username: this.usernameField.value,
                    password: this.passwordField.value
                };
                console.log(data);

                login.loginButton.setText('Authenticating...');
                axios.post(`${constants.API_URL}authenticate`, data)
                    .then((res) => {
                        data = res.data;
                        console.log(data);
                        this.logginIn = false;
                        if (data.status === 0) {
                            //login was SUCCESS
                            axios.defaults.headers.common.Authorization = `JWT ${data.data.token}`;
                            login.state.start('Menu');
                        } else {
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
                    });

            },
            callbackContext: this
        });

        this.loginButton.anchor.setTo(0.5);
        this.game.add.existing(this.loginButton);
    }

}
