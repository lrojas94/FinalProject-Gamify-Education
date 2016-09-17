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

export class MenuColumn extends Component {
    constructor(props) {
      super(props);
    };

    render() {
      var shouldAddMenu = false;
      var session = this.props.session || this.props.metadata.session;
      var routes = this.props.routes || this.props.metadata.routes;

      var links = [];
      for(var route of routes) {
        //check which url to work with:
        if(session.hasPermission(route.url)){
          shouldAddMenu = true;
          var link = (<li key={`${this.props.rowData.name}-${route.displayName}`}><Link to={route.getCompiledUrl({ data: this.props.data })}> {route.displayName} </Link></li>);
          links.push(link);
        }

      }

      if(shouldAddMenu) {
        return (
          <div className="dropdown">
            <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Menu
              <span className="caret"></span>
            </button>
            <ul className="dropdown-menu">
            {links}
            </ul>
          </div>
        );
      }
      else {
        return (<p> NOT AVAILABLE </p>);
      }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuColumn);
