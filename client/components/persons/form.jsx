import * as axios from 'axios';
import React, {Component} from 'react';
import Griddle from 'griddle-react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {Route} from './../../models/route';
import {FormattedMessage, injectIntl} from 'react-intl';

/**
 * This method does not bother createing the form. Instead, it will return the fields so that they can be
 * added anywhere they seem to be needed.
 */
class PersonForm extends Component {
    constructor(props) {
        super(props);

    };

    render() {
        return (
            <div className='row'>
                <div className='col-xs-12'>
                    <div className="form-group">
                        {this.props.id
                            ? (<input type='hidden' name='id' value={this.props.id}/>)
                            : ''}
                        <label htmlFor="input-person-name" className="control-label">
                            <FormattedMessage id="form.name" /> *
                        </label>
                        <input type="text" className="form-control"
                            id="input-person-username"
                            onChange={this.props.handleFormChange}
                            value={this.props.name}
                            name='name' required/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="input-person-lastName" className="control-label">
                            <FormattedMessage id="form.lastName" /> *
                        </label>
                        <input type="text" className="form-control"
                            id="input-person-lastName"
                            onChange={this.props.handleFormChange}
                            value={this.props.lastName}
                            name='lastName' required/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="input-person-bday" className="control-label">
                            <FormattedMessage id="form.birthDate" /> *
                        </label>
                        <input type="text" className="form-control"
                            id="input-person-bday"
                            onChange={this.props.handleFormChange}
                            value={this.props.birthDay}
                            name='birthDay' required/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="input-person-gender" className="control-label">
                            <FormattedMessage id="form.gender" /> *
                        </label>
                        <select id='input-person-gender'
                            value={this.props.gender}
                            defaultValue={'m'}
                            className='form-control'
                            onChange={this.props.handleFormChange}
                            name='gender' required>
                            <option value='m'>
                                <FormattedMessage id="form.boy" />
                            </option>
                            <option value='h'>
                                <FormattedMessage id="form.girl" />
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }
};

export default injectIntl(PersonForm);
