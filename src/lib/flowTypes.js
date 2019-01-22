//@flow
import type { checkboxProps } from "../components/SurveyCheckbox";

export type Options = {
  forwardOnly?: boolean,
  label?: string,
  helperText?: string
};

export type surveyItemState = {
  checked?: boolean
};

export type SurveyItemType = {
  question: string,
  details?: string,
  type: string,
  required: boolean,
  options?: Options,
  skip?: any,
  completed: boolean,
  skipped: boolean,
  response: string[],
  status?: string,
  surveyItemState: surveyItemState,
  answer?: {
    checked?: boolean,
    value?: string
  }
};

export type surveyLibrary = {
  checkbox?: {
    component: checkboxProps => mixed,
    handler: () => mixed,
    state?: surveyItemState,
    options?: Options
  }
};
