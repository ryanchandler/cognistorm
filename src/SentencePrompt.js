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
        Say <b style={{ fontSize: "large" }}>  "{this.props.backchannel}" </b> <p></p>like you  <b> 
        { " " + this.props.selectedDegreeClause + " "} </b> what the speaker just said.
      </div>
    );
  }
}

export default SentencePrompt;
