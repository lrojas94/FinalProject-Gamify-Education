import { combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { SessionState } from './../models/session';
import session from './session';

export interface Reducers {
  session: SessionState;
}

export default combineReducers({
  session,
  routing: routerReducer
});
