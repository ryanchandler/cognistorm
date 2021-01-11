import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import cookie from "react-cookies";
import { v4 as uuidv4 } from "uuid";
import { ArrowRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

class UserPrompt extends React.Component {
  constructor(props) {
    super(props);

    this.props = {
      neutral: "",
      degree1: "",
      degree2: "",
      selectedDegree: null,
    };
    this.state = {
      subjectCookie: cookie.load("my cookie"),
    };
  }

  renderNeutralCircle = () => {
    if (this.props.selectedDegree == 0) {
      return <circle cx="100" cy="103" r="25" fill="green" />;
    } else {
      return <circle cx="100" cy="103" r="20" />;
    }
  };

  renderDegree1Circle = () => {
    if (this.props.selectedDegree == 1) {
      return <circle cx="400" cy="103" r="25" fill="green" />;
    } else {
      return <circle cx="400" cy="103" r="20" />;
    }
  };

  renderDegree2Circle = () => {
    if (this.props.selectedDegree == 2) {
      return <circle cx="700" cy="103" r="25" fill="green" />;
    } else {
      return <circle cx="700" cy="103" r="20" />;
    }
  };

  render() {
    return (
      <div className="myBody">
        <svg
          width="12cm"
          height="4cm"
          viewBox="0 0 900 150"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <desc>Likert Scale for Selection</desc>

          <rect
            x="100"
            y="100"
            width="600"
            height="6"
            fill="black"
            stroke="black"
            stroke-width="1"
          />

          {this.renderNeutralCircle()}
          {this.renderDegree1Circle()}
          {this.renderDegree2Circle()}

          <text x="100" y="180" font-size="x-large" text-anchor="middle">
            {this.props.neutral}
          </text>
          <text x="400" y="180" font-size="x-large" text-anchor="middle">
            {this.props.degree1}
          </text>
          <text x="700" y="180" font-size="x-large" text-anchor="middle">
            {this.props.degree2}
          </text>
        </svg>
      </div>
    );
  }
}

export default UserPrompt;
