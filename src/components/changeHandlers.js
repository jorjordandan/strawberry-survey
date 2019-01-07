//@flow

export default function changeHandlers(
  type: string
): (event: SyntheticEvent<>, ctx: any) => mixed {
  switch (type) {
    case "checkbox":
      return (event: SyntheticEvent<>, ctx: any) => {
        ctx.setState({ checked: !ctx.state.checked });
      };
    default:
      return () => {
        console.log("No event logged!");
      };
  }
}
