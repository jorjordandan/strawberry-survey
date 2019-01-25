//@flow
import * as React from "react";
import type {
  SurveyItemType,
  surveyItemState,
  surveyLibrary,
  Options
} from "../lib/flowTypes.js";
import getSurveyLib from "../lib/surveyLib";
import Survey from "./Survey.js";

import { addPropertiesToItems } from "../lib/utilities.js";

type Props = {
  items: SurveyItemType[]
};

type State = {
  items: SurveyItemType[],
  lib: surveyLibrary,
  currentItem: number
};

export default class SurveyContainer extends React.Component<Props, State> {
  state = { items: this.props.items, lib: getSurveyLib(), currentItem: 0 };

  // User provided survey objects need some extra properties added to them.
  //Definitions for each component's state are stored
  // with the component itself, imported into 'surveyLib' and then
  // accessed here by type.
  componentDidMount() {
    const { items } = this.props;
    const library = this.state.lib;
    this.setState({
      items: addPropertiesToItems(items, library)
    });
  }

  // Each survey item type needs a different handler function.
  // Like the state, the handler function is defined with the component,
  // and then imported into surveyLib, and then accessed here based on the type.
  buildHandler = (
    type: string,
    idx: number,
    event?: SyntheticEvent<>
  ): void => {
    const newHandler = this.state.lib[type].handler();
    newHandler(event, this, idx);
  };

  // Like the item state and handler, we access the
  // actual component based on the user provided object, and pass
  // in all the required props.
  buildSurveyComponent(
    handler: () => mixed,
    state: surveyItemState,
    options: Options,
    type: string,
    active: boolean
  ): React$Element<any> {
    const props = {
      onHandle: handler,
      itemState: state,
      options: options,
      active: active
    };

    return React.createElement(this.state.lib[type].component, props, null);
  }

  async completeItem(idx: number) {
    console.log(`Processing item ${idx}`);
    if (this.state.items[idx].required && !this.state.items[idx].completed) {
      console.log("this question is required!"); //use snackbar
      return true;
    }

    await wait(800);
    this.setState({
      currentItem: this.state.currentItem + 1
    });
  }

  async uncompleteItem(idx: number) {
    console.log(`unprocessing item ${idx}`);
    this.setState({
      currentItem: this.state.currentItem - 1
    });
  }

  render() {
    return (
      <Survey
        items={this.state.items}
        surveyLibrary={this.state.lib}
        buildComponent={this.buildSurveyComponent.bind(this)}
        buildHandler={this.buildHandler}
        currentItemIdx={this.state.currentItem}
        completeItem={this.completeItem.bind(this)}
        uncompleteItem={this.uncompleteItem.bind(this)}
      />
    );
  }
}

const wait = (amount = 0) =>
  new Promise(resolve => setTimeout(resolve, amount));
