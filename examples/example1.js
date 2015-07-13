// an example of using ClickHere
'use strict';

import React from 'react';
import ClickHere from '../src/ClickHere';

class Example1 extends React.Component {

  render() {
    return (
      <div>

        <h1>Hello, stranger!</h1>

        <div>
          <ClickHere>
            <a href='http://imgur.com/a/J7kZJ'>Click here</a>
          </ClickHere>
          &nbsp;
          to see some photos of Alaska.
        </div>

      </div>
    );
  }

};

React.render(<Example1 />, window.document.getElementById('app'));
