// @flow
import type { surveyLibrary } from "./flowTypes.js"

import SurveyCheckbox, { checkboxHandler } from "../components/SurveyCheckbox"
import SurveyMultipleChoice, { multiChoiceHandler } from "../components/SurveyMultipleChoice"

import SurveyTextInput, { textInputHandler } from "../components/SurveyTextInput"

import SurveySection, { sectionHandler } from "../components/SurveySection"

// this function imports the survey components, their handlers,
// their state, and the components themselves, and assembles them
// into a library. This allows the Survey component to build the
// different survey by type.

export default function getSurveyLib(): surveyLibrary {
  console.info("getting survey library...")
  let surveyLib = {}

  surveyLib.checkbox = {
    component: SurveyCheckbox,
    handler: checkboxHandler
  }

  surveyLib.textInput = {
    component: SurveyTextInput,
    handler: textInputHandler
  }

  surveyLib.section = {
    component: SurveySection,
    handler: sectionHandler
  }

  surveyLib.multiChoice = {
    component: SurveyMultipleChoice,
    handler: multiChoiceHandler
  }

  return surveyLib
}
