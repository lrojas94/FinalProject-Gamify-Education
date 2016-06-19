import React, {Component} from 'react';
import {Link} from 'react-router';
import * as $ from 'jquery';
import AuthActions from '../actions/AuthActions';
import AuthStore from '../stores/AuthStore';

class Header extends Component<{}, {}> {

    public constructor() {
        super();
        this.state = {
            authenticated: false
        };
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    public login() {
        // Log in user Method
        // AuthActions.logUserIn(token);
        this.setState({authenticated: true});
    }

    public logout() {
        // AuthActions.logUserOut();
        this.setState({authenticated: false});
    }

    public render() {
        return (
            // Configure the header view
            <div>
                <input type='button' onClick={this.login} value='Login' />
                <input type='button' onClick={this.logout} value='Logout' />
            </div>
        );
    }

}

export default Header;
