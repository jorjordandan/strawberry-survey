// @flow
import type { surveyItemType } from "./flowTypes";

type States = {
  prevState: surveyItemType[],
  newState: surveyItemType[]
};
export function getStates(ctx: any): States {
  let states = {};
  states.prevState = ctx.state.items;
  states.newState = ctx.state.items.slice();
  return states;
}
