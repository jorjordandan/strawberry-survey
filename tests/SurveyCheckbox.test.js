import expect from "expect";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import SurveyCheckbox from "../src/components/SurveyCheckbox";

const options = { label: "test label" };

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
      <SurveyCheckbox onChange={() => console.log("boop")} options={options} />,
      node,
      () => {
        expect(node.innerHTML).toContain("<input");
        expect(node.innerHTML).toContain('type="checkbox"');
      }
    );
  });

  it("displays the checkbox checked when passed item state of {checked: true}", () => {
    render(
      <SurveyCheckbox
        onChange={() => console.log("boop")}
        itemState={{ checked: true }}
        options={options}
      />, //fake changeHandler to allow passing checked prop
      node,
      () => {
        expect(node.innerHTML).toContain("checked");
      }
    );
  });
});
