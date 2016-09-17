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
              <label htmlFor="input-problem" className="control-label">Problem *</label>
              <input type="text" className="form-control" id="input-problem" onChange={this.props.handleFormChange}
              value={this.props.problem} name='problem' required/>
            </div>
          </div>
        </div>
      );
    }
};
/**
 * TODO: This form should contain a MATHQUILL input. Create that.
 */
export default TeacherForm;
