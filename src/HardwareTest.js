import React from 'react';
import './App.css';
import MicRecorder from 'mic-recorder-to-mp3';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ArrowRight } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';




const Mp3Recorder = new MicRecorder({ bitRate: 128 });


// This will upload the file after having read it
const upload = (file) => {
  fetch('https://huzujy3mjd.execute-api.us-east-1.amazonaws.com/dev/storeaudiotos3', { // Your POST endpoint
    method: 'POST',

    body: file // This is your file object
  }).then(
    response => response.json() // if the response is a JSON object
  ).then(
    success => console.log(success) // Handle the success response object
  ).catch(
    error => console.log(error) // Handle the error response object
  );
};


window.onload=function(){


  // Select your input type file and store it in a variable
const input = document.getElementById('fileinput');



// Event handler executed when a file is selected
const onSelectFile = () => {upload(input.files[0]); console.log("fired");};



}



class HardwareTest extends React.Component {
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
        console.log(blobURL)
        var file = new File([blob], "myFilename.mp3", {type: 'audio/mpeg', lastModified: Date.now()});
        
        
        upload(file)
        

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
        <h1>Audio Hardware Test</h1>
         
        </header>

<div className='consent' > 



<b>Step 1)</b> Press the "Start Recording" button below, say the sentence below then press "Stop Recording"
<p></p>
<br></br>
<div style={{margin:"5px" ,justifyContent: 'center', alignItems: 'center' , display: 'flex' }}>
<p ><b>"Mary had a little lamb it's fleece was white as snow".</b></p> 

<p></p>

</div>









        <div style={{margin:"50px" ,justifyContent: 'center', alignItems: 'center' , display: 'flex' }}>
          <Button style={{width:"150px", margin:"20px"}}  className='button' onClick={this.start} disabled={this.state.isRecording}>Start Recording</Button>
          <Button style={{width:"150px", margin:"20px"}} className='button'  onClick={this.stop} disabled={!this.state.isRecording}>Stop Recording</Button>

          </div>

          <b>Step 2)</b> Listen to the recording that you just made using the player below.  If the sound is too soft speak louder or move the microphone closer to your mouth.  

          If the sound is too loud or distorted move your microphone away from your mouth or reduce mic level in your OS.

          Repeat steps one and two until you are happy with the recording level.
          <div style={{margin:"50px" ,justifyContent: 'center', alignItems: 'center'  , display: 'flex'}}><audio src={this.state.blobURL} controls="button" /></div>

          <br></br>




</div>


          <Link to="/Record">
          <ArrowRight size={80} />
          </Link>
      </div>
    );
  }
}

export default HardwareTest;