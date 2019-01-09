//@flow

export type Options = {
  forwardOnly?: boolean
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
