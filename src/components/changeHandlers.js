//@flow

export default function changeHandlers(
  type: string,
  idx: number
): (event: SyntheticEvent<>, ctx: any, idx: number) => mixed {
  switch (type) {
    case "checkbox":
      return (event: SyntheticEvent<>, ctx: any, idx) => {
        const { prevState, newState } = getStates(ctx);
        newState[idx].surveyItemState = {
          checked: !prevState[idx].surveyItemState.checked
        };
        ctx.setState({ items: newState });
      };
    default:
      return () => {
        console.warn(`No event of type ${type} found!`);
      };
  }
}

function getStates(ctx) {
  let states = {};
  states.prevState = ctx.state.items;
  states.newState = ctx.state.items.slice();
  return states;
}
