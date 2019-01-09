//@flow

import React, { Component, Fragment } from "react";
import SurveyQuestion from "./SurveyQuestion";
import SurveyCheckbox from "./SurveyCheckbox";
// import changeHandlers from "./changeHandlers.js";
import type { SurveyItemType, Options } from "./flowTypes.js";

type Props = {
  item: SurveyItemType,
  handleChange: (any, any) => mixed,
  itemState: any
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
    checked: false
  };

  static defaultProps = {
    item: { ...defaults }
  };

  getComponentOfType = (type: string, required: boolean, options: Options) => {
    switch (type) {
      case "checkbox":
        return (
          <SurveyCheckbox
            onChange={this.props.handleChange}
            required={required}
            options={options}
            checked={this.state.checked}
            itemState={this.props.itemState}
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
