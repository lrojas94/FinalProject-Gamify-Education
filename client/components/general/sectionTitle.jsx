import React, { Component } from 'react';
import { Link } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as _ from 'lodash'

function mapStateToProps(props, componentProps) {
  return _.extend(componentProps, {

  });
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

class SectionTitle extends Component {
    constructor(props) {
      super(props);
    };

    render() {
      return (
        <div className='container-fluid section-title'
             style={{ backgroundImage: `url(${this.props.background})` }}>
          <p className='section-title-text'>{this.props.title}</p>
          <div className='section-title-custom-content'>{this.props.customContent}</div>
        </div>
      );
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(SectionTitle);
