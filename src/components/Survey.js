//@flow
import * as React from "react";
import type {
  SurveyItemType,
  surveyItemState,
  surveyLibrary,
  Options
} from "../lib/flowTypes.js";
import SurveyItem from "./SurveyItem.js";
import surveyLib from "../lib/surveyLib";

type Props = {
  items: SurveyItemType[]
};

type State = {
  items: SurveyItemType[],
  currentItem: number,
  lib: surveyLibrary
};

export default class Survey extends React.Component<Props, State> {
  state = {
    items: this.props.items,
    currentItem: 0,
    lib: surveyLib()
  };

  // a runtime array of the 'surveyItem' elements, for animation, etc.
  subElements: HTMLDivElement[] = [];

  componentDidMount() {
    // User provided survey objects have no 'surveyItemState' on them.
    // 'surveyItemState' is passed to each item, and updates the state
    // in this component. Definitions for each component's state are stored
    // with the component itself, imported into 'surveyLib' and then
    // accessed here by type.
    const { items } = this.props;
    const itemsWithState = items.map(item => {
      let type = item.type;
      item.surveyItemState = this.state.lib[type].state();
      return item;
    });
    this.setState({ items: itemsWithState });

    //Get the heights to drive the animations, getting the height of the
    //"SurveyItem" component.
    this.subElements.forEach((item: HTMLDivElement, i: number) => {
      console.log(i, item.getBoundingClientRect().height);
    });
  }

  //used to get the reference to each SurveyItem, to get height.
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

  completeItem() {
    console.log("Item complete!");
    this.setState({ currentItem: this.state.currentItem + 1 });
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
      </React.Fragment>
    );
  }
}
