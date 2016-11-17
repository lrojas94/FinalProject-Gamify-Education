import { combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { SessionState } from './../models/session';
import session from './session';
import navbar from './navbar';
import teachers from './teachers';
import students from './students';
import problems from './problems';
import topics from './topics';
import schools from './schools';
import groups from './groups';
import achievements from './achievements';
import difficultys from './difficulties';

export default combineReducers({
  session,
  navbar,
  routing: routerReducer,
  teachers,
  problems,
  topics,
  schools,
  groups,
  achievements,
  difficultys,
  students
});
