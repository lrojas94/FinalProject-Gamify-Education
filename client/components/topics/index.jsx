import * as axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import {push} from 'react-router-redux';
import {login, logout} from './../../actions/session';
import SectionTitle from './../general/sectionTitle';
import componentGenerator from './../../helpers/generateComponents';
import topicActions from './../../actions/topics';
import {LinkColumn} from './../general/linkColumn';
import {Route} from './../../models/route';
import TopicsForm from './form';
import TopicGraphData from './graphData';
import {FormattedMessage, injectIntl} from 'react-intl';

const initialState = {
    topic: {
        id: '',
        name: '',
        description: '',
        example: '',
        groupId: ''
    }
};

const generatedFeatures = componentGenerator({
    displayName: 'topic',
    pluralDisplayName: 'topics',
    view: {
        title: 'Topic',
        elements: [
            {
                title: '',
                properties: [
                    'name', 'description', 'example'
                ],
                element: 'topics.view.topic.data'
            },
            { title: 'charts', template: TopicGraphData, element: 'topics.view.topic.data' },

        ]
    },
    list: {
        metadata: [
            {
                columnName: 'name',
                displayName: 'Name',
                customComponent: LinkColumn.bind(this),
                session: null,
                route: new Route('/topics/view/<%= data %>', 'view'),
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
                name: 'topic',
                component: TopicsForm,
                stateName: 'topic'
            }
        ],
        initialState,
        pickAttributes: ['topic']
    },
    update: {
        initialState,
        forms: [
            {
                name: 'topic',
                component: TopicsForm,
                stateName: 'topic'
            }
        ],
        pickAttributes: ['topic'],
        viewAttributesToState: [
            {
                name: 'topic'
            }, //Will assume path as root.
        ]
    },
    actions: topicActions,
    url: 'topics'
});

function mapStateToProps(props) {
    return {
        // session: props.session
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

class TopicsMain extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div>
                <SectionTitle
                    title={this.props.intl.messages['sidebar.topics']}
                    background={'http://media.gettyimages.com/videos/hexagon-orange-background-loopable-video-id513620464?s=640x640'}
                    customContent={''}/>
                <br/> {this.props.children}
            </div>
        );
    }
};

const module = {
    Main: connect(mapStateToProps, mapDispatchToProps)(injectIntl(TopicsMain)),
    Index: generatedFeatures.list,
    View: generatedFeatures.view,
    Edit: generatedFeatures.update,
    Delete: generatedFeatures.delete,
    Add: generatedFeatures.create
}

export default module;
