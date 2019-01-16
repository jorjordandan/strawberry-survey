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
  buildHandler: () => mixed
};

type State = {
  currentItem: number,
  currentItemHeight: number,
  totalOffset: number,
  userMessage: {
    type: String,
    content: String
  }
};

export default class SurveyTwo extends React.Component<Props, State> {
  state = {
    currentItem: 0,
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
      this.state.currentItem
    ].getBoundingClientRect().height;
    this.setState({
      currentItemHeight
    });
  }

  //used to get the reference to each SurveyItem element, to get height.
  getRef = (ref: any, i: number) => {
    this.subElements[i] = ref;
  };

  //fires whenever an Item is complete
  completeItem() {
    const thisItem = this.props.items[this.state.currentItem];
    //note: completed here means survey item completed, not the whole thing.
    const { required, completed } = thisItem;
    const { totalOffset, currentItemHeight, currentItem } = this.state;
    const nextElem = this.subElements[currentItem + 1];
    const isNextElem = typeof nextElem !== "undefined";

    if (!thisItem) {
      console.log("no more items!");
      return true;
    }

    if (required && !completed) {
      const userMessage = {
        type: "Error",
        content: "This answer is required."
      };
      this.setState({ userMessage });
      console.log("this question is required!");
      return true;
    }

    if (!isNextElem) {
      console.log("Survey is done!");
      //hide next button,
      //trigger surveyComplete action
      return true;
    }

    // animate to next question
    // await completeFlash();
    const newItemHeight = nextElem.getBoundingClientRect().height;
    this.setState({ totalOffset: totalOffset + currentItemHeight });
    this.setState({ currentItemHeight: newItemHeight });
    //todo: skip logic
    this.setState({ currentItem: currentItem + 1 });
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
                        active={this.state.currentItem === idx}
                        surveyComponent={this.props.buildComponent(
                          this.props.buildHandler.bind(this, item.type, idx),
                          item.surveyItemState,
                          item.options,
                          item.type,
                          this.state.currentItem === idx
                        )}
                      />
                    );
                  })}
              </div>
            );
          }}
        </Spring>
        <NextButton onClick={this.completeItem.bind(this)} />
        <SimpleSnackbar
          userMessage={this.state.userMessage}
          handleClose={this.handleCloseSnackbar.bind(this)}
        />
      </React.Fragment>
    );
  }
}
