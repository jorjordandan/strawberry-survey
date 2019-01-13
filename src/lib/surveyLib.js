// @flow
import type { surveyLibrary } from "./flowTypes.js";

import SurveyCheckbox, {
  checkboxHandler,
  checkboxState
} from "../components/SurveyCheckbox";

// this function imports the survey components, their handlers,
// their state, and the components themselves, and assembles them
// into a library. This allows the Survey component to build the
// different survey by type.

export default function getSurveyLib(): surveyLibrary {
  console.info("getting survey library...");
  let surveyLib = {};

  surveyLib.checkbox = {
    component: SurveyCheckbox,
    handler: checkboxHandler,
    state: checkboxState
  };

  return surveyLib;
}
