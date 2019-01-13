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
