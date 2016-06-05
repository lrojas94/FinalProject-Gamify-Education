import * as React from 'react';

interface HelloAgainInterface {
  message: String,
  reachingFrom?: String
}

export class HelloAgain extends React.Component<HelloAgainInterface,{}>{
  render() {
    return (
      <div>
      This is a react hello AGAIN Module!
      <br/>
      <strong>Im Being reached from: {this.props.reachingFrom || "HelloAgain Module"}</strong>
      <br/>
      {this.props.message ? <div>I recieved a message!: <strong>{this.props.message}</strong></div> : ''}
      </div>
    );
  }
}
