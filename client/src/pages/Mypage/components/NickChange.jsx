import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
const NickChangeWrapper = styled.div`
  width: 100%;
  padding-top: 55px;
  padding-bottom: 48px;

  button {
    margin: 5px;
    border: 2px solid gray;
    border-radius: 5px;
    padding: 5px;
    height: 30px;
    text-align: center;
    align-self: center;
    &:hover {
      background: gray;
    }
    &:active {
      background: gray;
    }
    text-decoration: none;
  }
`;

const NickChange = () => {
  const [nick, setNickname] = useState("");
  let userId = window.localStorage.getItem("userId");

  const onClickDel = async () => {
    const result = await axios({
      method: "DELETE",
      url: `http://localhost:5000/api/user/${userId}`,
      data: {
        user_id: userId,
      },
    });
    if (result) {
      localStorage.clear();
      window.location.replace("/");
    } else {
      alert("Server Error");
    }
  };
  return (
    <NickChangeWrapper>
      <button onClick={onClickDel} className="button">
        회원탈퇴
      </button>
    </NickChangeWrapper>
  );
};

export default NickChange;
