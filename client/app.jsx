import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Router, Route, Link, IndexRoute, browserHistory} from 'react-router';
import { Provider, connect } from 'react-redux';

import thunk from 'redux-thunk-fsa';
import loggerMiddleware  from 'redux-logger';
import { routerMiddleware, push } from 'react-router-redux'


import reducers from './reducers';
//Components:
import { AppModule as App } from './components/app';
import { HomeIndexModule as HomeIndex } from './components/home/index';
import { LoginModule as Login } from './components/home/login';
import Teachers from './components/teachers/index';
import Problems from './components/problems/index';
const routerMiddlewareInstance = routerMiddleware(browserHistory)

const store = createStore(
  reducers,
  applyMiddleware(thunk, routerMiddlewareInstance)
);

console.log(Teachers);

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={HomeIndex}/>
        <Route path='login' component={Login}/>

        <Route path='teachers' component={Teachers.Main}>
          <IndexRoute component={Teachers.Index}/>
          <Router path='add' component={Teachers.Add}/>
          <Route path='view/:teacherId' component={Teachers.View}/>
          <Route component={Teachers.View}>
            <Route path='edit/:teacherId' component={Teachers.Edit}/>
          </Route>
          <Route component={Teachers.View}>
            <Route path='delete/:teacherId' component={Teachers.Delete}/>
          </Route>
        </Route>

        <Route path='problems' component={Problems.Main}>
          <IndexRoute component={Problems.Index}/>
          <Router path='add' component={Problems.Add}/>
          <Route path='view/:problemId' component={Problems.View}/>
          <Route component={Problems.View}>
            <Route path='edit/:problemId' component={Problems.Edit}/>
          </Route>
          <Route component={Problems.View}>
            <Route path='delete/:problemId' component={Problems.Delete}/>
          </Route>
        </Route>
      </Route>
    </Router>
  </Provider>
), document.getElementById('content'));
