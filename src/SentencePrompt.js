import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";


class SentencePrompt extends React.Component {
  constructor(props) {
    super(props);

    this.props = {
      backchannel: "",
      neutral: "",
      degree1: "",
      degree2: "",
      selectedDegree: null,
      selectedDegreeClause:'',
    };
  }

  

    
    


  

  render() {
    return (
      <div style={{ fontSize: "large" }} >
        <br></br>
        After the beep say <b style={{ fontSize: "large" }}>  "{this.props.backchannel}" </b> like you  <b> 
        { " " + this.props.selectedDegreeClause + " "} </b> what the speaker says.
      </div>
    );
  }
}

export default SentencePrompt;
