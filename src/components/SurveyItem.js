//@flow

import React, { Component } from "react";
import SurveyQuestion from "./SurveyQuestion";
import type { SurveyItemType } from "./flowTypes.js";
import styled from "styled-components";

type Props = {
  item: SurveyItemType,
  surveyComponent: React$Element<any>,
  active: boolean
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
      <SurveyItemContainer>
        <SurveyQuestion
          question={question}
          required={required}
          active={this.props.active}
        />
        {this.props.surveyComponent}
      </SurveyItemContainer>
    );
  }
}

const SurveyItemContainer = styled.div`
  padding-bottom: 60px;
  .inactive {
    opacity: 0.3;
  }
`;

export default SurveyItem;
