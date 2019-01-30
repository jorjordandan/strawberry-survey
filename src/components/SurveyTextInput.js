//@flow
import React, { Component } from "react"
import { TextField } from "@material-ui/core"
import type { Options } from "../lib/flowTypes.js"
import { getStates } from "../lib/utilities.js"
import SurveyContainer from "../components/SurveyContainer.js"

type Props = {
  onHandle: (event: SyntheticEvent<>) => mixed,
  options: Options,
  active: boolean
}

// NOTE: While this is not actually a stateful component, the state
// is tracked in the Survey component. This is the
// type that will be used there.
type State = {
  value: string
}

class SurveyTextInput extends Component<Props, State> {
  state = {
    value: ""
  }

  static defaultProps = {
    itemState: { value: "" }
  }

  onChange(event: SyntheticEvent<HTMLInputElement>) {
    // eslint-disable-next-line no-unused-expressions
    ;(event.currentTarget: HTMLInputElement)
    this.setState({ value: event.currentTarget.value })
  }

  render() {
    return (
      <form onSubmit={this.props.onHandle} method="get">
        <TextField
          value={this.state.value}
          onChange={this.onChange.bind(this)}
          label={this.props.options.label}
          disabled={!this.props.active}
          helperText={"[Enter] to submit"}
        />
      </form>
    )
  }
}

const textInputHandler = () => {
  return (
    event: SyntheticEvent<HTMLElement>,
    ctx: React$ElementRef<typeof SurveyContainer>,
    idx: number
  ) => {
    event.preventDefault()
    // eslint-disable-next-line no-unused-expressions
    ;(event.currentTarget: HTMLElement)
    const inputVal = event.currentTarget.getElementsByTagName("input")[0].value
    //return two copies of state...
    const { newState } = getStates(ctx)
    const state = newState[idx]

    //pass in the new survetItemState, answer, and set completed to true
    state.answer = { value: inputVal }
    state.completed = true
    state.skipped = false
    //.. and replace the old state.
    ctx.setState({ items: newState })

    ctx.completeItem(idx)
  }
}

export default SurveyTextInput
export { textInputHandler }
export type { Props as textInputProps }
