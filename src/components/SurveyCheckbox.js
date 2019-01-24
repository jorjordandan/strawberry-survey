//@flow
import React from "react";
import { Checkbox, FormControlLabel, Button } from "@material-ui/core";
import type { surveyItemState, Options } from "../lib/flowTypes.js";
import { getStates } from "../lib/utilities.js";
import SurveyContainer from "../components/SurveyContainer.js";

type Props = {
  onHandle: (event: SyntheticEvent<>) => mixed,
  itemState: surveyItemState,
  options: Options,
  active: boolean
};

type State = {
  checked: boolean
};

class SurveyCheckbox extends React.Component<Props, State> {
  state = {
    checked: false
  };

  onClick = () => {
    console.log(this.props.itemState.checked);
    this.setState({ checked: !this.state.checked });
  };

  render() {
    return (
      <form onSubmit={this.props.onHandle}>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checked}
              onChange={this.onClick.bind(this)}
              disabled={!this.props.active}
            />
          }
          label={this.props.options.label}
        />
        <Button variant="outlined" type="submit" disabled={!this.props.active}>
          Submit
        </Button>
      </form>
    );
  }
}

const checkboxHandler = () => {
  return (
    event: SyntheticEvent<HTMLElement>,
    ctx: React$ElementRef<typeof SurveyContainer>,
    idx: number
  ) => {
    event.preventDefault();
    //return two copies of state...
    const { prevState, newState } = getStates(ctx);
    const state = newState[idx];
    // eslint-disable-next-line no-unused-expressions
    (event.currentTarget: HTMLElement);
    const inputVal = event.currentTarget.getElementsByTagName("input")[0]
      .checked;
    console.log(inputVal);
    //pass in the new survetItemState, answer, and set completed to true
    // const newAnswer = !prevState[idx].surveyItemState.checked;
    state.surveyItemState = {
      checked: inputVal
    };
    state.answer = {
      checked: inputVal
    };
    state.completed = true;
    state.skipped = false;
    //.. and replace the old state.
    ctx.setState({ items: newState });

    ctx.completeItem(idx);
  };
};

const checkboxState = (): State => {
  return { checked: false };
};

export default SurveyCheckbox;
export { checkboxHandler, checkboxState };
export type { Props as checkboxProps };
