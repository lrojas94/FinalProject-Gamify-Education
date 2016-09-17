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

export class LinkColumn extends Component {
    constructor(props) {
      super(props);
    };

    render() {
      var shouldAddMenu = false;
      var session = this.props.session || this.props.metadata.session;
      var path = this.props.path || this.props.metadata.path;
      var route = this.props.route || this.props.metadata.route;
      var data = this.props.dataObject || this.props.rowData;


      var url = route.getCompiledUrl({ data: _.get(data, path) })
      var imgRoute = this.props.metadata.isImage ? this.props.metadata.imgRoute.getCompiledUrl({ data: _.get(data, this.props.metadata.imgDataPath ) }) : null;

      if(session.hasPermission(url)) {
        shouldAddMenu = true;
      }

      if(shouldAddMenu) {
        return this.props.metadata.isImage ? (
          <Link to={url}><img src={imgRoute}/></Link>
        ) : ( <Link to={url}>{this.props.data}</Link> );
      }
      else {
        return (<p> {this.props.data} </p>);
      }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkColumn);
