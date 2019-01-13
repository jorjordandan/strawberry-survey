import React from "react";
import styled from "styled-components";
import { Spring } from "react-spring";

type Props = {
  active: boolean
};
export default function SurveyCursor(props: Props) {
  const getWidth = () => {
    return props.active ? "10px" : "0px";
  };

  return (
    <Spring from={{ width: "0px" }} to={{ width: getWidth() }}>
      {props => {
        return <SurveyCursorStyle style={props} />;
      }}
    </Spring>
  );
}

const SurveyCursorStyle: ReactComponentStyled<any> = styled.div`
  width: 10px;
  height: 90px;
  float: left;
  margin-right: 20px;
  background-color: #bbb;
  border-radius: 5px;
`;
