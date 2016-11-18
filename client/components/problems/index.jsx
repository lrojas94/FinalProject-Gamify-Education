import * as axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { push } from 'react-router-redux';
import { login, logout } from './../../actions/session';
import SectionTitle from './../general/sectionTitle';
import componentGenerator from './../../helpers/generateComponents';
import problemActions from './../../actions/problems';
import { LinkColumn } from './../general/linkColumn';
import { Route } from './../../models/route';
import ProblemsForm from './form';
import SolutionForm from './../solutions/form';
import ImageComponent from './../general/imageComponent'
import {FormattedMessage, injectIntl} from 'react-intl';

const initialState = {
  problem: {
    id: '',
    problem: '',
    difficultyId: '',
    topicId: '',
    groupId: ''
  },
  solutions: {
    // Are a thing of their own kind xD...
  }
};

const generatedFeatures = componentGenerator({
  displayName: 'problem',
  pluralDisplayName: 'problems',
  view: {
    title: 'Problem',
    elements: [
      { title: '', properties: [{template: ImageComponent, path: 'url', name: 'Problem'}], element: 'problems.view.problem.data'  },
      // { title: 'person', template: ShowAddress, element: 'problems.view.problem.data.address' },
      // { title: 'phone', template: ShowPhone, element: 'problems.view.problem.data.phone' }
    ]
  },
  list: {
    metadata: [
      {
        columnName: 'problem',
        displayName: 'Problem',
        customComponent: LinkColumn.bind(this),
        session: null,
        route: new Route('/problems/view/<%= data %>', 'view'),
        path: 'id',
        isImage: true,
        imgRoute: new Route('<%= data %>', 'imgRoute'),
        imgDataPath: 'url',
      }
    ],
    queryKeys: ['problem'],
    columns: ['problem']
  },
  createOpts: {
    forms: [
      {
        name: 'problem',
        component: ProblemsForm,
        stateName: 'problem'
      },
      {
        name: 'solutions',
        component: SolutionForm,
        stateName: 'solutions',
        multiple: {
          statePath: 'solutions',
          stateTemplate: {
            id: '',
            solution: '',
            isCorrect: false
          }
        }
      }
    ],
    initialState,
    pickAttributes: ['problem', 'solutions']
  },
  update: {
    initialState,
    forms: [
      {
        name: 'problem',
        component: ProblemsForm,
        stateName: 'problem'
      },
      {
        name: 'solutions',
        component: SolutionForm,
        stateName: 'solutions',
        multiple: {
          statePath: 'solutions',
          stateTemplate: {
            id: '',
            solution: '',
            isCorrect: false
          }
        }
      }
    ],
    pickAttributes: ['problem', 'solutions'],
    viewAttributesToState: [
      { name: 'problem' }, //Will assume path as root.
      { name: 'solutions', path: 'solutions' }
    ]
  },
  actions: problemActions,
  url: 'problems'
});

function mapStateToProps(props) {
  return {
    // session: props.session
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

class ProblemsMain extends Component {
    constructor(props) {
      super(props);
    };

    render() {
        return (
          <div>
          <SectionTitle
            title={this.props.intl.messages['sidebar.problems']}
            background={'http://cdnstatic.visualizeus.com/thumbs/a2/11/abstract,art,background,baloon,banner,bubbles-a211623f282ca898144110754adb21ef_h.jpg'}
            customContent={''}
          />
          <br/>
		       {this.props.children}
		      </div>
        );
    }
};

const module = {
  Main: connect(mapStateToProps, mapDispatchToProps)(injectIntl(ProblemsMain)),
  Index: generatedFeatures.list,
  View: generatedFeatures.view,
  Edit: generatedFeatures.update,
  Delete: generatedFeatures.delete,
  Add: generatedFeatures.create
}

export default module;
