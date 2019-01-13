//@flow
import React from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import type { surveyItemState, Options } from "../lib/flowTypes.js";
import { getStates } from "../lib/utilities.js";
import Survey from "../components/Survey.js";

type Props = {
  onChange: (event: SyntheticEvent<>) => mixed,
  itemState: surveyItemState,
  options: Options,
  active: boolean
};

type State = {
  checked: boolean
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

const checkboxHandler = () => {
  return (
    event: SyntheticEvent<>,
    ctx: React$ElementRef<typeof Survey>,
    idx: number
  ) => {
    const { prevState, newState } = getStates(ctx);
    const newAnswer = !prevState[idx].surveyItemState.checked;
    const state = newState[idx];
    state.surveyItemState = {
      checked: newAnswer
    };
    state.answer = {
      checked: newAnswer
    };
    state.completed = true;
    ctx.setState({ items: newState });
    ctx.completeItem();
  };
};

const checkboxState = (): State => {
  return { checked: false };
};

export default SurveyCheckbox;
export { checkboxHandler, checkboxState };
export type { Props as checkboxProps };
