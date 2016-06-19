import AppDispatcher from '../dispatcher/AppDispatcher';
import AuthConstants from '../constants/Constants';
import AuthActions from '../actions/AuthActions';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';
const JWT_ID_TOKEN_STRING = 'id_token';

function setUserToken(token: string) {
    if (!localStorage.getItem(JWT_ID_TOKEN_STRING)) {
        localStorage.setItem(JWT_ID_TOKEN_STRING, token);
    }
}

function removeUserToken() {
    localStorage.removeItem(JWT_ID_TOKEN_STRING);
}

class AuthStoreClass extends EventEmitter {
    public emitChange(): void {
        this.emit(CHANGE_EVENT);
    }

    public addChangeListener(callback: Function): void {
        this.on(CHANGE_EVENT, callback);
    }

    public removeChangeListener(callback: Function): void {
        this.removeListener(CHANGE_EVENT, callback);
    }

    public isAuthenticated(): boolean {
        if (localStorage.getItem(JWT_ID_TOKEN_STRING)) {
          return true;
        }
        return false;
    }

    public getToken(): string {
        return localStorage.getItem(JWT_ID_TOKEN_STRING);
    }

}

const AuthStore: AuthStoreClass = new AuthStoreClass();

// Here we register a callback for the dispatcher
// and look for our various action types so we can
// respond appropriately
AuthStore.dispatchToken = AppDispatcher.register(action => {
    switch (action.actionType) {
        case AuthConstants.LOGIN_USER:
            setUserToken(action.token);
            AuthStore.emitChange();
            break;
        case AuthConstants.LOGOUT_USER:
            removeUserToken();
            AuthStore.emitChange();
            break;
        default:
            break;
    }
});

export default AuthStore;
