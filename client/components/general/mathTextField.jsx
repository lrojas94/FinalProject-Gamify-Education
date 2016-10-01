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
        this.mathField = this.MQ.MathField(this.refs.mathField);
        this.mathField.latex(this.props.value || '');
        this.refs.mathInput.value = this.props.value || '';
        this.refs.mathInput.addEventListener('change', this.props.handleFormChange);
    }

    componentWillUnmount() {
      this.refs.mathInput.removeEventListener('change', this.props.handleFormChange);
    }

    expressionChange(e) {
      this.refs.mathInput.value = this.mathField.latex();
      this.refs.mathInput.dispatchEvent(new Event('change'))
    }

    render() {
        return (
            <div>
                <input type='hidden' ref='mathInput' name={this.props.name || 'mathInput'}/>
                <span ref='mathField' class='form-control' onKeyUp={this.expressionChange.bind(this)} style={{
                    color: 'black',
                    minWidth: '200px'
                }}></span>
            </div>
        );
    }
}

export default MathTextField;
