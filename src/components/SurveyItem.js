//@flow

import * as React from "react";
import type {
  SurveyItemType,
  surveyItemState,
  Options
} from "../lib/flowTypes.js";
import styled, { type ReactComponentStyled } from "styled-components";
import SurveyQuestion from "./SurveyQuestion";
import SurveyDetails from "./SurveyDetails";
import SurveyCursor from "./SurveyCursor";

type Props = {
  item: SurveyItemType,
  surveyComponent: (
    handler: () => mixed,
    state: surveyItemState,
    options: Options | typeof undefined,
    type: string,
    active: boolean
  ) => mixed,
  active: boolean,
  completed?: boolean,
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

class SurveyItem extends React.Component<Props, State> {
  state = {
    answer: [],
    checked: false
  };

  itemEl: ?HTMLDivElement;

  componentDidMount() {
    this.props.getRef(this.itemEl, this.props.idx);
  }

  onRest() {
    //do something...
    // console.log("boop");
  }

  getDetailsIfExist() {
    if (this.props.item.details) {
      return (
        <SurveyDetails
          details={this.props.item.details}
          active={this.props.active}
        />
      );
    } else {
      return null;
    }
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
          completed={this.props.item.completed}
          itemHeight={this.props.itemHeight}
        />
        <SurveyItemContainer ref={i => (this.itemEl = i)}>
          <SurveyQuestion
            question={question}
            required={required}
            active={this.props.active}
          />
          {this.getDetailsIfExist()}
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
