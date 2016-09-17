import { combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { SessionState } from './../models/session';
import session from './session';
import navbar from './navbar';
import teachers from './teachers';
import problems from './problems';

export default combineReducers({
  session,
  navbar,
  routing: routerReducer,
  teachers,
  problems
});