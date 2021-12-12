import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
const BoxWrapper = styled.div`
  .content-box {
    padding: 10px;
    margin-bottom: 10px;
    width: 400px;
    border: 1px solid gray;
    display: flex;
    justify-content: space-between;
  }
  .title {
    font-weight: 600;
  }
  button {
    display: inline-block;
  }
`;

const SelectedFoodbox = ({ data }) => {
  const onClickDel = async () => {
    const result = await axios({
      method: "DELETE",
      url: `http://localhost:5000/api/food/delete/${data.food_name}`,
    });
    if (result) {
      console.log("delete~!");
      alert("삭제완료!");
      window.location.replace("/food");
    } else {
      alert("Server Error");
    }
  };
  return (
    <BoxWrapper>
      <div className="content-box">
        <div className="title">{data.food_name}</div>
        <button onClick={onClickDel}>삭제</button>
      </div>
      <div></div>
    </BoxWrapper>
  );
};
export default SelectedFoodbox;
