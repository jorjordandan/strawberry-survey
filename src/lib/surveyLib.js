// @flow
import type { Lib } from "./flowTypes.js";

import SurveyCheckbox, {
  checkboxHandler,
  checkboxState
} from "../components/SurveyCheckbox";

export default function surveyLib(): Lib {
  console.log("building library...");
  let surveyLib = {};

  surveyLib.checkbox = {
    component: SurveyCheckbox,
    handler: checkboxHandler,
    state: checkboxState
  };

  return surveyLib;
}
