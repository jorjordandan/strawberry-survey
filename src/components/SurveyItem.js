//@flow

import React, { Component, Fragment } from "react";
import SurveyQuestion from "./SurveyQuestion";
import type { SurveyItemType } from "./flowTypes.js";

type Props = {
  item: SurveyItemType,
  surveyComponent: React$Element<any>
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

  render() {
    const {
      item: { question, required }
    } = this.props;
    return (
      <Fragment>
        <SurveyQuestion question={question} required={required} />
        {this.props.surveyComponent}
      </Fragment>
    );
  }
}

export default SurveyItem;
