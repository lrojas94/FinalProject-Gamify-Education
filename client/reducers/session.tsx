import { assign } from 'lodash';
import { handleActions, Action } from 'redux-actions';

import { LOGIN, LOGOUT, LOGIN_SUCCESS } from './../constants';
import {Session, SessionState} from './../models/session';

const initialState: SessionState = {
  loggedIn: false,
  session: null
};

export default handleActions<SessionState, any>({
  [LOGIN]: (state: SessionState, action: Action<Promise<Session>>) : SessionState => {
    // session should be null here (?)
    return initialState;
  },
  [LOGIN_SUCCESS]: (state: SessionState, action: Action<Session>) : SessionState => {
    return {
      loggedIn: true,
      session: action.payload
    };
  },
  [LOGOUT]: (state: SessionState, session: Action<void>) : SessionState => {
    return {
      loggedIn: false,
      session: null
    };
  }
}, initialState);
