import React from 'react';
import './App.css';
import MicRecorder from 'mic-recorder-to-mp3';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

//const axios = require('axios').default;

const Mp3Recorder = new MicRecorder({ bitRate: 128 });


window.onload=function(){


  // Select your input type file and store it in a variable
const input = document.getElementById('fileinput');

// This will upload the file after having read it
const upload = (file) => {
  fetch('https://huzujy3mjd.execute-api.us-east-1.amazonaws.com/dev/storeaudiotos3', { // Your POST endpoint
    method: 'POST',
  //  headers: {
      // Content-Type may need to be completely **omitted**
      // or you may need something
    //  "Content-Type": "application/pdf"
   // },
    body: file // This is your file object
  }).then(
    response => response.json() // if the response is a JSON object
  ).then(
    success => console.log(success) // Handle the success response object
  ).catch(
    error => console.log(error) // Handle the error response object
  );
};

// Event handler executed when a file is selected
const onSelectFile = () => {upload(input.files[0]); console.log("fired");};

// Add a listener on your input
// It will be triggered when a file will be selected
input.addEventListener('change', onSelectFile, false);

}

// function getData()
// {
// // Make a request for a user with a given ID
// axios.get('https://16pjyerzdf.execute-api.us-east-1.amazonaws.com/dev/read2', {

// headers:{
  

//   'Content-Type': 'text/plain'

// }


// })
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });
// }


 

class Record extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isRecording: false,
      blobURL: '',
      isBlocked: false,
    };
  }

  start = () => {
    if (this.state.isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          this.setState({ isRecording: true });
        }).catch((e) => console.error(e));
    }
  };

  stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        this.setState({ blobURL, isRecording: false });
      }).catch((e) => console.log(e));
      
      
  };

  componentDidMount() {
    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        this.setState({ isBlocked: false });
      },
      () => {
        console.log('Permission Denied');
        this.setState({ isBlocked: true })
      },
    );
  }



  

  render(){
    return (
      <div className="App">
        <header className="App-header-short">
        <h1>CogniStorm</h1>
         <h4>Artificial Intelligence Dialog Engine</h4>
        </header>
        <div style={{margin:"50px" ,justifyContent: 'center', alignItems: 'center'  }}>
          <Button style={{width:"150px", margin:"20px"}}  className='button' onClick={this.start} disabled={this.state.isRecording}>Record</Button>
          <Button style={{width:"150px", margin:"20px"}} className='button'  onClick={this.stop} disabled={!this.state.isRecording}>Stop</Button>
          <input type="file" id="fileinput"></input>
         
          </div>
          <div style={{margin:"50px" ,justifyContent: 'center', alignItems: 'center' }}><audio src={this.state.blobURL} controls="controls" /></div>
      </div>
    );
  }
}

export default Record;