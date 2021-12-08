import React from "react";
import styled from "styled-components";
import { COLORS } from "./Colors";
const Cutie = styled.button`
  display: inline-block;
  font-size: 30px;
  font-weight: 600;
  margin: 0px 5px 5px 5px;
  text-align: center;
  background-color: ${COLORS.yellow};
  border-radius: 10px;
  border: 2px solid ${COLORS.deepYellow};
  padding: 5px;

  &:hover {
    background: ${COLORS.deepYellow};
  }

  &:active {
    background: ${COLORS.pressedYellow};
  }
`;

const CuteButton = ({ title, children }) => <Cutie>{title}</Cutie>;
export default CuteButton;
