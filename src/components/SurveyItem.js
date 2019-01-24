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
  currentItem: number,
  itemHeight: number,
  getRef: (ref: any, i: number) => mixed,
  uncompleteItem: (idx: number) => mixed
};

type State = {
  answer: string[],
  checked: boolean,
  animation: string,
  surveyItemState?: {
    checked?: boolean
  },
  optionalStyle?: {
    textAlign: string,
    height: string
  }
};

class SurveyItem extends React.Component<Props, State> {
  state = {
    answer: [],
    checked: false,
    optionalStyle: {},
    animation: ""
  };

  itemEl: ?HTMLDivElement;

  componentDidMount() {
    this.props.getRef(this.itemEl, this.props.idx);
    if (this.props.item.type === "section") {
      this.setState({
        optionalStyle: { textAlign: "center", height: "300px" }
      });
    }
  }

  componentDidUpdate(prevProps: Props) {
    let animation: string = "";
    if (
      prevProps.active !== this.props.active ||
      prevProps.completed !== this.props.completed
    ) {
      if (this.props.completed) {
        animation = "wiggle";
      }
      if (this.props.active) {
        animation = "show";
      }
      if (this.props.active && this.props.completed) {
        animation = "wiggle";
      }

      this.setState({ animation: animation });
    }
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

  itemClick() {
    if (
      this.props.active === false &&
      this.props.item.completed === true &&
      this.props.idx < this.props.currentItem
    ) {
      this.props.uncompleteItem(this.props.idx);
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
            animation={this.state.animation}
          />
        )}
        <SurveyItemContainer
          ref={i => (this.itemEl = i)}
          style={this.state.optionalStyle}
          onClick={this.itemClick.bind(this)}
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
