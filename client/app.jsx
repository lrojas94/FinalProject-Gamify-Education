import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import { Provider, connect } from 'react-redux';
import {addLocaleData, IntlProvider} from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import localeData from './i18n';

import thunk from 'redux-thunk-fsa';
import loggerMiddleware  from 'redux-logger';
import { routerMiddleware, push } from 'react-router-redux'


import reducers from './reducers';
//Components:
import { AppModule as App } from './components/app';
import { HomeIndexModule as HomeIndex } from './components/home/index';
import { LoginModule as Login } from './components/home/login';
import Teachers from './components/teachers/index';
import Students from './components/students/index';
import Problems from './components/problems/index';
import Topics from './components/topics/index';
import Schools from './components/schools/index';
import Groups from './components/groups/index';
import Difficulties from './components/difficulties/index';
import Achievements from './components/achievements/index';
const routerMiddlewareInstance = routerMiddleware(browserHistory)

addLocaleData([...en,...es]);
// Define user's language. Different browsers have the user locale defined
// on different fields on the `navigator` object, so we make sure to account
// for these different by checking all of them
const language = (navigator.languages && navigator.languages[0]) ||
                     navigator.language ||
                     navigator.userLanguage;
// Split locales with a region code
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
// Try full locale, fallback to locale without region code, fallback to en
const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en;
const store = createStore(reducers, applyMiddleware(thunk, routerMiddlewareInstance),);

ReactDOM.render((
    <Provider store={store}>
        <IntlProvider locale={language} messages={messages}>
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

		<Route path='students' component={Students.Main}>
		  <IndexRoute component={Students.Index}/>
		  <Router path='add' component={Students.Add}/>
		  <Route path='view/:studentId' component={Students.View}/>
		  <Route component={Students.View}>
		    <Route path='edit/:studentId' component={Students.Edit}/>
		  </Route>
		  <Route component={Students.View}>
		    <Route path='delete/:studentId' component={Students.Delete}/>
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

		<Route path='topics' component={Topics.Main}>
		  <IndexRoute component={Topics.Index}/>
		  <Router path='add' component={Topics.Add}/>
		  <Route path='view/:topicId' component={Topics.View}/>
		  <Route component={Topics.View}>
		    <Route path='edit/:topicId' component={Topics.Edit}/>
		  </Route>
		  <Route component={Topics.View}>
		    <Route path='delete/:topicId' component={Topics.Delete}/>
		  </Route>
		</Route>
		<Route path='schools' component={Schools.Main}>
		  <IndexRoute component={Schools.Index}/>
		  <Router path='add' component={Schools.Add}/>
		  <Route path='view/:schoolId' component={Schools.View}/>
		  <Route component={Schools.View}>
		    <Route path='edit/:schoolId' component={Schools.Edit}/>
		  </Route>
		  <Route component={Schools.View}>
		    <Route path='delete/:topicId' component={Schools.Delete}/>
		  </Route>
		</Route>
		<Route path='groups' component={Groups.Main}>
		  <IndexRoute component={Groups.Index}/>
		  <Router path='add' component={Groups.Add}/>
		  <Route path='view/:groupId' component={Groups.View}/>
		  <Route component={Groups.View}>
		    <Route path='edit/:groupId' component={Groups.Edit}/>
		  </Route>
		  <Route component={Groups.View}>
		    <Route path='delete/:topicId' component={Groups.Delete}/>
		  </Route>
		</Route>

		<Route path='difficultys' component={Difficulties.Main}>
		  <IndexRoute component={Difficulties.Index}/>
		  <Router path='add' component={Difficulties.Add}/>
		  <Route path='view/:difficultyId' component={Difficulties.View}/>
		  <Route component={Difficulties.View}>
		    <Route path='edit/:difficultyId' component={Difficulties.Edit}/>
		  </Route>
		  <Route component={Difficulties.View}>
		    <Route path='delete/:difficultyId' component={Difficulties.Delete}/>
		  </Route>
		</Route>

		<Route path='achievements' component={Achievements.Main}>
		  <IndexRoute component={Achievements.Index}/>
		  <Router path='add' component={Achievements.Add}/>
		  <Route path='view/:achievementId' component={Achievements.View}/>
		  <Route component={Achievements.View}>
		    <Route path='edit/:achievementId' component={Achievements.Edit}/>
		  </Route>
		  <Route component={Achievements.View}>
		    <Route path='delete/:achievementId' component={Achievements.Delete}/>
		  </Route>
		</Route>

                </Route>
            </Router>
        </IntlProvider>
    </Provider>
), document.getElementById('content'));
