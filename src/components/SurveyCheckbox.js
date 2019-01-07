//@flow
import React from "react";

type Props = {
  checked: boolean,
  onChange: (event: SyntheticEvent<>) => mixed
};

const SurveyCheckbox = (props: Props) => {
  return (
    <input
      type="checkbox"
      checked={props.checked}
      onChange={props.onChange}
      {...props}
    />
  );
};

SurveyCheckbox.defaultProps = {
  checked: false
};

export default SurveyCheckbox;
