//@flow
import * as React from "react"
import type { SurveyItemType, buildComponent } from "../lib/flowTypes.js"
import SurveyItem from "./SurveyItem.js"
import SimpleSnackbar from "./Snackbar.js"
import withAnimation from "./withAnimation.js"

// this component is responsible for passing the handler function
// and other properties into the SurveyItem.
// there is also a user notification snackbar that lives here.
type Props = {
  items: SurveyItemType[],
  buildComponent: buildComponent,
  buildHandler: (type: string, idx: number) => mixed,
  uncompleteItem: (idx: number) => mixed,
  getRef: () => mixed,
  currentItemIdx: number,
  currentItemHeight: number,
  totalOffset: number
}

type State = {
  userMessage: {
    type: string,
    content: string
  }
}

class Survey extends React.Component<Props, State> {
  state = {
    userMessage: {
      type: "none",
      content: ""
    }
  }

  handleCloseSnackbar() {
    const userMessage = { type: "none", content: "" }
    this.setState({ userMessage })
  }

  render() {
    return (
      <React.Fragment>
        {this.props.items &&
          this.props.items.map((item, idx) => {
            return (
              <SurveyItem
                getRef={this.props.getRef}
                item={item}
                currentItemIdx={this.props.currentItemIdx}
                completed={item.completed}
                key={idx}
                idx={idx}
                uncompleteItem={this.props.uncompleteItem}
                active={this.props.currentItemIdx === idx}
                itemHeight={this.props.currentItemHeight}
                surveyComponent={this.props.buildComponent(
                  this.props.buildHandler.bind(this, item.type, idx),
                  item.options,
                  item.type,
                  this.props.currentItemIdx === idx
                )}
              />
            )
          })}

        <SimpleSnackbar
          userMessage={this.state.userMessage}
          handleClose={this.handleCloseSnackbar.bind(this)}
        />
      </React.Fragment>
    )
  }
}

export default withAnimation(Survey)
