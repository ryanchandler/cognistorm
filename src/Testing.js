import React from "react";
import { Route, Redirect } from 'react-router'
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import cookie from "react-cookies";
import { v4 as uuidv4 } from "uuid";
import { ArrowRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import UserPrompt from "./UserPrompt";
const axios = require('axios').default;



class Testing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectCookie: cookie.load("subjectUUID"),
      dimension: '',
      backchannel:'',
      selectedDegree:'',
      degree1Label:'',
      degree2Label:'',
      currentTaskNumber:0,
      uid:'',
    };
    this.getNextTask = this.getNextTask.bind(this);
  }



  componentDidMount() {
   
    fetch("https://16pjyerzdf.execute-api.us-east-1.amazonaws.com/dev/read?uid=" + this.state.subjectCookie )
    .then(data => data.json())
    .then(data => this.setState({ dimension: data.dimension, backchannel: data.backchannel, selectedDegree: data.selectedDegree, degree1Label: data.degree1Label, degree2Label: data.degree2Label , uid: data.uid }))
    
  }


  getNextTask = (e)=>{
    e.preventDefault();
   
    this.setState({currentTaskNumber: this.state.currentTaskNumber + 1}, console.log(this.state.currentTaskNumber));
    

}


  render() {




    if (!this.state.subjectCookie) {
      return <Redirect to="/ErrorPage" />
    }



    if (this.state.currentTaskNumber >= 31) {
      return <Redirect to="/SessionComplete" />
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
            <div className="myLeftJustify"> 

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
              <ArrowRight size={80} onClick={this.getNextTask} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Testing;
