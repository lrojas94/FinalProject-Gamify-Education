import * as React from 'react';
import {Link} from 'react-router';
import * as $ from 'jquery';
import {HelloAgain} from "./helloAgain.tsx";

export class Hello extends React.Component<{},{}>{
    displayName : String = 'Hello'
    private sendGet(e) {
        e.preventDefault();
        //Init ajax call:
        $.ajax({
            url: '/api',
            method: 'GET',
            dataType: 'json',
            data: { msg: "Hello Server with Get!" },
            success: function(data) {
                console.log(data);
            }
        });
    }

    private sendPost(e){
        e.preventDefault();
        //Init ajax call:
        $.ajax({
            url: '/api',
            method: 'POST',
            dataType: 'json',
            data: { msg: "Hello Server with Post!" },
            success: function(data) {
                console.log(data);
            }
        });
    }

    render(){
        return (
          <div>
              <div>This is a react hello module </div>
              <br/>
              <input type='button' onClick={this.sendGet} value='GET API Data'/>
              <br/>
              <input type='button' onClick={this.sendPost} value='POST API Data'/>
              <br/>
              <HelloAgain message="this is a test message"  />
          </div>
        );
    }
}
