//@flow
import React from "react";
import { Button } from "@material-ui/core";
import type { surveyItemState, Options } from "../lib/flowTypes.js";
import SurveyContainer from "../components/SurveyContainer.js";

type Props = {
  onHandle: (event: SyntheticEvent<>) => mixed,
  itemState: surveyItemState,
  options: Options,
  active: boolean
};

const SurveySection = (props: Props) => {
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <Button
        variant="contained"
        color="primary"
        disabled={!props.active}
        onClick={props.onHandle}
      >
        {props.options.nextButtonText}
      </Button>
    </div>
  );
};

const sectionHandler = () => {
  return (
    event: SyntheticEvent<>,
    ctx: React$ElementRef<typeof SurveyContainer>,
    idx: number
  ) => {
    event.preventDefault();
    console.log("Hey I'm the section item handler!");
    ctx.completeItem(idx);
  };
};

export default SurveySection;
export { sectionHandler };
export type { Props as sectionProps };
