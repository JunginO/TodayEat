import React from "react";
import styled from "styled-components";
import { COLORS } from "./Colors";
const Cutie = styled.div`
  display: inline-block;
  font-size: 30px;
  font-weight: 600;
  margin: 0px 5px 5px 5px;
  text-align: center;
  background-color: ${COLORS.yellow};
  border-radius: 10px;
  padding: 5px;
`;

const CuteButton = ({ title, children }) => (
  <div>
    <Cutie>{title}</Cutie>
    {children}
  </div>
);
export default CuteButton;
