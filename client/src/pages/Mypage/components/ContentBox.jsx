import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
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
  const onClickDel = async () => {
    const result = await axios({
      method: "DELETE",
      url: `http://localhost:5000/api/diary/delete/${data.id}`,
    });
    if (result) {
      console.log("delete~!");
      alert("삭제완료!");
      window.location.replace("/mypage");
    } else {
      alert("Server Error");
    }
  };
  return (
    <BoxWrapper>
      <div className="content-box">
        <div className="title">{data.title}</div>
        <div className="content">{data.content}</div>
      </div>
      <div>
        <button onClick={onClickDel}>삭제</button>
      </div>
    </BoxWrapper>
  );
};
export default ContentBox;
