import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import cookie from "react-cookies";
import { v4 as uuidv4 } from "uuid";
import { ArrowRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import UserPrompt from "./UserPrompt";
const axios = require('axios').default;

class Instructions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectCookie: cookie.load("my cookie"),
    };
  }

  componentDidMount() {
    cookie.save("my cookie", uuidv4());
  }


  getNextTask = ()=>{


  axios({
    method: 'get', //you can set what request you want to be
    url: 'https://16pjyerzdf.execute-api.us-east-1.amazonaws.com/dev/read',
    data: {uid: "barney"},
    headers: {
      'Access-Control-Allow-Origin': '*',
      
    }
  })
  .then((response) => {
    console.log(response);
  }, (error) => {
    console.log(error);
  });


 
  
}

  render() {
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
            <div> </div>
            <br></br>
            <br></br>
            You will see a visual prompt (below) indicating what word you will
            say and how you should say it.
            <br></br>
            <br></br>
            <br></br>
            <b style={{ fontSize: "xx-large" }}> "uh-huh" </b>
            <br></br>
            <UserPrompt
              neutral="neutral"
              degree1="somewhat interested"
              degree2="very interested"
              selectedDegree="0"
            ></UserPrompt>
            <p></p>
            You will hear a random audio prompt followed by a beep.
            <br></br>
            Press the start button to perform practice example.
            <br></br>
            <br></br>
            <Button onClick={()=> this.getNextTask()}>Start </Button>
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
