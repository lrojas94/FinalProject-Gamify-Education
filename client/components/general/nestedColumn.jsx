import React, { Component } from 'react';
import { Link } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as _ from 'lodash'

function mapStateToProps(props, componentProps) {
  return _.extend(componentProps, {});
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export class NestedColumn extends Component {
    constructor(props) {
      super(props);
      console.log(props);
    };

    render() {
      var path = this.props.path || this.props.metadata.path;
      var data = this.props.dataObject || this.props.rowData;
      var nested = _.get(data, path);
      console.log(this.props);
      return (<p> {nested} </p>);

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NestedColumn);
