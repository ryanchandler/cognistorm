import React, { Component } from 'react';
import './App.css';
import Record from './Record';
import Home from './Home';
import Upload from './App'
import Welcome from './Welcome'
import Instructions from './Instructions'
import HardwareTest from './HardwareTest'
import SessionComplete from './SessionComplete'
//import Graph from './Graph'
import TestQuestion from './TestQuestion'
import Consent from './Consent'
import Testing from './Testing'
import ErrorPage from './ErrorPage'

import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>


            <Route path="/" exact component={Home} />
            <Route path="/Welcome" exact component={Welcome} />
            <Route path="/Instructions" exact component={Instructions} />
            <Route path="/HardwareTest" exact component={HardwareTest} />
            <Route path="/Record" exact component={Record} />
            <Route path="/SessionComplete" exact component={SessionComplete} />
            
            <Route path="/TestQuestion" exact component={TestQuestion} />
            <Route path="/Consent" exact component={Consent} />
            <Route path="/upload" exact component={Upload} />
            <Route path="/Testing" exact component={Testing} />
            <Route path="/ErrorPage" exact component={ErrorPage} />
            

      </BrowserRouter>
    );
  }
}

export default App;