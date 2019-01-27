//@flow
import * as React from "react";
import type {
  SurveyItemType,
  surveyItemState,
  surveyLibrary,
  Options
} from "../lib/flowTypes.js";
import SurveyItem from "./SurveyItem.js";
import SimpleSnackbar from "./Snackbar.js";
import withAnimation from "./withAnimation.js";

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
  uncompleteItem: (idx: number) => mixed,
  getRef: () => mixed,
  currentItemIdx: number,
  currentItemHeight: number,
  totalOffset: number
};

type State = {
  userMessage: {
    type: string,
    content: string
  }
};

class Survey extends React.Component<Props, State> {
  state = {
    userMessage: {
      type: "none",
      content: ""
    }
  };

  handleCloseSnackbar() {
    const userMessage = { type: "none", content: "" };
    this.setState({ userMessage });
  }

  //don't get next button if item is required.
  // getNextButton() {
  //   const idx = this.props.currentItemIdx;
  //   const currentItem = this.props.items[idx];

  //   if (!currentItem) {
  //     return false;
  //   }
  //   if (!currentItem.required) {
  //     return <NextButton onClick={() => this.props.completeItem(idx)} />;
  //   } else {
  //     return null;
  //   }
  // }

  render() {
    return (
      <React.Fragment>
        {this.props.items &&
          this.props.items.map((item, idx) => {
            return (
              <SurveyItem
                getRef={this.props.getRef}
                item={item}
                currentItemIdx={this.props.currentItemIdx}
                completed={item.completed}
                key={idx}
                idx={idx}
                uncompleteItem={this.props.uncompleteItem}
                active={this.props.currentItemIdx === idx}
                itemHeight={this.props.currentItemHeight}
                surveyComponent={this.props.buildComponent(
                  this.props.buildHandler.bind(this, item.type, idx),
                  item.surveyItemState,
                  item.options,
                  item.type,
                  this.props.currentItemIdx === idx
                )}
              />
            );
          })}

        <SimpleSnackbar
          userMessage={this.state.userMessage}
          handleClose={this.handleCloseSnackbar.bind(this)}
        />
      </React.Fragment>
    );
  }
}

export default withAnimation(Survey);
