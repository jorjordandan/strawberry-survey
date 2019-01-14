//@flow
import * as React from "react";
import { Spring, config } from "react-spring";
import type {
  SurveyItemType,
  surveyItemState,
  surveyLibrary,
  Options
} from "../lib/flowTypes.js";
import SurveyItem from "./SurveyItem.js";
import getSurveyLib from "../lib/surveyLib";
import NextButton from "./NextButton.js";
import SimpleSnackbar from "./Snackbar.js";
import { addPropertiesToItems } from "../lib/utilities.js";

type Props = {
  items: SurveyItemType[]
};

type State = {
  items: SurveyItemType[],
  currentItem: number,
  currentItemHeight: number,
  totalOffset: number,
  lib: surveyLibrary,
  userMessage: {
    type: String,
    content: String
  }
};

export default class Survey extends React.Component<Props, State> {
  state = {
    items: this.props.items,
    currentItem: 0,
    lib: getSurveyLib(),
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
    // User provided survey objects need some extra properties added to them.
    // (see index in demo for example) surveyItemState, completed, and skipped
    // are passed to each item, and update the item's state tree
    // in this component. Definitions for each component's state are stored
    // with the component itself, imported into 'surveyLib' and then
    // accessed here by type.
    const { items } = this.props;
    const library = this.state.lib;
    this.setState({
      items: addPropertiesToItems(items, library)
    });

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

  // Each survey item type needs a different handler function.
  // Like the state, the handler function is defined with the component,
  // and then imported into 'surveyLib', and then accessed here based on the type.
  handle = (type: string, idx: number, event?: SyntheticEvent<>): void => {
    const handler = this.state.lib[type].handler();
    handler(event, this, idx);
  };

  //fires whenever an Item is complete
  completeItem() {
    const thisItem = this.state.items[this.state.currentItem];
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
      return true;
    }

    // animate to next question
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

  // Like the item state and handler, we dynamically access the
  // actual component based on the user provided object, and pass
  // in all the required props.
  buildSurveyComponent(
    handler: () => mixed,
    state: surveyItemState,
    options: Options,
    type: string,
    idx: number
  ) {
    const props = {
      onChange: handler,
      itemState: state,
      options: options,
      active: this.state.currentItem === idx
    };
    return React.createElement(this.state.lib[type].component, props, null);
  }

  render() {
    return (
      <React.Fragment>
        <Spring
          from={{ transform: "translate(0px, 10px)" }}
          to={{ transform: `translate(0px, ${-this.state.totalOffset}px)` }}
          config={config.stiff}
        >
          {props => {
            return (
              <div style={props}>
                <div style={{ height: "30vh" }} />

                {this.state.items &&
                  this.state.items.map((item, idx) => {
                    return (
                      <SurveyItem
                        getRef={this.getRef}
                        item={item}
                        key={idx}
                        idx={idx}
                        active={this.state.currentItem === idx}
                        surveyComponent={this.buildSurveyComponent(
                          this.handle.bind(this, item.type, idx),
                          item.surveyItemState,
                          item.options,
                          item.type,
                          idx
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
