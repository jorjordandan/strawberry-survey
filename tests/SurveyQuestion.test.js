import expect from "expect";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import SurveyQuestion from "../src/components/SurveyQuestion";

describe("SurveyQuestion", () => {
  let node;

  beforeEach(() => {
    node = document.createElement("div");
  });

  afterEach(() => {
    unmountComponentAtNode(node);
  });

  it("displays the question", () => {
    render(<SurveyQuestion question="Is this a question?" />, node, () => {
      expect(node.innerHTML).toContain("Is this a question?");
    });
  });

  it("displays an asterisk when passed the required prop", () => {
    render(
      <SurveyQuestion question="Is this a question?" required />,
      node,
      () => {
        expect(node.innerHTML).toContain("Is this a question?*");
      }
    );
  });

  it("displays a question number when passed a number", () => {
    render(
      <SurveyQuestion question="Is this a question?" number={5} />,
      node,
      () => {
        expect(node.innerHTML).toContain("5. Is this a question?");
      }
    );
  });

  it("adds class active when passed active prop", () => {
    render(
      <SurveyQuestion question="Is this a question?" active />,
      node,
      () => {
        expect(node.firstChild.classList.toString()).toContain("active");
      }
    );
  });
});
