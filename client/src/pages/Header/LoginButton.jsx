import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { COLORS } from "../../components/Colors";
const BorderedButton = styled(Link)`
  font-size: 1rem;
  font-weight: 600;
  color: ${COLORS.mainfont};
  text-decoration: none;
  margin-right: 10px;
`;

const LoginButton = () => {
  let id = window.localStorage.getItem("userId");

  const setData = () => {
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("logged-in");
  };
  return localStorage.getItem("logged-in") ? (
    <div>
      <BorderedButton to="/mypage">
        {JSON.parse(id)}님, 환영합니다!
      </BorderedButton>
    </div>
  ) : (
    <div>
      <BorderedButton to="/auth/login">로그인/회원가입</BorderedButton>
    </div>
  );
};
export default LoginButton;
