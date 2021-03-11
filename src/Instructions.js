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
import SentencePrompt from "./SentencePrompt";

const axios = require("axios").default;
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class Instructions extends React.Component {
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
      InstructionSampleURL: "https://cognistorm.s3.amazonaws.com/prompts/SubjectInstructions.mp3",
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


   
        this.setState({
          dimension: "interest",
          backchannel: "uh-huh",
          selectedDegree:2,
          degree1Label: 'a little interested',
          degree2Label: 'very interested',
          uid: '11111111-2222-3333-4444-5555555',
          trialID: 'practice',
          prompt: 'https://cognistorm.s3.amazonaws.com/prompts/prompt_1.mp3',
          isBlocked:false,
          isPlayingAudioPromt:'',
          selectedDegreeClause: 'are very interested in',
          
        })
     
        this.audio = new Audio('https://cognistorm.s3.amazonaws.com/prompts/prompt_1.mp3')
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
      this.setState({ isPlayingAudioPromt: true });
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
          <h1>Instructions</h1>
        </header>

        <div className="myBody">
          <div
            className="App"
            style={{
              width: "600px",
            }}
          >
            <div className="myLeftJustify">

          
<h4>What are we testing? </h4>

As speakers we can sometimes say a word in different ways to communicate different meanings.  As an example, if you play the clip below you will hear the phrase "It was cold" with three different inflections. This is an example where the word "cold" might be spoken differently if it was really cold rather than just a little cold.

<br></br>
          <div
            style={{
              margin: "50px",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <audio src={this.state.InstructionSampleURL} controls="button" />
          </div>



          <p></p>
<p></p>
<h4>Understanding the dimensions </h4>
<p></p>
<b>Agreement</b> - You support the statement of the speaker.
<p></p>
<b>Belief</b> - You think that what the speaker said is true.
<p></p>
<b>Concern</b> - You are taking seriously and are invested in what the speaker says.
<p></p>
<b>Interest</b> - You find what the speaker said to be engageing.
<p></p>
<b>Understanding</b> - You comprehend what the speaker is saying.
<p></p>
<b>Neutral</b> - Speak the indicated word with no special empahsis or attitude, as though you were just reading the word aloud.
<p></p>
<p></p>
<h4>How to complete the exercises </h4>

Below is an example of the user interface you will use.  It shows what word you will say and an indication of how to say it. Without exaggerating, you want to speak the word in a way that clearly indicates the attitude described.
<p></p>

When you are ready to begin you will press the "Begin Task" button.  You will hear an audio prompt of someone making a random statement. 

<b> Speak the word in the manner indicated as soon as you see the green "now recording" indicator.</b>
<p></p>

When you are finished speaking select the "Task Complete" button.  An arrow will appears to take you to the next page where the process will be repreated for a total of 60 trials. <b>This enagagement should require 20-30 minutes and should be performed on one sitting if possible. </b>
<p></p>

When your trials are complete you will be given the redemoption code to be pasted back in the Mechanical Turk form that lead you here.

<p></p>



 <p></p>
 <p></p>
<h4>Try a practice example </h4>
<hr/>
 </div>
            
            
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
            <div style={{ minHeight: '50px' }}> { this.state.isRecording ? <b style={{ color: 'green' }} >Now Recording</b> : null }</div>

            <Button
              style={{ width: "150px", margin: "20px" }}
              className="button"
              onClick={this.start}
              disabled={this.state.isPlayingAudioPromt || this.state.trialStatus}
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
            <Link to="/Testing">
              <ArrowRight size={80}  style={this.state.trialStatus ? {} : { display: 'none' }}/>
            </Link>

            

            
            
          </div>
         
        </div>
      </div>
    );
  }
}

export default Instructions;
