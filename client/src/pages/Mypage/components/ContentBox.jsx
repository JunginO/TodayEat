import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const BoxWrapper = styled.div`
  .content-box {
    padding: 10px;
    margin-bottom: 10px;
    width: 400px;
  }
  .title {
    font-weight: 600;
  }
`;

const ContentBox = ({ data }) => {
  return (
    <BoxWrapper>
      <div className="content-box">
        <div className="title">{data.title}</div>
        <div className="content">{data.content}</div>
      </div>
      <div></div>
    </BoxWrapper>
  );
};
export default ContentBox;
