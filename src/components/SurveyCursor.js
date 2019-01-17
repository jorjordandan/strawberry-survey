import React from "react";
import styled from "styled-components";
import { Keyframes, config } from "react-spring";

type Props = {
  active: boolean,
  completed: boolean,
  flash: boolean,
  onRest: () => mixed
};

const Container = Keyframes.Spring({
  // Single props
  show: { backgroundColor: "#ccc", width: "10px" },
  // Chained animations (arrays)
  completed: [
    { backgroundColor: "#0d9" },

    { backgroundColor: "#9d9", width: "2px" }
  ],
  wiggle: async (next, cancel, ownProps) => {
    await next({
      backgroundColor: "#0d9",
      config: { tension: 50, friction: 10, velocity: 10, clamp: true }
    });
    await next({
      backgroundColor: "#afa",
      config: {
        tension: 50,
        friction: 10,
        velocity: 10,
        clamp: true
      }
    });
    await next({
      backgroundColor: "#9d9",
      width: "2px",
      config: config.wobbly
    });
  }
});

export default function SurveyCursor(props: Props) {
  const getAnimation = () => {
    if (props.completed) {
      return "wiggle";
    }
    if (props.active) {
      return "show";
    }
  };

  return (
    <Container
      state={getAnimation()}
      onRest={props.onRest}
      config={{ tension: 220, friction: 10, velocity: 50, clamp: true }}
    >
      {props => {
        return <SurveyCursorStyle style={props} />;
      }}
    </Container>
  );
}

const SurveyCursorStyle: ReactComponentStyled<any> = styled.div`
  width: 10px;
  height: 90px;
  float: left;
  margin-right: 20px;
  background-color: #ccc;
  border-radius: 5px;
`;
