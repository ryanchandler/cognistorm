import React, { Component } from 'react';
import './App.css';
import Record from './Record';
import Home from './Home';
import Upload from './App'
import Welcome from './Welcome'
import HowToComplete from './HowToComplete'
import HardwareTest from './HardwareTest'
import SessionComplete from './SessionComplete'
//import Graph from './Graph'
import TestQuestion from './TestQuestion'

import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>


            <Route path="/" exact component={Home} />
            <Route path="/Welcome" exact component={Welcome} />
            <Route path="/HowToComplete" exact component={HowToComplete} />
            <Route path="/HardwareTest" exact component={HardwareTest} />
            <Route path="/Record" exact component={Record} />
            <Route path="/SessionComplete" exact componenrt={SessionComplete} />
            
            <Route path="/TestQuestion" exact component={TestQuestion} />

            <Route path="/upload" exact component={Upload} />
            

      </BrowserRouter>
    );
  }
}

export default App;