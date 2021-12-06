import React from "react";
import { AuthButton } from ".";
import { AuthWrapper } from ".";
import { AuthContent } from ".";
import { InputWithLabel } from ".";
import { RightAlignedLink } from ".";
import { useState } from "react";
const Login = () => {
  const [userId, setUserId] = useState("");

  const setData = () => {
    const userObj = userId;
    window.localStorage.setItem("userId", JSON.stringify(userObj));
    window.localStorage.setItem("logged-in", JSON.stringify(true));
  };
  const onChange = (e) => {
    setUserId(e.target.value);
  };
  return (
    <AuthWrapper>
      <AuthContent title="로그인">
        <InputWithLabel
          label="아이디"
          onChange={onChange}
          name="email"
          placeholder="아이디"
        />
        <InputWithLabel
          label="비밀번호"
          name="password"
          placeholder="비밀번호"
        />
        <AuthButton onClick={setData}>로그인</AuthButton>
      </AuthContent>
      <RightAlignedLink to="/auth/register">회원가입</RightAlignedLink>
    </AuthWrapper>
  );
};
export default Login;
