Weimport * as axios from 'axios';
import React, { Component } from 'react';
import Griddle from 'griddle-react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Route } from './../../models/route';
import MathTextField from './../general/mathTextField';
import groupActions from './../../actions/groups';
import AutoFillSelectBox from './../general/autoFillSelectBox';


function mapStateToProps(props) {
  return {
    groups: {
      options: props.groups.options
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchGroupOptions: (search) => dispatch(groupActions.fetchOptions(search))
  };
}


class TopicForm extends Component {
    constructor(props) {
      super(props);
    };

    componentWillMount() {
      this.props.fetchGroupOptions();
    }

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
          <div className='col-xs-12'>
            <div className="form-group">
              <AutoFillSelectBox
                searchTitle={'Group this topic belongs to*'}
                fetch={this.props.fetchGroupOptions}
                handleFormChange={this.props.handleFormChange}
                name={'groupId'}
                selected={this.props.groupId}
                items={this.props.groups.options.data}
                required={true}
                />
            </div>
          </div>
        </div>
      );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicForm);
