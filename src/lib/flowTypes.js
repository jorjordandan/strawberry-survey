//@flow
import type { sectionProps } from "../components/SurveySection";

export type Options = {
  forwardOnly?: boolean,
  label?: string,
  helperText?: string,
  nextButtonText?: string,
  labels?: string[]
};

export type surveyItemState = {
  checked?: boolean,
  value?: string
};

export type SurveyItemType = {
  question: string,
  details?: string,
  type: string,
  required: boolean,
  sectionTitle: string,
  options?: Options,
  skip?: any,
  completed: boolean,
  numbering: number, // used for numbering survey questions, resets on sections.
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
    component: Class<any>,
    handler: () => mixed
  },
  section?: {
    component: sectionProps => mixed,
    handler: () => mixed
  },
  textInput?: {
    component: Class<any>,
    handler: () => mixed
  }
};
