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

  getStyle() {
    if (this.props.item.type === "section") {
      return { textAlign: "center", height: "300px" };
    }
  }

  render() {
    const {
      item: { question, required }
    } = this.props;
    return (
      <div>
        {this.props.item.type !== "section" && (
          <SurveyCursor
            active={this.props.active}
            completed={this.props.item.completed}
            itemHeight={this.props.itemHeight}
          />
        )}
        <SurveyItemContainer
          ref={i => (this.itemEl = i)}
          style={this.getStyle()}
        >
          <SurveyQuestion
            number={this.props.item.numbering}
            question={question}
            required={required}
            active={this.props.active}
            type={this.props.item.type}
          />
          {this.getDetailsIfExist()}
          {this.props.surveyComponent}
        </SurveyItemContainer>
      </div>
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
