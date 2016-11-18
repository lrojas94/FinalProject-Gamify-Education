import * as axios from 'axios';
import React, {Component} from 'react';
import Griddle from 'griddle-react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {Route} from './../../models/route';
import AutoFillSelectBox from './../general/autoFillSelectBox';
import groupActions from './../../actions/groups';
import {FormattedMessage, injectIntl} from 'react-intl';

/**
 * This method does not bother createing the form. Instead, it will return the fields so that they can be
 * added anywhere they seem to be needed.
 */
function mapStateToProps(props) {
    return {
        groups: {
            options: props.groups.options
        }
    }
};

function mapDispatchToProps(dispatch) {
    return {
        fetchSchoolOptions: (search) => dispatch(groupActions.fetchOptions(search))
    }
};

class StudentForm extends Component {
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
                        {this.props.id
                            ? (<input type='hidden' name='id' value={this.props.id}/>)
                            : ''}
                        <label htmlFor="input-student-username" className="control-label">
                            <FormattedMessage id="login.username" /> *
                        </label>
                        <input type="text" className="form-control"
                            id="input-student-username"
                            onChange={this.props.handleFormChange}
                            value={this.props.username}
                            name='username' required/>
                    </div>
                </div>
                <div className='col-xs-12'>
                    <div className="form-group">
                        <AutoFillSelectBox
                            searchTitle={this.props.intl.messages['form.group']}
                            fetch={this.props.fetchSchoolOptions}
                            handleFormChange={this.props.handleFormChange}
                            name={'groupId'}
                            selected={this.props.groupId}
                            items={this.props.groups.options.data}
                            required={true}/>
                    </div>
                </div>
            </div>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(StudentForm));
