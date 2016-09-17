import { assign } from 'lodash';
import { handleActions, Action } from 'redux-actions';
import axios from 'axios';

import constants from './../constants';
import config from './../config';
import { SessionModel } from './../models/session';
import { APIError } from './../models/apiError';

const initialState = {
  session: null,
  error: null
};

axios.defaults.baseURL = config.API_ROUTE;

export default handleActions({
  [constants.session.LOGIN]: (state, action)  => {
    // session should be null here (?)
    return initialState;
  },
  [constants.session.LOGIN_IN]: (state, action)  => {
    // session should be null here (?)
    return _.assign({}, { session: new SessionModel(), error: null });
  },

  [constants.session.LOGIN_SUCCESS]: (state, action)  => {
    console.log(action.payload);
    var session = new SessionModel(action.payload.token, action.payload.username, action.payload.name, action.payload.lastName);
    console.log(session);
    axios.defaults.headers.common['Authorization'] = `JWT ${session.token}`;
    return _.assign({}, { session, error: null });
  },
  [constants.session.LOGIN_FAILURE]: (state, action)  => {
    var error = new APIError(action.payload.errorMessage, action.payload.errorCode, action.payload.errorData);
    return _.assign({}, state, { error });
  },
  [constants.session.LOGOUT]: (state, action)  => {
    return _.assign({}, initialState);
  }
}, initialState);
