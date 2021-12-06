import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;
const Label = styled.div`
  font-size: 1rem;
  color: gray;
  margin-bottom: 0.25rem;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid gray;
  line-height: 2.5rem;
  font-size: 1.2rem;
  padding-left: 0.5rem;
  padding-left: 0.5rem;
  border-radius: 0px;
  outline: none;
`;

const InputWithLabel = ({ label, ...rest }) => {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input {...rest} />
    </Wrapper>
  );
};
export default InputWithLabel;
