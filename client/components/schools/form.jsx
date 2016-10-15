import * as axios from 'axios';
import React, { Component } from 'react';
import Griddle from 'griddle-react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Route } from './../../models/route';
import MathTextField from './../general/mathTextField';


/**
 * This method does not bother createing the form. Instead, it will return the fields so that they can be
 * added anywhere they seem to be needed.
 */
class SchoolForm extends Component {
    constructor(props) {
      super(props);

    };

    render() {
      return (
        <div className='row'>
          <div className='col-xs-12'>
            <div className="form-group">
              { this.props.id ? (<input type='hidden' name='id' value={this.props.id}/>) : '' }
              <label htmlFor="input-school-name" className="control-label">School Name *</label>
              <input type="text" className="form-control" id="input-school-name" onChange={this.props.handleFormChange}
              value={this.props.name} name='name' required/>
            </div>
            <div className='form-group'>
              <label htmlFor="input-school-address" className="control-label">Address *</label>
              <textarea type="text" className="form-control" id="input-school-address" onChange={this.props.handleFormChange}
              value={this.props.address} name='address' required/>
            </div>
            <div className='form-group'>
              <label htmlFor="input-school-telephone" className="control-label">Phone Number *</label>
              <textarea type="text" className="form-control" id="input-school-telephone" onChange={this.props.handleFormChange}
              value={this.props.telephone} name='telephone' required/>
            </div>
            <div className='form-group'>
              <label htmlFor="input-school-website" className="control-label">Website</label>
              <textarea type="text" className="form-control" id="input-school-website" onChange={this.props.handleFormChange}
              value={this.props.website} name='website' required/>
            </div>
          </div>
        </div>
      );
    }
};

export default SchoolForm;
