//@flow
import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import type { surveyItemState, Options } from "../lib/flowTypes.js";
import { getStates } from "../lib/utilities.js";
import Survey from "../components/Survey.js";

type Props = {
  onHandle: (event: SyntheticEvent<>) => mixed,
  itemState: surveyItemState,
  options: Options,
  active: boolean
};

// NOTE: While this is not actually a stateful component, the state
// is tracked in the Survey component. This is the
// type that will be used there.
type State = {
  value: string
};

class SurveyTextInput extends Component<Props> {
  state = {
    value: ""
  };

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.props.onHandle} method="get">
        <TextField
          value={this.state.value}
          onChange={this.onChange.bind(this)}
          label={this.props.options.label}
          disabled={!this.props.active}
          helperText={this.props.options.helperText}
        />
      </form>
    );
  }
}

SurveyTextInput.defaultProps = {
  itemState: { value: "" }
};

const textInputHandler = () => {
  return (
    event: SyntheticEvent<>,
    ctx: React$ElementRef<typeof Survey>,
    idx: number
  ) => {
    event.preventDefault();
    const inputVal = event.target.getElementsByTagName("input")[0].value;
    //return two copies of state...
    const { prevState, newState } = getStates(ctx);
    const state = newState[idx];

    //pass in the new survetItemState, answer, and set completed to true
    state.surveyItemState = {
      value: inputVal
    };
    state.answer = {
      value: inputVal
    };
    state.completed = true;
    state.skipped = false;
    //.. and replace the old state.
    ctx.setState({ items: newState });

    ctx.completeItem(idx);
  };
};

const textInputState = (): State => {
  return { value: "state" };
};

export default SurveyTextInput;
export { textInputHandler, textInputState };
export type { Props as textInputProps };
