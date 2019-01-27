import React, { Component } from "react";
import { render } from "react-dom";
import SurveyContainer from "../../src/components/SurveyContainer.js";

const survey = [
  {
    question: "Welcome to the Robot Survey!",
    details: "This is to determine if you are a good robot or a bad one.",
    type: "section",
    sectionTitle: "First a few questions about your robot status...",
    required: false,
    options: {
      nextButtonText: "Start survey"
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
    question: "What is your robo-type?",
    type: "multiChoice",
    options: {
      labels: [
        "good robot",
        "bad Robot",
        "nefarious robot",
        "existential questions robot"
      ]
    },
    skip: [{ to: "a", if: "a" }, { to: "b", if: "b" }], //placeholder
    responses: []
  },
  {
    question: "Okay now we will ask some more questions",
    details: "This is so we can have another section",
    type: "section",
    sectionTitle: "It's about to get real...",
    required: false,
    options: {
      nextButtonText: "Continue survey"
    },
    skip: [{ to: "a", if: "a" }, { to: "b", if: "b" }], //placeholder
    responses: []
  },
  {
    question: "What's your robo name?",
    details: "A robo name is like a regular name, but more robotic.",
    type: "textInput",
    required: false,
    options: {
      label: "name"
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
      <div style={{ maxHeight: "100vh", overflow: "hidden" }}>
        <SurveyContainer items={survey} options={SurveyOptions} />

        <div className="containerStyle" />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
