import { assign } from 'lodash';
import { handleActions, Action } from 'redux-actions';

import constants from './../constants';

const initialState = {
    status: '',
    data: {},
    message: '',
    loading: false
};

var fetch = (state, action) => {
    return _.assign({}, initialState);
}

var loading  = (state, action) => {
    return _.merge({}, state, { status: 'LOADING', loading: true })
}

var success  = (state, action) => {
    return _.merge({}, state, { status: 'SUCCESS', loading: false, data: action.payload.data.data });
}

var failure = (state, action) => {
    return _.merge({}, state, { status: 'FAILURE', loading: false, data: action.payload.error, message: action.payload.error.message });
}

export default handleActions({
  [constants.home.FETCH]: fetch,
  [constants.home.FETCH_LOADING]: loading,
  [constants.home.FETCH_SUCCESS]: success,
  [constants.home.FETCH_FAILURE]: failure,
}, initialState);
