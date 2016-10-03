import React, { Component } from 'react';
import { Link } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as _ from 'lodash'
import { logout } from './../../actions/session';
import { toggleNavbar } from './../../actions/navbar';

function mapStateToProps(props) {
  return {
    session: props.session.session,
    links: props.session.session.links
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
    toggleNavbar: () => dispatch(toggleNavbar()),
    dispatch
  };
}

class NavBarContent extends Component {
    constructor(props) {
      super(props);
    };

    render() {

      return (
        <div id='navbar-content'>
          <div id='navbar-session'>
            <a href={`/user/${this.props.session.username}`}>
              <div id='navbar-image-container'>
                <img src='https://www.ethz.ch/content/specialinterest/erdw/institute-geophysics/geothermal-energy-and-geofluids/en/people/person-detail.person_image.jpeg?persid=206195' alt='Image' />
              </div>

              <h4>{ this.props.session.name }</h4>
              ({ this.props.session.username })
            </a>
            <h5><a href='#' onClick={this.props.logout}>Logout</a></h5>
          </div>
          <hr/>
          <div id='navbar-links'>
            <Link to='/'>
              <div className='nav-link-container'>
                Home
              </div>
            </Link>

            <Link to='/teachers'>
              <div className='nav-link-container'>
                Teachers
              </div>
            </Link>
            <Link to='/problems'>
              <div className='nav-link-container'>
                Problems
              </div>
            </Link>
            <Link to='/topics'>
              <div className='nav-link-container'>
                Topics
              </div>
            </Link>
            <Link to='/difficultys'>
              <div className='nav-link-container'>
                Difficulties
              </div>
            </Link>
          </div>
	      </div>
      );
    }
};


export const NavBarContentModule = connect(mapStateToProps, mapDispatchToProps)(NavBarContent);
