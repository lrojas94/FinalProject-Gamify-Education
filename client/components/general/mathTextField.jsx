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
        this.MQ = MathQuill.noConflict().getInterface(2);
        this.mathField = null;
    }

    componentDidMount() {
        this.mathField = this.MQ.MathField(document.getElementById(this.props.id));
        mathField.latex('\\frac{1}{2}+3-2\\left(\\frac{4}{2}\\right)');
    }

    expressionChange(e) {
        console.log('Key Up!');
        console.log('Value: ' + this.mathField.latex());
        // this.props.handleFormChange(this.mathField.latex());
    }

    render() {
        return (
            <div>
                <span id={this.props.id} name="problem" onKeyUp={this.expressionChange.bind(this)} style={{
                    color: 'black',
                    minWidth: '200px'
                }}></span>
            </div>
        );
    }
}

export default MathTextField;
