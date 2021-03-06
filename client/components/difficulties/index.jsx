import * as axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import {push} from 'react-router-redux';
import {login, logout} from './../../actions/session';
import SectionTitle from './../general/sectionTitle';
import componentGenerator from './../../helpers/generateComponents';
import difficultyActions from './../../actions/difficulties';
import {LinkColumn} from './../general/linkColumn';
import {Route} from './../../models/route';
import DifficultysForm from './form';
import DifficultyGraphData from './graphData';
import {FormattedMessage, injectIntl} from 'react-intl';

const initialState = {
    difficulty: {
        id: '',
        name: '',
        description: '',
        example: '',
        // TO ADD:
        // schoolId / difficultyId
    }
};

const generatedFeatures = componentGenerator({
    displayName: 'difficulty',
    pluralDisplayName: 'difficultys',
    view: {
        title: 'Difficulty',
        elements: [
            {
                title: '',
                properties: [
                    'name', 'description'
                ],
                element: 'difficultys.view.difficulty.data'
            },
            { title: 'charts', template: DifficultyGraphData, element: 'difficultys.view.difficulty.data' },
        ]
    },
    list: {
        metadata: [
            {
                columnName: 'name',
                displayName: 'Name',
                customComponent: LinkColumn.bind(this),
                session: null,
                route: new Route('/difficultys/view/<%= data %>', 'view'),
                path: 'id'
            }, {
                columnName: 'description',
                displayName: 'Description'
            }
        ],
        queryKeys: [
            'name', 'description'
        ],
        columns: ['name', 'description']
    },
    createOpts: {
        forms: [
            {
                name: 'difficulty',
                component: DifficultysForm,
                stateName: 'difficulty'
            }
        ],
        initialState,
        pickAttributes: ['difficulty']
    },
    update: {
        initialState,
        forms: [
            {
                name: 'difficulty',
                component: DifficultysForm,
                stateName: 'difficulty'
            }
        ],
        pickAttributes: ['difficulty'],
        viewAttributesToState: [
            {
                name: 'difficulty'
            }, //Will assume path as root.
        ]
    },
    actions: difficultyActions,
    url: 'difficultys'
});

function mapStateToProps(props) {
    return {
        // session: props.session
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

class DifficultysMain extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div>
                <SectionTitle title={this.props.intl.messages['sidebar.difficulties']}
                    background={'https://wallpaperscraft.com/image/climber_extreme_silhouette_climbing_rock_difficulties_sunset_79975_3840x2160.jpg'}
                    customContent={''}/>
                <br/> {this.props.children}
            </div>
        );
    }
};

const module = {
    Main: connect(mapStateToProps, mapDispatchToProps)(injectIntl(DifficultysMain)),
    Index: generatedFeatures.list,
    View: generatedFeatures.view,
    Edit: generatedFeatures.update,
    Delete: generatedFeatures.delete,
    Add: generatedFeatures.create
}

export default module;
