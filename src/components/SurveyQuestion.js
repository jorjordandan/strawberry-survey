//@flow

import React from "react";
import Typography from "@material-ui/core/Typography";

type Props = {
  number?: number,
  question: string,
  required: boolean,
  active: boolean
};

SurveyQuestion.defaultProps = {
  required: false,
  active: false
};

function addActiveClass(active: boolean): string {
  let defaultClasses = "survey-question";
  if (active) {
    return defaultClasses + " active";
  } else {
    return defaultClasses;
  }
}

function SurveyQuestion(props: Props) {
  return (
    <div className={addActiveClass(props.active)}>
      <Typography variant="h4" gutterBottom>
        {props.number && props.number.toString() + ". "}
        {props.question}
        {props.required && "*"}
      </Typography>
    </div>
  );
}

export default SurveyQuestion;
