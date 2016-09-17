import _ from 'lodash';

export class SessionModel {
  isLoggedIn: boolean = false;
  isLoggingIn: boolean = false;
  _username: string;
  _token: string;
  _name: string;
  _lastName: string;

  _errorMessage: string;
  _errorCode: number;

  constructor(token, username, name, lastName) {
    if(!arguments.length) {
      this.isLoggedIn = false;
      this.isLoggingIn = true;
      return;
    }

    this._username = username;
    this._token = token;
    this._name = name;
    this._lastName = lastName;

    this.isLoggedIn = true;
  }

  get username() { return this._username }
  get token() { return this._token }
  get name() { return this._name }
  get errorMessage() { return this._errorMessage }
  get errorCode() { return this._errorCode }
  setErrorMessage(errorMessage, errorCode) {
    this._errorMessage = errorMessage;
    this._errorCode = errorCode;
    this.isLoggedIn = false;
  }

  hasPermission() {
    return true;
  }

}
