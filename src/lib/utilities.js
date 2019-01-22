// @flow
import type { SurveyItemType, surveyLibrary } from "./flowTypes";
import SurveyContainer from "../components/SurveyContainer.js";

type States = {
  prevState: SurveyItemType[],
  newState: SurveyItemType[]
};
export function getStates(
  ctx: React$ElementRef<typeof SurveyContainer>
): States {
  let states = {};
  states.prevState = ctx.state.items;
  states.newState = ctx.state.items.slice();
  return states;
}

export function addPropertiesToItems(
  items: SurveyItemType[],
  library: surveyLibrary
): SurveyItemType[] {
  const itemsWithProperties = items.map(item => {
    let type = item.type;
    item.completed = false;
    item.skipped = true;
    item.surveyItemState = library[type].state();
    return item;
  });
  return itemsWithProperties;
}
