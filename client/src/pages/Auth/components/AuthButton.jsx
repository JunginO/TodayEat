import React from "react";
import styled from "styled-components";
import { COLORS } from "../../../components/Colors";
const Wrapper = styled.div`
  margin-top: 1rem;
  padding-top: 0.6rem;
  padding-bottom: 0.5rem;

  background: ${COLORS.yellow};
  color: white;

  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;

  cursor: pointer;
  user-select: none;
  transition: 0.2s all;

  &:hover {
    background: ${COLORS.deepYellow};
  }

  &:active {
    background: ${COLORS.pressedYellow};
  }
`;

const AuthButton = ({ children, onClick }) => {
  return <Wrapper onClick={onClick}>{children}</Wrapper>;
};

export default AuthButton;
