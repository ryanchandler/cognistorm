import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import cookie from "react-cookies";
import { v4 as uuidv4 } from "uuid";
import { ArrowRight, BorderWidth } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import ClipboardJS from "clipboard";
import Button from "react-bootstrap/Button";

class SessionComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectCookie: cookie.load("subjectUUID"),
    };
    new ClipboardJS(".btn");
  }

  componentDidMount() {}

  render() {
    return (
      <div className="App">
        <header className="App-header-short">
          <h1>Thank You</h1>
          <h4>Your session is complete</h4>
        </header>
        <div
          style={{
            margin: "50px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Here is your redemption code.
          <br></br>
          <br></br>
          <input
            style={{ width: "460px", border: "none", fontSize: "x-large" }}
            id="myCode"
            value={this.state.subjectCookie}
          ></input>
          <br></br>
          <br></br>
          <Button className="btn" class="btn" data-clipboard-target="#myCode">
            copy to clipboard
          </Button>
          <br></br>
          <br></br>
          To redeem, copy and paste this in the mturk survey window where you
          launched this session.
        </div>
      </div>
    );
  }
}

export default SessionComplete;
