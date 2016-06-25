import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router';

import {Hello} from './components/hello.tsx';
import {HelloAgain} from './components/helloAgain.tsx';
import {Header} from './components/core/header';
import {Sidenav} from './components/core/sidenav';
import {Dashboard} from './components/dashboard/dashboard';

class App extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
        <Header />
        <div className="clearfix"> </div>
        <div className="page-container">
          <Sidenav />
          {/*Here should go the main site.*/}
          {this.props.children} {/*This is used so that the router can print correct module.*/}
        </div>
      </div>
    );
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
    </Route>
  </Router>
), document.getElementById('content'));
