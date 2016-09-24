import React, {Component} from 'react';
import {Link} from 'react-router';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import {push} from 'react-router-redux';
import * as _ from 'lodash'
import MathQuill from 'mathquill';

export class MathTextField extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var MQ = MathQuill.noConflict().getInterface(2);
        var mathField = MQ.MathField(document.getElementById('someId'));
        mathField.latex('\\frac{1}{2}+3-2\\left(\\frac{4}{2}\\right)');
    }

    render() {
        return (
            <div>
                <span id='someId' style={{
                    color: 'white',
                    minWidth: '200px'
                }}></span>
            </div>
        );
    }
}

export default MathTextField;
