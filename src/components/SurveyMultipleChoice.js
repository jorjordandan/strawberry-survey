//@flow
import React from "react";
import { Radio, RadioGroup, FormControlLabel, Button } from "@material-ui/core";
import type { Options } from "../lib/flowTypes.js";
import { getStates } from "../lib/utilities.js";
import SurveyContainer from "../components/SurveyContainer.js";

type Props = {
  onHandle: (event: SyntheticEvent<>) => mixed,
  options: Options,
  active: boolean
};

type State = {
  selectedValue: string
};

class SurveyMultiChoice extends React.Component<Props, State> {
  state = {
    selectedValue: ""
  };

  onClick = (e: SyntheticEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-unused-expressions
    (e.currentTarget: HTMLInputElement);
    let val = e.currentTarget.value;
    console.log(val);
    this.setState({
      selectedValue: val
    });
  };

  render() {
    return (
      <form onSubmit={this.props.onHandle}>
        <RadioGroup
          aria-label="Select one"
          name="select"
          value={this.state.selectedValue}
          onChange={this.onClick}
          disabled={!this.props.active}
        >
          {this.props.options.labels &&
            this.props.options.labels.map((label, i) => (
              <FormControlLabel
                value={label}
                control={<Radio />}
                label={label}
                disabled={!this.props.active}
                key={i}
              />
            ))}
        </RadioGroup>
        <Button variant="outlined" type="submit" disabled={!this.props.active}>
          Submit
        </Button>
      </form>
    );
  }
}

const multiChoiceHandler = () => {
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
    const inputVals = event.currentTarget.getElementsByTagName("input");
    let answer = "none";
    for (let item of inputVals) {
      if (item.checked) {
        answer = item.value;
      }
    }

    state.answer = {
      answer: answer
    };
    state.completed = true;
    state.skipped = false;
    //.. and replace the old state.
    ctx.setState({ items: newState });

    ctx.completeItem(idx);
  };
};

export default SurveyMultiChoice;
export { multiChoiceHandler };
export type { Props as multiChoiceProps };
