//@flow
import React, { Component, Fragment } from "react";
import type { SurveyItemType } from "./flowTypes.js";
import SurveyItem from "./SurveyItem.js";
import changeHandlers from "./changeHandlers.js";

type Props = {
  items: SurveyItemType[]
};

export default class Survey extends Component<Props> {
  handle = (type: string, event: SyntheticEvent<>) => {
    const handler = changeHandlers(type);
    handler(event, this);
  };

  prepareItem = item => {
    item.surveyItemState = {
      checked: false
    };
    return item;
  };

  render() {
    return (
      <Fragment>
        {this.props.items.map((item, idx) => (
          <SurveyItem
            item={this.prepareItem(item)}
            key={idx}
            handleChange={this.handle.bind(this, item.type)}
          />
        ))}
      </Fragment>
    );
  }
}
