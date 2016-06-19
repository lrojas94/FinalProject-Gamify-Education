import AppDispatcher from '../dispatcher/AppDispatcher';
import AuthConstants from '../constants/AuthConstants';
import AuthActions from '../actions/AuthActions';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

function setUser(token: string) {
    if (!localStorage.getItem('id_token')) {
        localStorage.setItem('id_token', token);
    }
}

function removeUser() {
    localStorage.removeItem('id_token');
}

class AuthStoreClass extends EventEmitter {
    public emitChange(): void {
        this.emit(CHANGE_EVENT);
    }

    public addChangeListener(callback): void {
        this.on(CHANGE_EVENT, callback);
    }

    public removeChangeListener(callback): void {
        this.removeListener(CHANGE_EVENT, callback);
    }

    public isAuthenticated(): boolean {
        if (localStorage.getItem('id_token')) {
          return true;
        }
        return false;
    }

    public getToken(): string {
        return localStorage.getItem('id_token');
    }

}

const AuthStore: AuthStoreClass = new AuthStoreClass();

// Here we register a callback for the dispatcher
// and look for our various action types so we can
// respond appropriately
AuthStore.dispatchToken = AppDispatcher.register((action) => {

  switch (action.actionType) {

    case AuthConstants.LOGIN_USER:
      setUser(action.token);
      AuthStore.emitChange();
      break;

    case AuthConstants.LOGOUT_USER:
      removeUser();
      AuthStore.emitChange();
      break;

    default:
    break;
  }

});

export default AuthStore;
