import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import Survey from "../../src/components/Survey.js";
import { createGlobalStyle } from "styled-components";
import Typography from "@material-ui/core/Typography";

const GlobalStyles = createGlobalStyle`
body {
  .survey-question {
    padding-left: 1em;
  }
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
    completed: false,
    skipped: false,
    response: []
  },
  {
    question: "Do you like being a robot?",
    type: "checkbox",
    required: true,
    options: {},
    skip: [{ to: "a", if: "a" }, { to: "b", if: "b" }],
    completed: false,
    skipped: false,
    response: []
  }
];

const SurveyOptions = {
  forwardOnly: true
};

class Demo extends Component {
  render() {
    return (
      <Fragment>
        <GlobalStyles />
        <Typography variant="h2" gutterBottom>
          Strawberry-Survey Demo
        </Typography>
        <div style={containerStyle}>
          <Survey items={survey} options={SurveyOptions} />
        </div>
      </Fragment>
    );
  }
}

const containerStyle = {
  width: 1000,
  height: 1000
};

render(<Demo />, document.querySelector("#demo"));
