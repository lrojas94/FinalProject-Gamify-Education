import * as axios from 'axios';
import React, { Component } from 'react';
import Griddle from 'griddle-react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Route } from './../../models/route';


/**
 * This method does not bother createing the form. Instead, it will return the fields so that they can be
 * added anywhere they seem to be needed.
 */
class TeacherForm extends Component {
    constructor(props) {
      super(props);

    };

    render() {
      return (
        <div className='row'>
          <div className='col-xs-12'>
            <div className="form-group">
              { this.props.id ? (<input type='hidden' name='id' value={this.props.id}/>) : '' }
              <label htmlFor="input-teacher-username" className="control-label">Nombre de Usuario *</label>
              <input type="text" className="form-control" id="input-teacher-username" onChange={this.props.handleFormChange}
              value={this.props.username} name='username' required/>

              <label htmlFor="input-teacher-degree" className="control-label">Diplomado *</label>
              <input type="text" className="form-control" id="input-teacher-degree" onChange={this.props.handleFormChange}
              value={this.props.degree} name='degree' required/>
            </div>
          </div>
        </div>
      );
    }
};

export default TeacherForm;
