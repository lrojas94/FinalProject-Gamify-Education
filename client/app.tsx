import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Router, Route, Link, browserHistory} from 'react-router';

import {Hello} from './components/hello.tsx';
import {HelloAgain} from './components/helloAgain.tsx';

class App extends React.Component<{}, {}>{
  render(){
    return (
      <div>
        <h1>Template App</h1>
        <ul>
          <li><Link to="/hello">Hello Module</Link></li>
          <li><Link to="/helloAgain">Hello Again Module</Link></li>
        </ul>
        {this.props.children} {/*This is used so that the router can print correct module.*/}
      </div>
    );
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="hello" component={Hello}/>
      <Route path="helloAgain" component={HelloAgain}/>
    </Route>
  </Router>
), document.getElementById('content'));
