import * as axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router';
import {FormattedMessage} from 'react-intl'
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import {push, replace} from 'react-router-redux';
import {login, logout} from './../../actions/session';

function mapStateToProps(props) {
    return {session: props.session.session, error: props.session.error};
}

function mapDispatchToProps(dispatch) {
    return {
        login: (username : string, password : string) => dispatch(login(username, password)),
        dispatch
    };
}

class Login extends Component {
    constructor(props) {
        super(props);
        this._renderLoginForm.bind(this);
    };

    authenticate(e) {
        e.preventDefault();
        var username = this.refs.usernameInput.value;
        this.props.login(username, this.refs.passwordInput.value);
    };

    _renderLoginForm() {
        if (!this.props.session || this.props.error) { // has yet to login
            return (
                <div>
                    <h3 style={{background: ('')}}>Gamify Education</h3>
                    <p>
                        <FormattedMessage id='test.translation'
                            defaultMessage='Testing translations' />
                    </p>
                    <div id='form-container'>
                        <div style={{position: 'relative'}}>
                            <form method='POST' onSubmit={this.authenticate.bind(this)}>

                                {this.props.error
                                    ? (
                                        <div className='alert alert-danger'>{this.props.error.message}</div>
                                    )
                                    : ''}
                                <div className='form-group'>
                                    <label htmlFor='username'>Username</label><br/>
                                    <input className='form-control' type='text' ref='usernameInput' id='username' name='username'/>
                                </div>

                                <div className='form-group'>
                                    <label htmlFor='password'>Password</label><br/>
                                    <input className='form-control' type='password' ref='passwordInput' id='password' name='password'/>
                                </div>

                                <input type='submit' className='btn btn-default btn-block' value={this.props.session && this.props.session.isLoggingIn
                                    ? 'Authenticating...'
                                    : 'Login'}/>

                            </form>
                        </div>
                    </div>
                </div>
            );
        }
    };

    componentWillMount() {
        if (this.props.session != null && !this.props.error) {
            this.props.dispatch(replace('/'));
        }
    }

    componentDidUpdate() {
        if (this.props.session != null && !this.props.error) {
            this.props.dispatch(replace('/'));
        }
    }

    render() {
        return (
            <div className='container-fluid' id='login-form'>
                <div className='row'>
                    <div className='col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3'>
                        {this._renderLoginForm()}
                    </div>
                </div>
            </div>
        );
    };
};

export const LoginModule = connect(mapStateToProps, mapDispatchToProps)(Login);
