//@flow
import React, { Component, Fragment } from "react";
import type { SurveyItemType, surveyItemState } from "./flowTypes.js";
import SurveyItem from "./SurveyItem.js";
import changeHandlers from "./changeHandlers.js";
import getStateForComponentType from "./getStateForComponentType.js";
import SurveyCheckbox from "./SurveyCheckbox";

type Props = {
  items: SurveyItemType[]
};

type State = {
  items: SurveyItemType[]
};

export default class Survey extends Component<Props, State> {
  state = {
    items: this.props.items
  };

  componentDidMount() {
    const { items } = this.props;
    const itemsWithState = items.map(item => {
      let type = item.type;
      item.surveyItemState = getStateForComponentType(type);
      return item;
    });
    this.setState({ items: itemsWithState });
  }

  handle = (type: string, idx: number, event?: SyntheticEvent<>): void => {
    const handler = changeHandlers(type, idx);
    // $FlowFixMe
    handler(event, this, idx);
  };

  buildSurveyComponent(
    handler: () => mixed,
    state: surveyItemState,
    type: string
  ) {
    switch (type) {
      case "checkbox":
        return <SurveyCheckbox onChange={handler} itemState={state} />;

      default:
        return <p>{type} is not a valid Survey component.</p>;
    }
  }

  render() {
    return (
      <Fragment>
        {this.state.items &&
          this.state.items.map((item, idx) => (
            <SurveyItem
              item={item}
              key={idx}
              surveyComponent={this.buildSurveyComponent(
                this.handle.bind(this, item.type, idx),
                // $FlowFixMe
                item.surveyItemState,
                item.type
              )}
            />
          ))}
      </Fragment>
    );
  }
}
