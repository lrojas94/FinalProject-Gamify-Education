import { createAction, Action } from 'redux-actions';
import * as axios from 'axios';
import constants from './../constants/';

export const openNavbar = createAction(
  constants.navbar.OPEN_NAVBAR,
  () => {
    return {
      open: true
    };
  }
);

export const closeNavbar = createAction(
  constants.navbar.CLOSE_NAVBAR,
  () => {
    return {
      open: true
    };
  }
);

export const toggleNavbar = createAction(
  constants.navbar.TOGGLE_NAVBAR,
  (currentState) => {
    return {
      open: !currentState
    };
  }
);

export const dockNavbar = createAction(
  constants.navbar.DOCK_NAVBAR,
  () => {
    return {
      docked: true
    };
  }
);
export const undockNavbar = createAction(
  constants.navbar.UNDOCK_NAVBAR,
  () => {
    return {
      docked: false
    };
  }
)
