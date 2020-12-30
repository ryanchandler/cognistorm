import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import cookie from "react-cookies";
import { v4 as uuidv4 } from "uuid";
import { ArrowRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import UserPrompt from "./UserPrompt";
import { Route, Redirect } from 'react-router'
const axios = require('axios').default;



class Instructions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectCookie: cookie.load("subjectUUID"),
      dimension: '',
      backchannel:'',
      selectedDegree:'',
      degree1Label:'',
      degree2Label:'',
    };
  }

 

  componentDidMount() {
   
    fetch("https://16pjyerzdf.execute-api.us-east-1.amazonaws.com/dev/read?uid=" + this.state.subjectCookie)
    .then(data => data.json())
    .then(data => this.setState({ dimension: data.dimension, backchannel: data.backchannel, selectedDegree: data.selectedDegree, degree1Label: data.degree1Label, degree2Label: data.degree2Label  }))
    
  }


  getNextTask = ()=>{


}

  render() {



    if (!this.state.subjectCookie) {
      return <Redirect to="/ErrorPage" />
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
            <br></br>
            You will hear a random prompt like, "you can make a lot of money with this program"
            followed by a beep. 
            <br></br>
            
            <br></br>
            You will respond by saying <b>"uh-huh" </b> in the manner indicated by the green circle.
            <br></br>
            <br></br>
            For neutral just say "uh-huh" with no special emphasis.
            <br></br>
            <br></br>
            When you are ready click the start button. When finished speaking click the  "complete" button.  This is just a test run.
            <br></br>
            <br></br>
            </div>

            <b style={{ fontSize: "x-large" }}> {this.state.dimension} </b>
            <br></br>
            <b style={{ fontSize: "xx-large" }}> "{this.state.backchannel}" </b>
            <UserPrompt
              neutral= "neutral"
              degree1= {this.state.degree1Label}
              degree2=  {this.state.degree2Label}
              selectedDegree={this.state.selectedDegree}
            ></UserPrompt>
  
            <Button className="myBody" onClick={()=> this.getNextTask()}>Start </Button>
            
            <Button onClick={()=> this.getNextTask()}>Complete </Button>
            <br></br>
            <br></br>
            <Link to="/Testing">
              <ArrowRight size={80} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Instructions;
