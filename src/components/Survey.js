//@flow
import * as React from "react";
import { Spring } from "react-spring";
import type { SurveyItemType, surveyLibrary } from "../lib/flowTypes.js";
import SurveyItem from "./SurveyItem.js";
import NextButton from "./NextButton.js";
import SimpleSnackbar from "./Snackbar.js";

type Props = {
  items: SurveyItemType[],
  library: surveyLibrary,
  buildComponent: () => mixed,
  buildHandler: () => mixed,
  completeItem: () => mixed,
  currentItem: number
};

type State = {
  currentItemHeight: number,
  totalOffset: number,
  userMessage: {
    type: String,
    content: String
  }
};

export default class Survey extends React.Component<Props, State> {
  state = {
    currentItemHeight: 0,
    totalOffset: 0,
    userMessage: {
      type: "none",
      content: ""
    }
  };

  // a runtime array of the 'surveyItem' elements, for animation, etc.
  subElements: HTMLDivElement[] = [];

  componentDidMount() {
    //Get the initial item height to drive the animations
    const currentItemHeight = this.subElements[
      this.props.currentItem
    ].getBoundingClientRect().height;
    this.setState({
      currentItemHeight
    });
  }

  //used to get the reference to each SurveyItem element, to get height.
  getRef = (ref: any, i: number) => {
    this.subElements[i] = ref;
  };

  componentDidUpdate(prevProps) {
    const currentItem = this.props.currentItem;

    const nextElem = this.subElements[currentItem];
    const isNextElem = typeof nextElem !== "undefined";

    const { totalOffset, currentItemHeight } = this.state;

    if (!isNextElem) {
      console.log("Survey is done!");
      return true;
    }

    const newItemHeight = nextElem.getBoundingClientRect().height;
    if (prevProps.currentItem !== this.props.currentItem) {
      this.setState({ totalOffset: totalOffset + currentItemHeight });
      this.setState({ currentItemHeight: newItemHeight });
    }
  }

  handleCloseSnackbar() {
    const userMessage = { type: "none", content: "" };
    this.setState({ userMessage });
  }

  render() {
    return (
      <React.Fragment>
        <Spring
          from={{ transform: "translate(0px, 10px)" }}
          to={{ transform: `translate(0px, ${-this.state.totalOffset}px)` }}
          config={{ tension: 190, friction: 30, velocity: 20, clamp: false }}
        >
          {props => {
            return (
              <div style={props}>
                <div style={{ height: "30vh" }} />

                {this.props.items &&
                  this.props.items.map((item, idx) => {
                    return (
                      <SurveyItem
                        getRef={this.getRef}
                        item={item}
                        key={idx}
                        idx={idx}
                        active={this.props.currentItem === idx}
                        surveyComponent={this.props.buildComponent(
                          this.props.buildHandler.bind(this, item.type, idx),
                          item.surveyItemState,
                          item.options,
                          item.type,
                          this.props.currentItem === idx
                        )}
                      />
                    );
                  })}
              </div>
            );
          }}
        </Spring>
        <NextButton
          onClick={() => this.props.completeItem(this.props.currentItem)}
        />
        <SimpleSnackbar
          userMessage={this.state.userMessage}
          handleClose={this.handleCloseSnackbar.bind(this)}
        />
      </React.Fragment>
    );
  }
}
