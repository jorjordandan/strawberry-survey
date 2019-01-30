//@flow
import * as React from "react"
import type { SurveyItemType, surveyLibrary, Options } from "../lib/flowTypes.js"
import getSurveyLib from "../lib/surveyLib"
import Survey from "./Survey.js"
import { AppBar, Toolbar, Typography } from "@material-ui/core"

import { addPropertiesToItems } from "../lib/utilities.js"
// This component is responsible for a passing the user provided survey object in
// and tracking the index of the current item, which controls which item is active, and
// the animations. The AppBar is also in this component.

type Props = {
  items: SurveyItemType[]
}

type State = {
  items: SurveyItemType[],
  lib: surveyLibrary,
  currentItemIdx: number,
  currentSectionTitle: string,
  showHeader: boolean
}

export default class SurveyContainer extends React.Component<Props, State> {
  state = {
    items: this.props.items,
    lib: getSurveyLib(),
    currentItemIdx: 0,
    currentSectionTitle: "",
    showHeader: false
  }

  // User provided survey objects need some extra properties added to them.
  componentDidMount() {
    const { items } = this.props
    const library = this.state.lib
    this.setState({
      items: addPropertiesToItems(items, library)
    })
  }

  componentDidUpdate(prevProps: Props) {
    const currentItemIdx = this.state.currentItemIdx
    const currentItem = this.state.items[currentItemIdx]

    if (currentItem === undefined) {
      console.log("Survey done in survey")
      return true
    }
    if (
      currentItem.sectionTitle !== undefined &&
      currentItem.sectionTitle !== this.state.currentSectionTitle
    ) {
      this.setState({ currentSectionTitle: currentItem.sectionTitle })
      this.setState({ showHeader: false })
    }
    if (currentItem.sectionTitle === undefined && !this.state.showHeader) {
      this.setState({ showHeader: true })
    }
  }

  // Each survey item type needs a different handler function.
  // the handler function is defined with the component,
  // and then imported into surveyLib, and then accessed here based on the type.
  buildHandler = (type: string, idx: number, event?: SyntheticEvent<>): void => {
    const newHandler = this.state.lib[type].handler()
    newHandler(event, this, idx)
  }

  // Like the handler, we access the ctual component based on the
  // a user provided object, and pass in all the required props.
  buildSurveyComponent(
    handler: () => mixed,
    options: Options,
    type: string,
    active: boolean
  ): React$Element<any> {
    const props = {
      onHandle: handler,
      options: options,
      active: active
    }

    return React.createElement(this.state.lib[type].component, props, null)
  }

  async completeItem(idx: number) {
    console.log(`Processing item ${idx}`)
    if (this.state.items[idx].required && !this.state.items[idx].completed) {
      console.log("this question is required!") //use snackbar
      return true
    }

    //dont stall animation of sections.
    if (this.state.items[idx].type !== "section") {
      await wait(800)
    }
    this.setState({
      currentItemIdx: this.state.currentItemIdx + 1
    })
  }

  uncompleteItem(idx: number) {
    console.log(`unprocessing item ${idx}`)
    this.setState({
      currentItemIdx: this.state.currentItemIdx - 1
    })
  }

  render() {
    return (
      <React.Fragment>
        {this.state.showHeader && (
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                {this.state.currentSectionTitle}
              </Typography>
            </Toolbar>
          </AppBar>
        )}
        <Survey
          items={this.state.items}
          buildComponent={this.buildSurveyComponent.bind(this)}
          buildHandler={this.buildHandler}
          currentItemIdx={this.state.currentItemIdx}
          uncompleteItem={this.uncompleteItem.bind(this)}
        />
      </React.Fragment>
    )
  }
}

const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount))
