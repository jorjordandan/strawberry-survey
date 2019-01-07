import expect from "expect";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import SurveyCheckbox from "../src/components/SurveyCheckbox";

describe("SurveyCheckbox", () => {
  let node;

  beforeEach(() => {
    node = document.createElement("div");
  });

  afterEach(() => {
    unmountComponentAtNode(node);
  });

  it("displays the Checkbox", () => {
    render(
      <SurveyCheckbox onChange={() => console.log("boop")} />,
      node,
      () => {
        expect(node.innerHTML).toContain('<input type="checkbox">');
      }
    );
  });

  it("displays the checkbox checked when passed checked prop", () => {
    render(
      <SurveyCheckbox onChange={() => console.log("boop")} checked />, //fake changeHandler to allow passing checked prop
      node,
      () => {
        expect(node.innerHTML).toContain("checked");
      }
    );
  });
});
