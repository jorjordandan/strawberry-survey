import expect from "expect";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import Survey from "../src/components/Survey.js";

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

describe("Survey", () => {
  let node;

  beforeEach(() => {
    node = document.createElement("div");
  });

  afterEach(() => {
    unmountComponentAtNode(node);
  });

  it("displays the questions pass to Survey", () => {
    render(<Survey items={survey} />, node, () => {
      expect(node.innerHTML).toContain("Are you a robot?*");
      expect(node.innerHTML).toContain("Do you like being a robot?");
    });
  });

  it("displays a checkbox passed to Survey", () => {
    render(<Survey items={survey} />, node, () => {
      expect(node.innerHTML).toContain('type="checkbox"');
    });
  });
});
