// @flow

type State = {
  checked?: boolean
};
export default function getStateForComponentType(type: string): State {
  switch (type) {
    case "checkbox":
      return { checked: false };
    default:
      throw new Error(`No State found for component of type ${type}`);
  }
}
