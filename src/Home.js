import React from 'react';
import './App.css';
import MicRecorder from 'mic-recorder-to-mp3';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isRecording: false,
      blobURL: '',
      isBlocked: false,
    };
  }

  

  

  

  render(){
    return (
      <div className="App">
        <header className="App-header">
         <h1>CogniStorm</h1>
         <h4>Artificial Intelligence Dialog Engine</h4>

        </header>
      </div>
    );
  }
}

export default Home;