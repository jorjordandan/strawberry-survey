// @flow
import type { surveyLibrary } from "./flowTypes.js";

import SurveyCheckbox, {
  checkboxHandler,
  checkboxState
} from "../components/SurveyCheckbox";

import SurveyTextInput, {
  textInputHandler,
  textInputState
} from "../components/SurveyTextInput";

import SurveySection, { sectionHandler } from "../components/SurveySection";

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

  surveyLib.textInput = {
    component: SurveyTextInput,
    handler: textInputHandler,
    state: textInputState
  };

  surveyLib.section = {
    component: SurveySection,
    handler: sectionHandler
  };

  return surveyLib;
}
