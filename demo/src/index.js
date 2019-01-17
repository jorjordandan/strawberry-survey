import React, { Component } from "react";
import { render } from "react-dom";
import SurveyContainer from "../../src/components/SurveyContainer.js";
import { createGlobalStyle } from "styled-components";
import Typography from "@material-ui/core/Typography";

const GlobalStyles = createGlobalStyle`
body {

}
  `;

const survey = [
  {
    question: "What's your robo name?",
    type: "textInput",
    required: true,
    options: {
      label: "name"
    },
    skip: [{ to: "a", if: "a" }, { to: "b", if: "b" }], //placeholder
    responses: []
  },
  {
    question: "Are you a robot?",
    type: "checkbox",
    required: true,
    options: {
      label: "I'm a robot"
    },
    skip: [{ to: "a", if: "a" }, { to: "b", if: "b" }], //placeholder
    responses: []
  },
  {
    question: "Do you like being a robot?",
    type: "checkbox",
    required: false,
    options: {},
    skip: [{ to: "a", if: "a" }, { to: "b", if: "b" }],
    responses: []
  }
];

const SurveyOptions = {
  forwardOnly: true
};

class Demo extends Component {
  render() {
    return (
      <div style={{ height: "100vh" }}>
        <GlobalStyles />
        <Typography variant="h2" gutterBottom>
          Strawberry-Survey Demo
        </Typography>
        {/* <div style={containerStyle}>
          <Survey items={survey} options={SurveyOptions} />
        </div> */}
        <SurveyContainer items={survey} options={SurveyOptions} />

        <div className="containerStyle" />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
