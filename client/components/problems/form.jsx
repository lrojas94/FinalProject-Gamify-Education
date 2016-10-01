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
class ProblemForm extends Component {
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
              <MathTextField
              name='problem'
              value={this.props.problem}
              handleFormChange={this.props.handleFormChange} />
            </div>
          </div>
        </div>
      );
    }
};
export default ProblemForm;
