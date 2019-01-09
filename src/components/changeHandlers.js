//@flow
import type { SurveyItemType } from "./flowTypes.js";

export default function changeHandlers(
  type: string,
  idx: number
): (event: SyntheticEvent<>, ctx: any, idx: number) => mixed {
  switch (type) {
    case "checkbox":
      return (event: SyntheticEvent<>, ctx: any, idx) => {
        const prevState: SurveyItemType[] = ctx.state.items;
        const newState: SurveyItemType[] = ctx.state.items.slice();
        newState[idx].surveyItemState = {
          checked: !prevState[idx].surveyItemState.checked //this error... why?
        };
        ctx.setState({ items: newState });
      };
    default:
      return () => {
        console.warn(`No event of type ${type} found!`);
      };
  }
}
