//@flow
import React from "react";

type Props = {
  onChange: (event: SyntheticEvent<>) => mixed,
  itemState: any
};

const SurveyCheckbox = (props: Props) => {
  return (
    <input
      type="checkbox"
      checked={props.itemState.checked}
      onChange={props.onChange}
    />
  );
};

SurveyCheckbox.defaultProps = {
  checked: false,
  itemState: { checked: false }
};

export default SurveyCheckbox;
