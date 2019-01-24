//@flow
import React from "react";
import { Checkbox, FormControlLabel, Button } from "@material-ui/core";
import type { Options } from "../lib/flowTypes.js";
import { getStates } from "../lib/utilities.js";
import SurveyContainer from "../components/SurveyContainer.js";

type Props = {
  onHandle: (event: SyntheticEvent<>) => mixed,
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
    const { newState } = getStates(ctx);
    const state = newState[idx];
    // eslint-disable-next-line no-unused-expressions
    (event.currentTarget: HTMLElement);
    const inputVal = event.currentTarget.getElementsByTagName("input")[0]
      .checked;

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

export default SurveyCheckbox;
export { checkboxHandler };
export type { Props as checkboxProps };
