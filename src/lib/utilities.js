// @flow
import type { SurveyItemType } from "./flowTypes";
import Survey from "../components/Survey.js";

type States = {
  prevState: SurveyItemType[],
  newState: SurveyItemType[]
};
export function getStates(ctx: React$ElementRef<typeof Survey>): States {
  let states = {};
  states.prevState = ctx.state.items;
  states.newState = ctx.state.items.slice();
  return states;
}

export function addPropertiesToItems(items, library) {
  const itemsWithProperties = items.map(item => {
    let type = item.type;
    item.complete = false;
    item.skipped = true;
    item.surveyItemState = library[type].state();
    return item;
  });
  return itemsWithProperties;
}
