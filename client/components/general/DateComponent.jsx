import * as axios from 'axios';
import React, { Component } from 'react';
import Griddle from 'griddle-react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as moment from 'moment';

class DateComponent extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <p>{moment.default(this.props.data).format('DD/MM/YYYY')}</p>
        )
    };
};

export default DateComponent;
