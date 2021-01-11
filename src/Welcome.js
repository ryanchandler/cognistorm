import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import cookie from "react-cookies";
import { v4 as uuidv4 } from "uuid";
import { ArrowRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectCookie: null,
      consented: false,
    };

    this.handleConsent = this.handleConsent.bind(this);
  }

  handleConsent(evt) {
    if (this.state.subjectCookie == null) {
      var subjectUUID = uuidv4();
    }

    this.setState(
      {
        subjectCookie: subjectUUID,
      },
      cookie.save("subjectUUID", subjectUUID)
    );

    this.setState(
      {
        consented: evt.target.checked,
      },
      () => console.log(this.state.consented)
    );
    console.log("consented");
  }

  render() {
    return (
      <div className="consent">
        <header className="App-header-short">
          <h1>Welcome</h1>
        </header>
        <div
          style={{
            margin: "50px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          This is a research study being conducted by researchers from the
          University of Illinois. The goal of the study is to teach computers to
          recognize subtle differences in meaning based on how words are spoken
          (voiced, inflected).
          <p></p>
          You will be asked to speak words "yeah" and "uh-huh" into your
          computer's headset microphone. You will be propted to say each word
          with a different characterizartion, or attitude. For example you may
          be asked to say "uh-huh" as though you are very interesed or
          uninterested.
          <p></p>
          The main features of the study is:
          <ul>
            <li>
              Your voice will be recorded and stored and will be made public as
              a part of the research dataset.
            </li>
            <li>
              No personally identifiable information will tie the recordings to
              your identity
            </li>
          </ul>
          <Form>
            <Form.Group controlId="consent">
              <a href="https://www.cognistorm.com/Consent" target="_blank">
                Consent Details
              </a>
              <Form.Check
                type="checkbox"
                checked={this.state.consented}
                onChange={this.handleConsent}
                label="I consent to participate as described in the consent details in link provided above and the use of tracking cookies"
              />
            </Form.Group>
          </Form>
          <br></br>
          <Link to="/HardwareTest">
            <ArrowRight  style={this.state.consented ? {} : { display: 'none' }}  size={80} />
          </Link>
        </div>
      </div>
    );
  }
}

export default Welcome;
