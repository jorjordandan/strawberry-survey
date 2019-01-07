//@flow

import React, { Component, Fragment } from "react";
import SurveyQuestion from "./SurveyQuestion";
import SurveyCheckbox from "./SurveyCheckbox";
import changeHandlers from "./changeHandlers.js";
import type { SurveyItemType, Options } from "./flowTypes.js";

type Props = {
  item: SurveyItemType,
  handleChange: (any, any) => mixed
};

type State = {
  answer: string[],
  checked: boolean,
  surveyItemState?: {
    checked?: boolean
  }
};

const defaults = {
  required: false,
  completed: false,
  skipped: false,
  response: []
};

class SurveyItem extends Component<Props, State> {
  state = {
    answer: [],
    checked: false,
    surveyItemState: this.props.item.surveyItemState
  };

  static defaultProps = {
    item: { ...defaults }
  };

  // handle = (type: string, event: SyntheticEvent<>) => {
  //   const handler = changeHandlers(type);
  //   handler(event, this);
  // };
  //onChange={this.handle.bind(this, type)}
  getComponentOfType = (type: string, required: boolean, options: Options) => {
    switch (type) {
      case "checkbox":
        return (
          <SurveyCheckbox
            onChange={this.props.handleChange}
            required={required}
            options={options}
            checked={this.state.checked}
          />
        );

      default:
        return <p>{type} is not a valid Survey component.</p>;
    }
  };

  render() {
    const {
      item: { question, type, required, options }
    } = this.props;
    return (
      <Fragment>
        <SurveyQuestion question={question} required={required} />
        {this.getComponentOfType(type, required, options)}
      </Fragment>
    );
  }
}

export default SurveyItem;
