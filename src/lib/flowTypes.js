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
  type: string,
  required: boolean,
  options: Options,
  skip: any,
  completed: false,
  skipped: false,
  response: string[],
  surveyItemState?: surveyItemState
};

export type Lib = {
  checkbox: {
    component: checkboxProps => mixed,
    handler: () => mixed,
    state?: surveyItemState,
    options?: Options
  }
};
