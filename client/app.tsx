import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk-fsa';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import { Sidenav, Header } from './components/core';
import { Dashboard } from './components/dashboard';
import reducers, {Reducers} from './reducers';
import { Session, SessionState } from './models/session';
import {login, logout} from './actions/session';

interface IAppProps {
  session: Session;
  login: (username: string, password: string) => void;
  logout: () => void;
}

function mapStateToProps({session}: Reducers) {
  console.log(session);
  return {
    session: session.session
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (username: string, password: string) => dispatch(login(username, password)),
    logout: () => dispatch(logout())
  };
}


class App extends React.Component<IAppProps, {}> {
  public render() {
    return (
      <div>
        <button onClick={() => this.props.login('lrojas','rojass')}>{this.props.session ? this.props.session.name : 'LOG IN'}</button>
        <Header />
        <div className="clearfix"> </div>
        <div className="page-container">
          <Sidenav />
          {/*Here should go the main site.*/}
          {this.props.children} {/*This is used so that the router can print correct module.*/}
          {console.log(this.props.session)}
        </div>
      </div>
    );
  }
}

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

const history = syncHistoryWithStore(browserHistory, store);
const AppModule = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={AppModule}>
        <IndexRoute component={Dashboard}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('content'));
