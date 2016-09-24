import * as axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import {push} from 'react-router-redux';
import {login, logout} from './../../actions/session';

function mapStateToProps(props) {
    return {session: props.session};
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout()),
        dispatch
    };
}

class HomeIndex extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div>
                <p>
                    Home Page
                </p>
                {this.props.children}
            </div>
        );
    }
};

export const HomeIndexModule = connect(mapStateToProps, mapDispatchToProps)(HomeIndex);
