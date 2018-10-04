import React, { Component } from 'react';
import Broadcast from './services/broadcast'
import Capture from './services/capture'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Broadcast />
        <Capture />
      </div>
    );
  }
}

export default App;
