import { createAction, Action } from 'redux-actions';
import * as axios from 'axios';
import { LOGIN, LOGOUT, LOGIN_SUCCESS, LOGIN_FAILURE } from './../constants';
import { Session } from './../models/session';

export const login = createAction(
  LOGIN,
  (username: string, password: string, dispatch) => {
    return (dispatch) => {
      axios.post('/api/login', {
          username,
          password
      })
      .then(
        (res) => {
          dispatch(loginSuccess(res.data));
        },
        (err) => console.log(err)
      );
    };
  }
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  (session: Session) => {
    return session;
  }
);

export const logout = createAction(
  LOGOUT,
  () => {}
);
