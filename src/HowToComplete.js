import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import cookie from "react-cookies";
import { v4 as uuidv4 } from "uuid";
import { ArrowRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

class HowToComplete extends React.Component {
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
      <div className="App">
        <header className="App-header-short">
          <h1>Instructions</h1>
        </header>
        <div
          style={{
            margin: "50px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          What you will be asked to do
          <svg
            width="22cm"
            height="10cm"
            viewBox="0 0 1200 400"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
          >
            <desc>Example rect01 - rectangle with sharp corners</desc>



            <rect
              x="300"
              y="100"
              width="600"
              height="5"
              fill="black"
              stroke="black"
              stroke-width="1"
            />


<circle cx="300" cy="100" r="20" fill="red"/>
<circle cx="600" cy="100" r="20"/>
<circle cx="900" cy="100" r="20"/>

<text x="300" y="180" font-size="large" text-anchor="middle" >Neutral</text>
<text x="600" y="180" font-size="large"  text-anchor="middle"  >Slightly</text>
<text x="900" y="180" font-size="large"  text-anchor="middle"  >Very</text>


          </svg>
          <br></br>
          <Link to="/HardwareTest">
            <ArrowRight size={80} />
          </Link>
        </div>
      </div>
    );
  }
}

export default HowToComplete;
