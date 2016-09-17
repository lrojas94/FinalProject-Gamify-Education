import { createAction, Action } from 'redux-actions';
import * as axios from 'axios';
import constants from './../constants/';
import { push } from 'react-router-redux';
import { SessionModel } from './../models/session';

export const login = createAction(
  constants.session.LOGIN,
  (username, password, dispatch) => {
    return (dispatch) => {
      dispatch(logginIn())
      axios.post('/authenticate', {
          username,
          password
      })
      .then(
        (res) => {
          if(res.data.status === 0) {
            var data = res.data.data;
            var session = {
              token: data.token,
              username: data.username,
              name: data.name,
              lastName: data.lastName
            };

            dispatch(loginSuccess(session));

          }
          else {
            var session = {
              errorMessage: res.data.message,
              errorCode: null
            };

            dispatch(loginFailure(session));
          }

        },
        (err) => console.log(err)
      );
    };
  }
);

const logginIn = createAction(
  constants.session.LOGIN_IN,
  () => {
    return {}
  }
)


export const loginFailure = createAction(
  constants.session.LOGIN_FAILURE,
  (error) => {
    return error;
  }
);

export const loginSuccess = createAction(
  constants.session.LOGIN_SUCCESS,
  (session) => {
    return session;
  }
);

export const logout = createAction(
  constants.session.LOGOUT,
  () => {
    return (dispatch) => {
      dispatch(push('/login'));
    }
  }
);
