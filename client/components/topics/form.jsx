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
class TopicForm extends Component {
    constructor(props) {
      super(props);

    };

    render() {
      return (
        <div className='row'>
          <div className='col-xs-12'>
            <div className="form-group">
              { this.props.id ? (<input type='hidden' name='id' value={this.props.id}/>) : '' }
              <label htmlFor="input-topic-name" className="control-label">Topic Name *</label>
              <input type="text" className="form-control" id="input-topic-name" onChange={this.props.handleFormChange}
              value={this.props.name} name='name' required/>
            </div>
            <div className='form-group'>
              <label htmlFor="input-topic-description" className="control-label">Description *</label>
              <textarea type="text" className="form-control" id="input-topic-description" onChange={this.props.handleFormChange}
              value={this.props.description} name='description' required/>
            </div>
            <div className='form-group'>
              <label htmlFor="input-topic-example" className="control-label">Example problem *</label>
              <MathTextField
              name='example'
              value={this.props.example}
              handleFormChange={this.props.handleFormChange} />
            </div>
          </div>
        </div>
      );
    }
};

export default TopicForm;
