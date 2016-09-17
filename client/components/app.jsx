import React, { Component } from 'react';
import { Link } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { push, replace } from 'react-router-redux';
import * as Sidebar from 'react-sidebar';
import { dockNavbar, undockNavbar, toggleNavbar } from './../actions/navbar';
import { NavBarContentModule as NavBarContent } from './general/sidebar';

function mapStateToProps(props) {
  return {
    session: props.session.session,
    sessionError: props.session.error,
    navbar: props.navbar
  };
};

function mapDispatchToProps(dispatch) {
  return {
    toggleNavbar: (currentState) => dispatch(toggleNavbar(currentState)),
    dockNavbar: () => dispatch(dockNavbar()),
    undockNavbar: () => dispatch(undockNavbar()),
    replace: (path) => dispatch(replace(path))
  };
};

class App extends Component {
    constructor(props) {
      super(props);

      this.state = {
        mql: null
      }



      this.onSetSidebarOpen.bind(this);
      this.mediaQueryChanged.bind(this);
    };

    componentWillMount() {

      var mql = window.matchMedia(`(min-width: 800px)`);
      mql.addListener(this.mediaQueryChanged.bind(this));
      this.setState({ mql: mql });

      if(mql.matches) {
        this.props.dockNavbar();
      }
      else {
        this.props.undockNavbar();
      }

      if(!(this.props.session && !this.props.sessionError)){
        this.props.replace('/login');
        return;
      }

    }

    onSetSidebarOpen() {
      this.props.toggleNavbar(this.props.navbar.open);
    }

    componentWillUnmount() {
      this.state.mql.removeListener(this.mediaQueryChanged);
    }

    mediaQueryChanged() {

      if(this.state.mql.matches){
        this.props.dockNavbar();
      }
      else{
        this.props.undockNavbar();
      }
    }

    render() {
      if(this.props.session && !this.props.sessionError){

        var props = {
          sidebar: <NavBarContent/>,
          open: this.props.navbar.open,
          docked: this.props.navbar.docked,
          onSetOpen: this.onSetSidebarOpen.bind(this)
        };

        return (
          <Sidebar.default { ...props }>
            <div className='container-fluid' id='sidebar-handler'>
              <div id='sidebar-handler-left'>
                <a href='#' onClick={this.onSetSidebarOpen.bind(this)}><i className='fa fa-bars'></i></a>
              </div>
              <div id='sidebar-handler-right'>
                <p>{this.props.session.name}</p>
              </div>
            </div>
            {this.props.children}
          </Sidebar.default>
        );
      }
      else  {
        return  (
          this.props.children
        );
      }
    }
};


export const AppModule = connect(mapStateToProps, mapDispatchToProps)(App);
