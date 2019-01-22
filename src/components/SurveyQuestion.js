//@flow

import React from "react";
import Typography from "@material-ui/core/Typography";

type Props = {
  number?: number,
  question: string,
  required: boolean,
  active: boolean,
  type: string
};

SurveyQuestion.defaultProps = {
  required: false,
  active: false
};

function addActiveClass(props: Props): string {
  let classes = "survey-question";
  const { active, type } = props;
  let addedClasses = "";
  addedClasses = active ? " active" : " inactive";
  if (type === "section") {
    addedClasses += " section";
  }
  classes += addedClasses;
  return classes;
}

function SurveyQuestion(props: Props) {
  return (
    <div className={addActiveClass(props)}>
      <Typography variant="h4" gutterBottom>
        {props.type !== "section" &&
          props.number &&
          props.number.toString() + ". "}
        {props.question}
        {props.required && "*"}
      </Typography>
    </div>
  );
}

export default SurveyQuestion;
