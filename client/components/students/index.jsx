import * as axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { push } from 'react-router-redux';
import { login, logout } from './../../actions/session';
import SectionTitle from './../general/sectionTitle';
import componentGenerator from './../../helpers/generateComponents';
import studentActions from './../../actions/students';
import { LinkColumn } from './../general/linkColumn';
import { NestedColumn } from './../general/nestedColumn';
import { Route } from './../../models/route';
import StudentsForm from './form';
import StudentGraphData from './graphData';
import PersonForm from './../persons/form';
// import ShowGroup from './../groups/show';
import DateComponent from './../general/dateComponent';
import {FormattedMessage, injectIntl} from 'react-intl';

const initialState = {
  student: {
    id: '',
    username: '',
    password: '',
    password_2: '',
    groupId: '',
    personId: '',
  },
  person: {
    id: '',
    name: '',
    lastName: '',
    birthDay: '',
    gender: 'm'
  }
};

const generatedFeatures = componentGenerator({
  displayName: 'student',
  pluralDisplayName: 'students',
  view: {
    title: 'Student',
    elements: [
      { title: '', properties: ['username'], element: 'students.view.student.data' },
      { title: 'personalInfo',
        properties: ['name', 'lastName', {template: DateComponent, path: 'birthDay', name: 'bday'}, 'gender'],
        element: 'students.view.student.data.person'
    },
    { title: 'charts', template: StudentGraphData, element: 'students.view.student.data' }
      // { title: 'group', template: ShowGroup, element: 'students.view.student.data.group' },
      // { title: 'phone', template: ShowPhone, element: 'students.view.student.data.phone' }
    ]
  },
  list: {
    metadata: [
      {
        columnName: 'username',
        displayName: 'Username',
        customComponent: LinkColumn.bind(this),
        session: null,
        route: new Route('/students/view/<%= data %>', 'view'),
        path: 'id',
      },
      {
        columnName: 'a',
        path: 'person.name',
        displayName: 'First Names',
        customComponent: NestedColumn.bind(this),
      },
      {
        columnName: 'b',
        path: 'person.lastName',
        displayName: 'Last Names',
        customComponent: NestedColumn.bind(this),
      }
    ],
    queryKeys: ['username', 'person.name', 'person.lastName'],
    columns: ['username', 'a','b']
  },
  createOpts: {
    forms: [
      {
        name: 'student',
        component: StudentsForm,
        stateName: 'student'
      },
      {
        name: 'Personal Data',
        stateName: 'person',
        component: PersonForm,
      }
    ],
    initialState,
    pickAttributes: ['student', 'person']
  },
  update: {
    initialState,
    forms: [
      {
        name: 'student',
        component: StudentsForm,
        stateName: 'student'
      },
      {
        name: 'Personal Data',
        stateName: 'person',
        component: PersonForm,
        toggler: 'personToggler'
      }
    ],
    pickAttributes: ['student', 'person'],
    viewAttributesToState: [
      { name: 'student' }, //Will assume path as root.
      { name: 'person', path: 'person' }
    ]
  },
  actions: studentActions,
  url: 'students'
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

class StudentsMain extends Component {
    constructor(props) {
      super(props);
    };

    render() {
        return (
          <div>
          <SectionTitle
            title={this.props.intl.messages['sidebar.students']}
            background={'http://www.psu.edu/sites/default/files/CS_howdoi.jpg'}
            customContent={''}
          />
          <br/>
		       {this.props.children}
		      </div>
        );
    }
};

const module = {
  Main: connect(mapStateToProps, mapDispatchToProps)(injectIntl(StudentsMain)),
  Index: generatedFeatures.list,
  View: generatedFeatures.view,
  Edit: generatedFeatures.update,
  Delete: generatedFeatures.delete,
  Add: generatedFeatures.create
}

export default module;
