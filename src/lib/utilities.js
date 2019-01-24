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
  let numbering = 1;
  const itemsWithProperties = items.map(item => {
    let type = item.type;
    item.completed = false;
    item.skipped = true;

    //increment for regular questions, reset on sections
    if (type !== "section") {
      item.numbering = numbering;
      numbering += 1;
    } else {
      item.numbering = 1;
      numbering = 1;
    }

    return item;
  });
  return itemsWithProperties;
}
