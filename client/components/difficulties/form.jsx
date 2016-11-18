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
class DifficultyForm extends Component {
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
                        <label htmlFor="input-difficulty-name" className="control-label">
                            <FormattedMessage id="form.difficultyName"/> *
                        </label>
                        <input type="text" className="form-control"
                            id="input-difficulty-name"
                            onChange={this.props.handleFormChange}
                            value={this.props.name} name='name' required/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="input-difficulty-description" className="control-label">
                            <FormattedMessage id="form.description"/> *
                        </label>
                        <textarea type="text" className="form-control"
                            id="input-difficulty-description"
                            onChange={this.props.handleFormChange}
                            value={this.props.description}
                            name='description' required/>
                    </div>
                </div>
            </div>
        );
    }
};

export default injectIntl(DifficultyForm);
