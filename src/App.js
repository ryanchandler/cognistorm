import React, { Component } from 'react';
import './App.css';
import Record from './Record';
import Home from './Home';
import Upload from './App'
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>


            <Route path="/" exact component={Home} />
            <Route path="/record" exact component={Record} />
            <Route path="/upload" exact component={Upload} />


      </BrowserRouter>
    );
  }
}

export default App;