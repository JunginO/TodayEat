import React from "react";
import styled from "styled-components";

const Title = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: black;
  margin-bottom: 1rem;
  text-align: center;
`;

const AuthContent = ({ title, children }) => (
  <div>
    <Title>{title}</Title>
    {children}
  </div>
);
export default AuthContent;
