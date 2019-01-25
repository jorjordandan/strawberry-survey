//@flow
import * as React from "react";
import { Spring } from "react-spring";
import type {
  SurveyItemType,
  surveyItemState,
  surveyLibrary,
  Options
} from "../lib/flowTypes.js";
import SurveyItem from "./SurveyItem.js";
import NextButton from "./NextButton.js";
import SimpleSnackbar from "./Snackbar.js";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

type Props = {
  items: SurveyItemType[],
  surveyLibrary: surveyLibrary,
  buildComponent: (
    handler: () => mixed,
    state: surveyItemState,
    options: Options | typeof undefined,
    type: string,
    active: boolean
  ) => React$Element<any>,
  buildHandler: (type: string, idx: number) => mixed,
  completeItem: (idx: number) => mixed,
  uncompleteItem: (idx: number) => mixed,
  currentItem: number
};

type State = {
  currentItemHeight: number,
  totalOffset: number,
  currentSectionTitle: string,
  userMessage: {
    type: string,
    content: string
  }
};

export default class Survey extends React.Component<Props, State> {
  state = {
    currentItemHeight: 0,
    totalOffset: 0,
    currentSectionTitle: "",
    userMessage: {
      type: "none",
      content: ""
    }
  };

  // an array of the 'surveyItem' elements, for animation, etc.
  subElements: HTMLDivElement[] = [];

  componentDidMount() {
    //Get the initial item height for the animations
    const currentItemHeight = this.subElements[
      this.props.currentItem
    ].getBoundingClientRect().height;
    this.setState({
      currentItemHeight
    });
  }

  //used to get the reference to each SurveyItem element, to get height.
  getRef = (ref: HTMLDivElement, i: number) => {
    this.subElements[i] = ref;
  };

  componentDidUpdate(prevProps: Props) {
    const currentItemIdx = this.props.currentItem;
    const nextElem = this.subElements[currentItemIdx];
    const isNextElem = typeof nextElem !== "undefined";
    const { totalOffset, currentItemHeight } = this.state;
    const currentItem = this.props.items[currentItemIdx];

    if (!isNextElem) {
      //do something.
      console.log("Survey is done!");
      return true;
    }
    if (
      currentItem.sectionTitle !== undefined &&
      currentItem.sectionTitle !== this.state.currentSectionTitle
    ) {
      this.setState({ currentSectionTitle: currentItem.sectionTitle });
    }

    const newItemHeight = nextElem.getBoundingClientRect().height;
    if (prevProps.currentItem < this.props.currentItem) {
      this.setState({ totalOffset: totalOffset + currentItemHeight });
      this.setState({ currentItemHeight: newItemHeight });
    } else if (prevProps.currentItem > this.props.currentItem) {
      this.setState({ totalOffset: totalOffset - currentItemHeight });

      //TODO: Make some big and small components to test this.
      this.setState({ currentItemHeight: newItemHeight });
    }
  }

  handleCloseSnackbar() {
    const userMessage = { type: "none", content: "" };
    this.setState({ userMessage });
  }

  //don't get next button if item is required.
  getNextButton() {
    const idx = this.props.currentItem;
    const currentItem = this.props.items[idx];

    if (!currentItem) {
      return false;
    }
    if (!currentItem.required) {
      return <NextButton onClick={() => this.props.completeItem(idx)} />;
    } else {
      return null;
    }
  }

  render() {
    return (
      <React.Fragment>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              {this.state.currentSectionTitle}
            </Typography>
          </Toolbar>
        </AppBar>
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
                        currentItem={this.props.currentItem}
                        completed={item.completed}
                        key={idx}
                        idx={idx}
                        uncompleteItem={this.props.uncompleteItem}
                        active={this.props.currentItem === idx}
                        itemHeight={this.state.currentItemHeight}
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
        {this.getNextButton()}

        <SimpleSnackbar
          userMessage={this.state.userMessage}
          handleClose={this.handleCloseSnackbar.bind(this)}
        />
      </React.Fragment>
    );
  }
}
