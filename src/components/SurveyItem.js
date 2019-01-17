//@flow

import * as React from "react";
import SurveyQuestion from "./SurveyQuestion";
import type { SurveyItemType } from "../lib/flowTypes.js";
import styled, { type ReactComponentStyled } from "styled-components";
import SurveyCursor from "./SurveyCursor.js";

type Props = {
  item: SurveyItemType,
  surveyComponent: React$Element<any>,
  active: boolean,
  idx: number,
  getRef: (ref: any, i: number) => mixed
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

  itemEl: ?HTMLDivElement;

  static defaultProps = {
    item: { ...defaults }
  };

  componentDidMount() {
    this.props.getRef(this.itemEl, this.props.idx);
  }

  onRest() {
    //do something...
    // console.log("boop");
  }

  render() {
    const {
      item: { question, required }
    } = this.props;
    return (
      <React.Fragment>
        <SurveyCursor
          active={this.props.active}
          onRest={this.onRest.bind(this)}
        />
        <SurveyItemContainer ref={i => (this.itemEl = i)}>
          <SurveyQuestion
            question={question}
            required={required}
            active={this.props.active}
          />
          {this.props.surveyComponent}
        </SurveyItemContainer>
      </React.Fragment>
    );
  }
}

const SurveyItemContainer: ReactComponentStyled<any> = styled.div`
  padding-bottom: 60px;
  .inactive {
    opacity: 0.1;
  }
`;

export default SurveyItem;
