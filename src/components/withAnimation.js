import React from "react";
import { Spring } from "react-spring";

type State = {
  test: string,
  currentItemHeight: number,
  totalOffset: number
};

const withAnimation = WrappedComponent => {
  return class WithAnimation extends React.Component<State> {
    constructor(props) {
      super(props);
      this.state = { test: "test", currentItemHeight: 0, totalOffset: 0 };
    }
    subElements: HTMLDivElement[] = [];
    componentDidMount() {
      //Get the initial item height for the animations
      const currentItemHeight =
        this.subElements[this.props.currentItemIdx].getBoundingClientRect()
          .height + 200; //kludge for bug where it doesn't recognize padding on first element...
      this.setState({ currentItemHeight });
    }
    //used to get the reference to each SurveyItem element, to get height.
    // This function is passed to surveyItem, but tracked in this component,
    // as an array of div elements.
    getRef = (ref: HTMLDivElement, i: number) => {
      this.subElements[i] = ref;
    };

    componentDidUpdate(prevProps: Props) {
      const currentItemIdx = this.props.currentItemIdx;
      const nextElem = this.subElements[currentItemIdx];
      const isNextElem = typeof nextElem !== "undefined";
      const { totalOffset, currentItemHeight } = this.state;
      let newItemHeight = 0;

      if (!isNextElem) {
        //do something.
        console.log("Survey is done!");
        return true;
      }

      //needs to be declared after the !isNextElem guard
      newItemHeight = nextElem.getBoundingClientRect().height;

      //if current item is bigger, then animate the page to scroll down
      if (this.props.currentItemIdx > prevProps.currentItemIdx) {
        this.setState({ totalOffset: totalOffset - currentItemHeight });
        this.setState({ currentItemHeight: newItemHeight });
        //if the current item is smaller, then scroll back up.
      } else if (this.props.currentItemIdx < prevProps.currentItemIdx) {
        this.setState({ totalOffset: totalOffset + currentItemHeight });
        this.setState({ currentItemHeight: newItemHeight });
      }
    }

    render() {
      return (
        <Spring
          from={{ transform: "translate(0px, 10px)" }}
          to={{ transform: `translate(0px, ${this.state.totalOffset}px)` }}
          config={{ tension: 190, friction: 30, velocity: 20, clamp: false }}
        >
          {props => {
            return (
              <div style={props}>
                <WrappedComponent
                  {...this.props}
                  test={this.state.test}
                  getRef={this.getRef}
                  currentItemHeight={this.state.currentItemHeight}
                  totalOffset={this.state.totalOffset}
                />
              </div>
            );
          }}
        </Spring>
      );
    }
  };
};

export default withAnimation;
