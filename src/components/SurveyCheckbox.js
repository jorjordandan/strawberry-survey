//@flow
import React from "react";
import { Checkbox } from "@material-ui/core";
import type { surveyItemState } from "./flowTypes.js";

type Props = {
  onChange: (event: SyntheticEvent<>) => mixed,
  itemState: surveyItemState
};

const SurveyCheckbox = (props: Props) => {
  return (
    <Checkbox checked={props.itemState.checked} onChange={props.onChange} />
  );
};

SurveyCheckbox.defaultProps = {
  checked: false,
  itemState: { checked: false }
};

export default SurveyCheckbox;
