import { assign } from 'lodash';
import { handleActions, Action } from 'redux-actions';

import constants from './../constants';

const initialState = {
  docked: true,
  open: false
};

var docking = (state, action) => {
  return {
    docked: action.payload.docked,
    open: state.open
  };
}

var toggling = (state, action)  => {
  return {
    docked: state.docked,
    open: action.payload.open
  }
}

export default handleActions({
  [constants.navbar.UNDOCK_NAVBAR]: docking,
  [constants.navbar.DOCK_NAVBAR]: docking,
  [constants.navbar.OPEN_NAVBAR]: toggling,
  [constants.navbar.CLOSE_NAVBAR]: toggling,
  [constants.navbar.TOGGLE_NAVBAR]: toggling
}, initialState);
