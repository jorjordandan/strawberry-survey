//@flow
import * as React from "react";
import type {
  SurveyItemType,
  surveyItemState,
  Lib,
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
  lib: Lib
};

export default class Survey extends React.Component<Props, State> {
  state = {
    items: this.props.items,
    currentItem: 0,
    lib: surveyLib()
  };

  componentDidMount() {
    const { items } = this.props;
    const itemsWithState = items.map(item => {
      let type = item.type;
      item.surveyItemState = this.state.lib[type].state();
      return item;
    });
    this.setState({ items: itemsWithState });
  }

  handle = (type: string, idx: number, event?: SyntheticEvent<>): void => {
    const handler = this.state.lib[type].handler();
    handler(event, this, idx);
  };

  buildSurveyComponent(
    handler: () => mixed,
    state: surveyItemState,
    options: Options,
    type: string,
    idx: number
  ) {
    console.log(state);
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
                item={item}
                key={idx}
                active={this.state.currentItem === idx}
                surveyComponent={this.buildSurveyComponent(
                  this.handle.bind(this, item.type, idx),
                  // $FlowFixMe
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
