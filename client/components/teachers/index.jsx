import * as axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { push } from 'react-router-redux';
import { login, logout } from './../../actions/session';
import SectionTitle from './../general/sectionTitle';
import componentGenerator from './../../helpers/generateComponents';
import teacherActions from './../../actions/teachers';
import { LinkColumn } from './../general/linkColumn';
import { Route } from './../../models/route';
import TeachersForm from './form';
import PersonForm from './../persons/form';
import DateComponent from './../general/dateComponent';

const initialState = {
  teacher: {
    id: '',
    username: '',
    degree: '',
    password: '',
    password_2: '',
    personId: ''
  },
  person: {
    id: '',
    name: '',
    lastName: '',
    birthDay: '',
    gender: ''
  }
};

const generatedFeatures = componentGenerator({
  displayName: 'teacher',
  pluralDisplayName: 'teachers',
  view: {
    title: 'Teacher',
    elements: [
      { title: '', properties: ['username', 'degree'], element: 'teachers.view.teacher.data' },
      { title: 'Personal Information',
        properties: ['name', {name: 'Last Name', path: 'lastName'}, {template: DateComponent, path: 'birthDay', name: 'Birth Date'}, 'gender'],
        element: 'teachers.view.teacher.data.person'
      }
      // { title: 'person', template: ShowAddress, element: 'teachers.view.teacher.data.address' },
      // { title: 'phone', template: ShowPhone, element: 'teachers.view.teacher.data.phone' }
    ]
  },
  list: {
    metadata: [
      {
        columnName: 'username',
        displayName: 'Username',
        customComponent: LinkColumn.bind(this),
        session: null,
        route: new Route('/teachers/view/<%= data %>', 'view'),
        path: 'id',
      },
      {
        columnName: 'degree',
        displayName: 'Degree'
      }
    ],
    queryKeys: ['username', 'degree'],
    columns: ['username', 'degree']
  },
  createOpts: {
    forms: [
      {
        name: 'teacher',
        component: TeachersForm,
        stateName: 'teacher'
      },
      {
        name: 'Personal Data',
        stateName: 'person',
        component: PersonForm,
      }
    ],
    initialState,
    pickAttributes: ['teacher', 'person']
  },
  update: {
    initialState,
    forms: [
      {
        name: 'teacher',
        component: TeachersForm,
        stateName: 'teacher'
      },
      {
        name: 'Personal Data',
        stateName: 'person',
        component: PersonForm,
        toggler: 'personToggler'
      }
    ],
    pickAttributes: ['teacher', 'person'],
    viewAttributesToState: [
      { name: 'teacher' }, //Will assume path as root.
      { name: 'person', path: 'person' }
    ]
  },
  actions: teacherActions,
  url: 'teachers'
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

class TeachersMain extends Component {
    constructor(props) {
      super(props);
    };

    render() {
        return (
          <div>
          <SectionTitle
            title={'Teachers'}
            background={'http://uconn-today.universityofconn.netdna-cdn.com/wp-content/uploads/2014/05/MaleMathTeacher.jpg'}
            customContent={''}
          />
          <br/>
		       {this.props.children}
		      </div>
        );
    }
};

const module = {
  Main: connect(mapStateToProps, mapDispatchToProps)(TeachersMain),
  Index: generatedFeatures.list,
  View: generatedFeatures.view,
  Edit: generatedFeatures.update,
  Delete: generatedFeatures.delete,
  Add: generatedFeatures.create
}

export default module;
