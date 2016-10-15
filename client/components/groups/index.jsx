import * as axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { push } from 'react-router-redux';
import { login, logout } from './../../actions/session';
import SectionTitle from './../general/sectionTitle';
import componentGenerator from './../../helpers/generateComponents';
import groupActions from './../../actions/groups';
import { LinkColumn } from './../general/linkColumn';
import { Route } from './../../models/route';
import GroupForm from './form';

const initialState = {
  group: {
    id: '',
    year: '',
    grade: '',
    schoolId: ''
  }
};

const generatedFeatures = componentGenerator({
  displayName: 'group',
  pluralDisplayName: 'groups',
  view: {
    title: 'Group',
    elements: [
      { title: '', properties: ['grade', 'year'], element: 'groups.view.group.data' },
      // { title: 'School', template: SchoolView, element: 'groups.view.group.data.school' },
    ]
  },
  list: {
    metadata: [
      {
        columnName: 'id',
        displayName: 'Identifier',
        customComponent: LinkColumn.bind(this),
        session: null,
        route: new Route('/groups/view/<%= data %>', 'view'),
        path: 'id',
      },
      {
        columnName: 'year',
        displayName: 'Year'
      },
      {
        columnName: 'grade',
        displayName: 'Grade'
      },
    ],
    queryKeys: ['year', 'grade'],
    columns: ['year', 'grade']
  },
  createOpts: {
    forms: [
      {
        name: 'group',
        component: GroupForm,
        stateName: 'group'
      }
    ],
    initialState,
    pickAttributes: ['group']
  },
  update: {
    initialState,
    forms: [
      {
        name: 'group',
        component: GroupForm,
        stateName: 'group'
      }
    ],
    pickAttributes: ['group'],
    viewAttributesToState: [
      { name: 'group' }, //Will assume path as root.
    ]
  },
  actions: groupActions,
  url: 'groups'
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

class GroupMain extends Component {
    constructor(props) {
      super(props);
    };

    render() {
        return (
          <div>
          <SectionTitle
            title={'Group'}
            background={'http://media.gettyimages.com/videos/hexagon-orange-background-loopable-video-id513620464?s=640x640'}
            customContent={''}
          />
          <br/>
		       {this.props.children}
		      </div>
        );
    }
};

const module = {
  Main: connect(mapStateToProps, mapDispatchToProps)(GroupMain),
  Index: generatedFeatures.list,
  View: generatedFeatures.view,
  Edit: generatedFeatures.update,
  Delete: generatedFeatures.delete,
  Add: generatedFeatures.create
}

export default module;
