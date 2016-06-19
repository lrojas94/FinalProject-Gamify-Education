import AppDispatcher from '../dispatcher/AppDispatcher';
import AuthConstants from '../constants/Constants';

export default {
    logUserIn: (token) => {
        AppDispatcher.dispatch({
            actionType: AuthConstants.LOGIN_USER,
            token: token
        });
    },

    logUserOut: () => {
        AppDispatcher.dispatch({
            actionType: AuthConstants.LOGOUT_USER
        });
    }

};
