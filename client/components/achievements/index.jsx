import * as axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { push } from 'react-router-redux';
import { login, logout } from './../../actions/session';
import SectionTitle from './../general/sectionTitle';
import componentGenerator from './../../helpers/generateComponents';
import achievementActions from './../../actions/achievements';
import { LinkColumn } from './../general/linkColumn';
import { Route } from './../../models/route';
import AchievementsForm from './form';
import {FormattedMessage, injectIntl} from 'react-intl';

const initialState = {
  achievement: {
    id: '',
    name: '',
    description: '',
    thresholdQuantity: '',
    thresholdPercent: '',
    iconUrl: '',
    difficultyId: '',
    topicId: '',
  }
};

const generatedFeatures = componentGenerator({
  displayName: 'achievement',
  pluralDisplayName: 'achievements',
  view: {
    title: 'Achievement',
    elements: [
      { title: '', properties: ['name',
        'description', 'thresholdPercent', 'thresholdQuantity'], element: 'achievements.view.achievement.data' },
    ]
  },
  list: {
    metadata: [
      {
        columnName: 'name',
        displayName: 'Name',
        customComponent: LinkColumn.bind(this),
        session: null,
        route: new Route('/achievements/view/<%= data %>', 'view'),
        path: 'id',
      },
      {
        columnName: 'description',
        displayName: 'Description'
      }
    ],
    queryKeys: ['name', 'description'],
    columns: ['name', 'description']
  },
  createOpts: {
    forms: [
      {
        name: 'achievement',
        component: AchievementsForm,
        stateName: 'achievement'
      }
    ],
    initialState,
    pickAttributes: ['achievement']
  },
  update: {
    initialState,
    forms: [
      {
        name: 'achievement',
        component: AchievementsForm,
        stateName: 'achievement'
      }
    ],
    pickAttributes: ['achievement'],
    viewAttributesToState: [
      { name: 'achievement' }, //Will assume path as root.
    ]
  },
  actions: achievementActions,
  url: 'achievements'
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

class AchievementsMain extends Component {
    constructor(props) {
      super(props);
    };

    render() {
        return (
          <div>
          <SectionTitle
            title={this.props.intl.messages['sidebar.achievements']}
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
  Main: connect(mapStateToProps, mapDispatchToProps)(injectIntl(AchievementsMain)),
  Index: generatedFeatures.list,
  View: generatedFeatures.view,
  Edit: generatedFeatures.update,
  Delete: generatedFeatures.delete,
  Add: generatedFeatures.create
}

export default module;
