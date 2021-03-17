import React from "react";
import { Redirect } from "react-router";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import cookie from "react-cookies";

import { ArrowRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import UserPrompt from "./UserPrompt";
import MicRecorder from "mic-recorder-to-mp3";
import SentencePrompt from "./SentencePrompt";


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
      uid: "",
      isRecording: false,
      blobURL: "",
      isBlocked: false,
      trialID: "",  
      trialStatus: false,
      play: true,
      prompt:'',
      currentTaskNumber: cookie.load("currentTaskNumber"),
    };


    

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

    window.scrollTo(0, 0)
    
 if (!cookie.load("currentTaskNumber"))
 {
  cookie.save("currentTaskNumber", 0)


 }

    fetch(
      "https://16pjyerzdf.execute-api.us-east-1.amazonaws.com/dev/read?directive=getTask&uid=" +
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
          prompt: data.prompt,
          isBlocked:'',
          isPlayingAudioPrompt:'',
          selectedDegreeClause: data.selectedDegreeClause
        }, () => {this.audio = new Audio(this.state.prompt);})
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

    
    window.location.reload(false)
  };

  start = () => {



    if (this.state.isBlocked) {
      console.log("Permission Denied");
    } else {

      this.audio.play();
      console.log("playing");
      this.setState({ isPlayingAudioPrompt: true });
      this.setState({ trialStatus: false });
      this.audio.addEventListener('ended', () => {
        console.log("prompt ended now recording");
        this.setState({ isRecording: true });

      Mp3Recorder.start()
        .then(() => {

        })
        .catch((e) => console.error(e));
       
    } );}
    
  };

  stop = () => {



 var currentTaskNumber = cookie.load("currentTaskNumber");   

cookie.save("currentTaskNumber", parseInt(currentTaskNumber, 10) + 1) ;
      
   

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


      fetch(
        "https://16pjyerzdf.execute-api.us-east-1.amazonaws.com/dev/read?directive=completeTask&uid=" +
          this.state.uid + "&trialID=" +  this.state.trialID
      )
        


  };

  render() {

    
    if (!this.state.subjectCookie) {
      return <Redirect to="/ErrorPage" />;
    }

    if (this.state.currentTaskNumber >= 60) {
      return <Redirect to="/SessionComplete" />;
    }

    return (
      <div>
        <header className="App-header-short">
          <h1>Test in progress</h1>
        </header>

        <div className="myBody">
          <div
            className="App"
            style={{
              width: "600px",
            }}
          >
            <div className="myLeftJustify"></div>

            
            
            
            <SentencePrompt 

            backchannel={this.state.backchannel}
            neutral="neutral"
            degree1={this.state.degree1Label}
            degree2={this.state.degree2Label}
            selectedDegree={this.state.selectedDegree}
            selectedDegreeClause={this.state.selectedDegreeClause}
            
            />
            
             
            <br></br>
           <b style={{ fontSize: "xx-large" }}>  </b>
            <UserPrompt
              neutral="neutral"
              degree1={this.state.degree1Label}
              degree2={this.state.degree2Label}
              selectedDegree={this.state.selectedDegree}
            ></UserPrompt>
            <div style={{ minHeight: '50px' }}> { !this.state.isRecording ? <b style={{ color: 'red' , fontSize:'x-large'}} >Wait to speak</b> : null }</div>
            <div style={{ minHeight: '50px' }}> { this.state.isRecording ? <b style={{ color: 'green' , fontSize:'x-large'}} >Speak Now</b> : null }</div>
            <Button
              style={{ width: "150px", margin: "20px" }}
              className="button"
              onClick={this.start}
              disabled={this.state.isPlayingAudioPrompt || this.state.trialStatus}
            >
              Begin Task
            </Button>

            <Button
              style={{ width: "150px", margin: "20px" }}
              className="button"
              onClick={this.stop}
              disabled={!this.state.isRecording}
            >
              Task Complete
            </Button>
            <br></br>
            <br></br>
            <div>Remaining tasks: {60 - this.state.currentTaskNumber } </div>
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
