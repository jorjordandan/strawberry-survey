import React, { Component } from "react";
import { render } from "react-dom";
import Survey from "../../src/components/Survey.js";
import { createGlobalStyle } from "styled-components";
import Typography from "@material-ui/core/Typography";

const GlobalStyles = createGlobalStyle`
body {

}
  `;

const survey = [
  {
    question: "Are you a robot?",
    type: "checkbox",
    required: true,
    options: {
      label: "I'm a robot"
    },
    skip: [{ to: "a", if: "a" }, { to: "b", if: "b" }],
    response: []
  },
  {
    question: "Do you like being a robot?",
    type: "checkbox",
    required: true,
    options: {},
    skip: [{ to: "a", if: "a" }, { to: "b", if: "b" }],
    response: []
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
        <div style={containerStyle}>
          <Survey items={survey} options={SurveyOptions} />
        </div>
      </div>
    );
  }
}

const containerStyle = {
  width: "100%",
  height: "100%"
};

render(<Demo />, document.querySelector("#demo"));
