//@flow
import * as React from "react";
import type {
  SurveyItemType,
  surveyItemState,
  surveyLibrary,
  Options
} from "../lib/flowTypes.js";
import getSurveyLib from "../lib/surveyLib";
import SurveyTwo from "./SurveyTwo.js";

import { addPropertiesToItems } from "../lib/utilities.js";

type Props = {
  items: SurveyItemType[]
};

type State = {
  items: SurveyItemType[],
  lib: surveyLibrary
};

export default class SurveyContainer extends React.Component<Props, State> {
  state = {
    items: this.props.items,
    lib: getSurveyLib()
  };

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
  }

  // Each survey item type needs a different handler function.
  // Like the state, the handler function is defined with the component,
  // and then imported into 'surveyLib', and then accessed here based on the type.
  buildHandler = (
    type: string,
    idx: number,
    event?: SyntheticEvent<>
  ): void => {
    const newHandler = this.state.lib[type].handler();
    newHandler(event, this, idx);
  };

  // Like the item state and handler, we dynamically access the
  // actual component based on the user provided object, and pass
  // in all the required props.
  buildSurveyComponent(
    handler: () => mixed,
    state: surveyItemState,
    options: Options,
    type: string,
    active: boolean
  ) {
    const props = {
      onChange: handler,
      itemState: state,
      options: options,
      active: active
    };

    return React.createElement(this.state.lib[type].component, props, null);
  }

  render() {
    return (
      <SurveyTwo
        items={this.state.items}
        surveyLibrary={this.state.lib}
        buildComponent={this.buildSurveyComponent.bind(this)}
        buildHandler={this.buildHandler}
      />
    );
  }
}
