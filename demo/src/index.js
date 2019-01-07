import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import Survey from "../../src/components/Survey.js";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
body {
  font-family: s-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size: 1.5em;
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
        <h1>Strawberry-Survey Demo</h1>
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
