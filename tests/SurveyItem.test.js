import expect from "expect";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import SurveyItem from "../src/components/SurveyItem";

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

describe("SurveyItem", () => {
  let node;

  beforeEach(() => {
    node = document.createElement("div");
  });

  afterEach(() => {
    unmountComponentAtNode(node);
  });

  it("displays the question pass to surveyItem", () => {
    render(<SurveyItem item={survey[0]} />, node, () => {
      expect(node.innerHTML).toContain("Are you a robot?*");
    });
  });

  it("displays a checkbox passed to surveyItem", () => {
    render(<SurveyItem item={survey[0]} />, node, () => {
      expect(node.innerHTML).toContain('type="checkbox"');
    });
  });
});
