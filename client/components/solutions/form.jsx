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
class SolutionForm extends Component {
    constructor(props) {
      super(props);

    };

    render() {
      return (
        <div className='row'>
          <div className='col-xs-10'>
            <div className="form-group">
              { this.props.id ? (<input type='hidden' name='id' value={this.props.id}/>) : '' }
              <label htmlFor="input-solution{this.props.customId||''}" className="control-label">Solution *</label>
              <MathTextField
              name='solution'
              id="input-solution{this.props.customId||''}"
              value={this.props.solution}
              handleFormChange={this.props.handleFormChange} />
            </div>
          </div>
          <div className='col-xs-2'>
            <div className="form-group">
              <label htmlFor="input-is-correct{this.props.customId}" className="control-label">Correct? *</label>
              <input type="checkbox" className="form-control" id="input-is-correct{this.props.customId}" onChange={this.props.handleFormChange}
              checked={this.props.isCorrect} name='isCorrect'/>
            </div>
          </div>
        </div>
      );
    }
};
/**
 * TODO: This form should contain a MATHQUILL input. Create that.
 */
export default SolutionForm;
