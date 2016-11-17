import * as axios from 'axios';
import React, { Component } from 'react';
import Griddle from 'griddle-react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Route } from './../../models/route';
import AutoFillSelectBox from './../general/autoFillSelectBox';
import groupActions from './../../actions/groups';

/**
 * This method does not bother createing the form. Instead, it will return the fields so that they can be
 * added anywhere they seem to be needed.
 */


function mapStateToProps(props) {
  return {
    groups: {
      options: props.groups.options
    }
  }
};

function mapDispatchToProps(dispatch) {
  return {
    fetchSchoolOptions: (search) => dispatch(groupActions.fetchOptions(search))
  }
};

class TeacherForm extends Component {
    constructor(props) {
      super(props);
    };

    componentWillMount() {
      this.props.fetchSchoolOptions();
    }

    render() {
      return (
        <div className='row'>
          <div className='col-xs-12'>
            <div className="form-group">
              { this.props.id ? (<input type='hidden' name='id' value={this.props.id}/>) : '' }
              <label htmlFor="input-teacher-username" className="control-label">Username *</label>
              <input type="text" className="form-control" id="input-teacher-username" onChange={this.props.handleFormChange}
              value={this.props.username} name='username' required/>
            </div>
          </div>
          <div className='col-xs-12'>
            <div className="form-group">
              <AutoFillSelectBox
                searchTitle={'Group this teacher belongs to * (School is assumed by the teacher)'}
                fetch={this.props.fetchSchoolOptions}
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

export default connect(mapStateToProps, mapDispatchToProps)(TeacherForm);
