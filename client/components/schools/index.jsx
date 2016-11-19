import * as axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import {push} from 'react-router-redux';
import {login, logout} from './../../actions/session';
import SectionTitle from './../general/sectionTitle';
import componentGenerator from './../../helpers/generateComponents';
import schoolActions from './../../actions/schools';
import {LinkColumn} from './../general/linkColumn';
import {Route} from './../../models/route';
import SchoolForm from './form';
import {FormattedMessage, injectIntl} from 'react-intl';

const initialState = {
    school: {
        id: '',
        name: '',
        address: '',
        telephone: '',
        website: '',
        // TO ADD:
        // schoolId / schoolId
    }
};

const generatedFeatures = componentGenerator({
    displayName: 'school',
    pluralDisplayName: 'schools',
    view: {
        title: 'School',
        elements: [
            {
                title: '',
                properties: [
                    'name', 'address', 'telephone', 'website'
                ],
                element: 'schools.view.school.data'
            }
        ]
    },
    list: {
        metadata: [
            {
                columnName: 'name',
                displayName: 'Name',
                customComponent: LinkColumn.bind(this),
                session: null,
                route: new Route('/schools/view/<%= data %>', 'view'),
                path: 'id'
            }, {
                columnName: 'website',
                displayName: 'Website'
            }
        ],
        queryKeys: [
            'name', 'website'
        ],
        columns: ['name', 'website']
    },
    createOpts: {
        forms: [
            {
                name: 'school',
                component: SchoolForm,
                stateName: 'school'
            }
        ],
        initialState,
        pickAttributes: ['school']
    },
    update: {
        initialState,
        forms: [
            {
                name: 'school',
                component: SchoolForm,
                stateName: 'school'
            }
        ],
        pickAttributes: ['school'],
        viewAttributesToState: [
            {
                name: 'school'
            }, //Will assume path as root.
        ]
    },
    actions: schoolActions,
    url: 'schools'
});

function mapStateToProps(props) {
    return {
        // session: props.session
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

class SchoolMain extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div>
                <SectionTitle
                    title={this.props.intl.messages['sidebar.schools']} 
                    background={'http://media.gettyimages.com/videos/hexagon-orange-background-loopable-video-id513620464?s=640x640'}
                    customContent={''}/>
                <br/> {this.props.children}
            </div>
        );
    }
};
const module = {
    Main: connect(mapStateToProps, mapDispatchToProps)(injectIntl(SchoolMain)),
    Index: generatedFeatures.list,
    View: generatedFeatures.view,
    Edit: generatedFeatures.update,
    Delete: generatedFeatures.delete,
    Add: generatedFeatures.create
}

export default module;
