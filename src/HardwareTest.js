import React from "react";
import "./App.css";
import MicRecorder from "mic-recorder-to-mp3";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { ArrowRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import cookie from 'react-cookies'
import { Route, Redirect } from 'react-router'


const Mp3Recorder = new MicRecorder({ bitRate: 128 });

// This will upload the file after having read it
const upload = (file) => {
  fetch(
    "https://huzujy3mjd.execute-api.us-east-1.amazonaws.com/dev/storeaudiotos3",
    {
      // Your POST endpoint
      method: "POST",

      body: file, // This is your file object
    }
  )
    .then(
      (response) => response.json() // if the response is a JSON object
    )
    .then(
      (success) => console.log(success) // Handle the success response object
    )
    .catch(
      (error) => console.log(error) // Handle the error response object
    );
};

window.onload = function () {
  // Select your input type file and store it in a variable
  const input = document.getElementById("fileinput");

  // Event handler executed when a file is selected
  const onSelectFile = () => {
    upload(input.files[0]);
    console.log("fired");
  };
};

class HardwareTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectCookie: cookie.load("subjectUUID"),
      isRecording: false,
      blobURL: "",
      isBlocked: false,
    };
  }

  start = () => {
    if (this.state.isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          this.setState({ isRecording: true });
        })
        .catch((e) => console.error(e));
    }
  };

  stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        this.setState({ blobURL, isRecording: false });
        console.log(blobURL);
        var file = new File([blob], "myFilename.mp3", {
          type: "audio/mpeg",
          lastModified: Date.now(),
        });

        upload(file);
      })
      .catch((e) => console.log(e));
  };

  componentDidMount() {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        this.setState({ isBlocked: false });
      },
      () => {
        console.log("Permission Denied");
        this.setState({ isBlocked: true });
      }
    );
  }

  render() {

    
    if (!this.state.subjectCookie) {
      return <Redirect to="/ErrorPage" />
    }


    return (
      <div>
        <header className="App-header-short">
          <h1>Audio Hardware Test</h1>
        </header>

        <div style={{ margin: "50px" }}>
          <b style={{ fontSize: "large" }}>Step 1)   </b>Press the "Start
          Recording" button
          <Button
            style={{ width: "150px", margin: "20px" }}
            className="button"
            onClick={this.start}
            disabled={this.state.isRecording}
          >
            Start Recording
          </Button>
          <br></br>
      

          <b style={{ fontSize: "large" }}>Step 2)   </b>Say
          <b style={{ fontSize: "large" }}>
            {" "}
            "This is a test of my recording device"
          </b>
          <br></br>
     
  
          <b style={{ fontSize: "large" }}>Step 3)  </b> Press the "Stop
          Recording" button
          <Button
            style={{ width: "150px", margin: "20px" }}
            className="button"
            onClick={this.stop}
            disabled={!this.state.isRecording}
          >
            Stop Recording
          </Button>

          
          <br></br>
          <b style={{ fontSize: "large" }}>Step 4)  </b> Click the play button
          below to listen to the recording.
          <br></br>
          <div
            style={{
              margin: "50px",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <audio src={this.state.blobURL} controls="button" />
          </div>
          If the sound is <b>too soft</b> speak louder or move the microphone
          closer to your mouth or increase mic level in your OS<p></p>
          If the sound is <b>too loud or distorted </b>
          move your microphone away from your mouth or reduce mic level in your
          OS. <br></br>
          <p></p>
          Repeat steps one through four until you are happy with the recording
          level. Then proceed using the arrow below.
          <br></br>
          <div
            style={{
              margin: "50px",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link to="/Instructions">
              <ArrowRight size={80} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default HardwareTest;
