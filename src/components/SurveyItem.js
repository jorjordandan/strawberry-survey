//@flow

import * as React from "react";
import type { SurveyItemType } from "../lib/flowTypes.js";
import styled, { type ReactComponentStyled } from "styled-components";
import SurveyQuestion from "./SurveyQuestion";
import SurveyDetails from "./SurveyDetails";
import SurveyCursor from "./SurveyCursor";

type Props = {
  item: SurveyItemType,
  surveyComponent: React$Element<any>,
  active: boolean,
  completed: boolean,
  idx: number,
  itemHeight: number,
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
      item: { question, required, details }
    } = this.props;
    return (
      <React.Fragment>
        <SurveyCursor
          active={this.props.active}
          onRest={this.onRest.bind(this)}
          completed={this.props.item.completed}
          itemHeight={this.props.itemHeight}
        />
        <SurveyItemContainer ref={i => (this.itemEl = i)}>
          <SurveyQuestion
            question={question}
            required={required}
            active={this.props.active}
          />
          <SurveyDetails details={details} active={this.props.active} />
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
