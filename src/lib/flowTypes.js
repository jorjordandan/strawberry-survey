//@flow
import type { checkboxProps } from "../components/SurveyCheckbox";

export type Options = {
  forwardOnly?: boolean,
  label?: string
};

export type surveyItemState = {
  checked?: boolean
};

export type SurveyItemType = {
  question: string,
  details?: string,
  type: string,
  required: boolean,
  options: Options,
  skip: any,
  completed: false,
  skipped: false,
  response: string[],
  status: string,
  surveyItemState: surveyItemState
};

export type surveyLibrary = {
  checkbox?: {
    component: checkboxProps => mixed,
    handler: () => mixed,
    state?: surveyItemState,
    options?: Options
  }
};
