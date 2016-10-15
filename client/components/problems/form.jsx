import * as axios from 'axios';
import React, { Component } from 'react';
import Griddle from 'griddle-react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Route } from './../../models/route';
import AutoFillSelectBox from './../general/autoFillSelectBox'
import topicActions from './../../actions/topics';
import groupActions from './../../actions/groups';
import difficultyActions from './../../actions/difficulties';
import MathTextField from './../general/mathTextField';


/**
 * This method does not bother createing the form. Instead, it will return the fields so that they can be
 * added anywhere they seem to be needed.
 */
 function mapStateToProps(props) {
   return {
     difficultys: {
       options: props.difficultys.options
     },
     topics: {
       options: props.topics.options
     },
     groups: {
       options: props.groups.options
     }
   };
 }

 function mapDispatchToProps(dispatch) {
   return {
     fetchDifficultyOptions: (search) => dispatch(difficultyActions.fetchOptions(search)),
     fetchTopicOptions: (search) => dispatch(topicActions.fetchOptions(search)),
     fetchGroupOptions: (search) => dispatch(groupActions.fetchOptions(search)),
   };
 }


class ProblemForm extends Component {
    constructor(props) {
      super(props);

    };

    componentWillMount(){
      this.props.fetchDifficultyOptions();
      this.props.fetchTopicOptions();
      this.props.fetchGroupOptions();
    }

    render() {
      return (
        <div className='row'>
          <div className='col-xs-12'>
            <div className="form-group">
            <AutoFillSelectBox
              searchTitle={'Group *'}
              fetch={this.props.fetchGroupOptions}
              handleFormChange={this.props.handleFormChange}
              name={'groupId'}
              selected={this.props.groupId}
              items={this.props.groups.options.data}
              required={true}
              />
            </div>
          </div>
          <div className='col-xs-12 col-sm-6'>
            <div className="form-group">
            <AutoFillSelectBox
              searchTitle={'Topic *'}
              fetch={this.props.fetchTopicOptions}
              handleFormChange={this.props.handleFormChange}
              name={'topicId'}
              selected={this.props.topicId}
              items={this.props.topics.options.data}
              required={true}
              />
            </div>
          </div>
          <div className='col-xs-12 col-sm-6'>
            <div className="form-group">
            <AutoFillSelectBox
              searchTitle={'Difficulty *'}
              fetch={this.props.fetchDifficultyOptions}
              handleFormChange={this.props.handleFormChange}
              name={'difficultyId'}
              selected={this.props.difficultyId}
              items={this.props.difficultys.options.data}
              required={true}
              />
            </div>
          </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ProblemForm);
