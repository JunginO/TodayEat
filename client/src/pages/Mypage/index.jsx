import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const TopWrapper = styled.div`
  .top-back {
    background-color: lightgray;
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 55px;
    padding: 20px 0px;
  }
  .center-box {
    display: flex;
    text-align: center;
    flex-direction: column;
  }
  .profile {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: block;
    margin: 0 auto;
  }
  .button-box {
    display: block;
  }
  .menu {
    margin: 20px 50px;
    width: 500px;
    padding: 15px;
  }

  .menumenu {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .menu-box {
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
  }
`;
const navigate = useNavigate;
const logoutevent = (e) => {
  localStorage.removeItem("key");
  localStorage.clear();
  navigate("/");
};
const index = () => {
  let id = window.localStorage.getItem("userId");
  return (
    <TopWrapper>
      <div className="top-back">
        <div className="center-box">
          <h3>{JSON.parse(id)}</h3>
          <div className="button-box">
            <button onClick={logoutevent}>로그아웃</button>
          </div>
        </div>
      </div>
      <div className="menumenu">
        <div className="menu">
          <div className="menu-box">계정 정보 설정</div>
          <div className="menu-box">관심 메뉴 설정</div>
        </div>
      </div>
    </TopWrapper>
  );
};
export default index;
