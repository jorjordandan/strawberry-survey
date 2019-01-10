//@flow
import React from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import type { surveyItemState } from "./flowTypes.js";

type Props = {
  onChange: (event: SyntheticEvent<>) => mixed,
  itemState: surveyItemState,
  options: any,
  active: boolean
};

const SurveyCheckbox = (props: Props) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={props.itemState.checked}
          onChange={props.onChange}
          disabled={!props.active}
        />
      }
      label={props.options.label}
    />
  );
};

SurveyCheckbox.defaultProps = {
  checked: false,
  itemState: { checked: false }
};

export default SurveyCheckbox;
