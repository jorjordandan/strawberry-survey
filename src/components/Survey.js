//@flow
import React, { Component, Fragment } from "react";
import type { SurveyItemType } from "./flowTypes.js";
import SurveyItem from "./SurveyItem.js";
import changeHandlers from "./changeHandlers.js";

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
      item.surveyItemState = { checked: false };
      return item;
    });
    this.setState({ items: itemsWithState });
  }

  handle = (type: string, idx: number, event: SyntheticEvent<>) => {
    const handler = changeHandlers(type, idx);
    handler(event, this, idx);
  };

  // itemStateDebug = state => {
  //   return state;
  // };

  render() {
    return (
      <Fragment>
        {this.state.items &&
          this.state.items.map((item, idx) => (
            <SurveyItem
              item={item}
              key={idx}
              handleChange={this.handle.bind(this, item.type, idx)}
              itemState={item.surveyItemState}
            />
          ))}
      </Fragment>
    );
  }
}
