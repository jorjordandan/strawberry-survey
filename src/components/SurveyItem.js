//@flow

import * as React from "react";
import SurveyQuestion from "./SurveyQuestion";
import type { SurveyItemType } from "../lib/flowTypes.js";
import styled, { type ReactComponentStyled } from "styled-components";

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

class SurveyItem extends React.Component<Props, State> {
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

const SurveyItemContainer: ReactComponentStyled<any> = styled.div`
  padding-bottom: 60px;
  .inactive {
    opacity: 0.3;
  }
`;

export default SurveyItem;
