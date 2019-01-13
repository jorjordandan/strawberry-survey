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

// NOTE: While this is not actually a stateful component, the state
// is tracked in the Survey component. This is the
// type that will be used there.
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
    //return two copies of state...
    const { prevState, newState } = getStates(ctx);

    const state = newState[idx];

    //pass in the new survetItemState, answer, and set completed to true
    const newAnswer = !prevState[idx].surveyItemState.checked;
    state.surveyItemState = {
      checked: newAnswer
    };
    state.answer = {
      checked: newAnswer
    };
    state.completed = true;
    state.skipped = false;

    //.. and replace the old state.
    ctx.setState({ items: newState });

    //always call complete item at end of changeHandler to go to next item
    ctx.completeItem();
  };
};

const checkboxState = (): State => {
  return { checked: false };
};

export default SurveyCheckbox;
export { checkboxHandler, checkboxState };
export type { Props as checkboxProps };
