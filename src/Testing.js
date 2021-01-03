import React from "react";
import { Route, Redirect } from "react-router";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import cookie from "react-cookies";
import { v4 as uuidv4 } from "uuid";
import { ArrowRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import UserPrompt from "./UserPrompt";
import MicRecorder from "mic-recorder-to-mp3";

const axios = require("axios").default;
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class Testing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectCookie: cookie.load("subjectUUID"),
      dimension: "",
      backchannel: "",
      selectedDegree: "",
      degree1Label: "",
      degree2Label: "",
      currentTaskNumber: 0,
      uid: "",
      isRecording: false,
      blobURL: "",
      isBlocked: false,
      trialID: "",  
      trialStatus: false,
      play: true
    };


    this.audio = new Audio("http://soundbible.com/grab.php?id=989&type=mp3");

    this.getNextTask = this.getNextTask.bind(this);
    this.myUpload = this.myUpload.bind(this);
  }

  // This will upload the file after having read it
  myUpload = ({ file }) => {
    fetch(
      "https://huzujy3mjd.execute-api.us-east-1.amazonaws.com/dev/storeaudiotos3?trialID=" +
        this.state.trialID,
      {
        // Your POST endpoint
        method: "POST",

        body: file,
        // This is your file object
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
    console.log(this.state.trialID);
  };

  componentDidMount() {


    let audio = new Audio("http://soundbible.com/grab.php?id=989&type=mp3")
    
 

    fetch(
      "https://16pjyerzdf.execute-api.us-east-1.amazonaws.com/dev/read?uid=" +
        this.state.subjectCookie
    )
      .then((data) => data.json())
      .then((data) =>
        this.setState({
          dimension: data.dimension,
          backchannel: data.backchannel,
          selectedDegree: data.selectedDegree,
          degree1Label: data.degree1Label,
          degree2Label: data.degree2Label,
          uid: data.uid,
          trialID: data.trialID,
        })
      );

    cookie.save("CurrentlyAssignedTask", true);

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

  getNextTask = (e) => {
    e.preventDefault();

    this.setState(
      { currentTaskNumber: this.state.currentTaskNumber + 1 },
      console.log(this.state.currentTaskNumber)
    );
    window.location.reload(false)
  };

  start = () => {



    if (this.state.isBlocked) {
      console.log("Permission Denied");
    } else {

      this.audio.play();
      console.log("playing");
      this.setState({ isRecording: true });
      this.setState({ trialStatus: false });
      this.audio.addEventListener('ended', () => {

      Mp3Recorder.start()
        .then(() => {

        })
        .catch((e) => console.error(e));
       
    } );}
    
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

        this.myUpload({ file });
        this.setState({ trialStatus: true });
      })
      .catch((e) => console.log(e));
  };

  render() {
    if (!this.state.subjectCookie) {
      return <Redirect to="/ErrorPage" />;
    }

    if (this.state.currentTaskNumber >= 31) {
      return <Redirect to="/SessionComplete" />;
    }

    return (
      <div>
        <header className="App-header-short">
          <h1>Testing</h1>
        </header>

        <div className="myBody">
          <div
            className="App"
            style={{
              width: "600px",
            }}
          >
            <div className="myLeftJustify"></div>

            <b style={{ fontSize: "x-large" }}> {this.state.dimension} </b>
            <br></br>
            <b style={{ fontSize: "xx-large" }}> "{this.state.backchannel}" </b>
            <UserPrompt
              neutral="neutral"
              degree1={this.state.degree1Label}
              degree2={this.state.degree2Label}
              selectedDegree={this.state.selectedDegree}
            ></UserPrompt>

            <Button
              style={{ width: "150px", margin: "20px" }}
              className="button"
              onClick={this.start}
              disabled={this.state.isRecording || this.state.trialStatus}
            >
              Start Recording
            </Button>

            <Button
              style={{ width: "150px", margin: "20px" }}
              className="button"
              onClick={this.stop}
              disabled={!this.state.isRecording}
            >
              Stop Recording
            </Button>
            <br></br>
            <br></br>
            <Link to="/Testing">
              <ArrowRight size={80} onClick={this.getNextTask}  style={this.state.trialStatus ? {} : { display: 'none' }}/>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Testing;
