import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import cookie from "react-cookies";
import { v4 as uuidv4 } from "uuid";
import { ArrowRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

class Testing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectCookie: cookie.load("my cookie"),
    };
  }

  componentDidMount() {
    cookie.save("my cookie", uuidv4());
  }

  render() {
    return (
      <div >
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
          <div> </div>
 
          <b style={{ fontSize: "xx-large" }}> "uh-huh" </b>
          <br></br>
          <svg
            width="12cm"
            height="4cm"
            viewBox="0 0 800 150"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
          >
            <desc>Example rect01 - rectangle with sharp corners</desc>

            <rect
              x="100"
              y="100"
              width="600"
              height="5"
              fill="black"
              stroke="black"
              stroke-width="1"
            />

            <circle cx="100" cy="100" r="20" fill="red" />
            <circle cx="400" cy="100" r="20" />
            <circle cx="700" cy="100" r="20" />

            <text x="100" y="180" font-size="x-large" text-anchor="middle">
              Neutral
            </text>
            <text x="400" y="180" font-size="x-large" text-anchor="middle">
              Slightly
            </text>
            <text x="700" y="180" font-size="x-large" text-anchor="middle">
              Very
            </text>
          </svg>

          This is a real task. When ready press the start button.  After the prompt and beep say the word.
          <br></br>
          <br></br>
          <Button>Start</Button>
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

export default Testing;
