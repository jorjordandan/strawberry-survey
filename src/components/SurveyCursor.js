import React from "react";
import styled from "styled-components";
import { Keyframes } from "react-spring";

type Props = {
  active: boolean,
  flash: boolean,
  onRest: () => mixed
};

const Container = Keyframes.Spring({
  // Single props
  show: { width: "10px" },
  // Chained animations (arrays)
  flash: [{ width: "2px" }]
});

export default function SurveyCursor(props: Props) {
  const getWidth = () => {
    return props.active ? "show" : "flash";
  };

  return (
    <Container
      state={getWidth()}
      onRest={props.onRest}
      config={{ tension: 190, friction: 10, velocity: 20, clamp: false }}
    >
      {props => {
        return <SurveyCursorStyle style={props} />;
      }}
    </Container>
  );
}

const SurveyCursorStyle: ReactComponentStyled<any> = styled.div`
  width: 0px;
  height: 90px;
  float: left;
  margin-right: 20px;
  background-color: #bbb;
  border-radius: 5px;
`;
