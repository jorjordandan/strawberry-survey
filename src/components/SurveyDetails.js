//@flow

import React from "react";
import Typography from "@material-ui/core/Typography";

type Props = {
  details: string,
  required: boolean,
  active: boolean
};

SurveyDetails.defaultProps = {
  required: false,
  active: false
};

function addActiveClass(active: boolean): string {
  let defaultClasses = "survey-question";
  if (active) {
    return defaultClasses + " active";
  } else {
    return defaultClasses + " inactive";
  }
}

function SurveyDetails(props: Props) {
  return (
    <div className={addActiveClass(props.active)}>
      <Typography variant="subtitle1" gutterBottom>
        {props.details}
      </Typography>
    </div>
  );
}

export default SurveyDetails;
