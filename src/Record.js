import React from 'react';
import './App.css';
import MicRecorder from 'mic-recorder-to-mp3';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Button';
const axios = require('axios').default;

const Mp3Recorder = new MicRecorder({ bitRate: 128 });




function postData()
{

const base64 = 'data:application/pdf;base64,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';

run().catch(err => console.log(err));
async function run() {
  const blob = await fetch(base64).then(res => res.blob());

  const formData = new FormData();
  formData.append('yinyang.png', blob);

  // Post the form, just make sure to set the 'Content-Type' header
  const res = await axios.post('https://huzujy3mjd.execute-api.us-east-1.amazonaws.com/dev/storeaudiotos3', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  // Prints "yinyang.png"
  console.log(res.data);
}




}













function getData()
{
// Make a request for a user with a given ID
axios.get('https://16pjyerzdf.execute-api.us-east-1.amazonaws.com/dev/read2', {

headers:{

  'Content-Type': 'text/plain'

}



})
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
}


 

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
      postData();
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
          
          
          </div>
          <div style={{margin:"50px" ,justifyContent: 'center', alignItems: 'center' }}><audio src={this.state.blobURL} controls="controls" /></div>
      </div>
    );
  }
}

export default Record;