import * as axios from 'axios';
import React, { Component } from 'react';
import Griddle from 'griddle-react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Route } from './../../models/route';
import AutoFillSelectBox from './../general/autoFillSelectBox';
import schoolActions from './../../actions/schools';

/**
 * This method does not bother createing the form. Instead, it will return the fields so that they can be
 * added anywhere they seem to be needed.
 */


function mapStateToProps(props) {
  return {
    schools: {
      options: props.schools.options
    }
  }
};

function mapDispatchToProps(dispatch) {
  return {
    fetchSchoolOptions: (search) => dispatch(schoolActions.fetchOptions(search))
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
            <div className='form-group'>
              <label htmlFor="input-teacher-degree" className="control-label">Degree *</label>
              <input type="text" className="form-control" id="input-teacher-degree" onChange={this.props.handleFormChange}
              value={this.props.degree} name='degree' required/>
            </div>
          </div>
          <div className='col-xs-12'>
            <div className="form-group">
              <AutoFillSelectBox
                searchTitle={'School this teacher belongs to *'}
                fetch={this.props.fetchSchoolOptions}
                handleFormChange={this.props.handleFormChange}
                name={'schoolId'}
                selected={this.props.schoolId}
                items={this.props.schools.options.data}
                required={true}
                />
            </div>
          </div>
        </div>
      );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherForm);
