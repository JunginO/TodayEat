import React from "react";
import { AuthButton } from ".";
import { AuthWrapper } from ".";
import { AuthContent } from ".";
import { InputWithLabel } from ".";
import { RightAlignedLink } from ".";
import { useState } from "react";

import axios from "axios";
const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errortxt, setErrorText] = useState("");
  const onClickLogin = async () => {
    try {
      const result = await axios({
        method: "POST",
        url: "http://localhost:5000/api/user/login",
        data: {
          user_id: userId,
          password: password,
        },
      });

      if (result.data.success) {
        window.localStorage.setItem("userId", JSON.stringify(userObj));
        window.localStorage.setItem("logged-in", JSON.stringify(true));
        window.location.replace("/");
      } else {
        setErrorText(result.data.message);
      }
    } catch {
      alert(errortxt);
    }
  };

  const [isFocus, setIsFocus] = useState(false);

  const handleFocus = () => {
    if (isFocus) {
      setIsFocus(false);
    } else {
      setIsFocus(true);
    }
  };
  const onChangeId = (e) => {
    setUserId(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <AuthWrapper>
      <AuthContent title="로그인">
        <InputWithLabel
          label="아이디"
          onChange={onChangeId}
          handleFocus={handleFocus}
          type="text"
          placeholder="아이디"
          value={userId}
        />
        <InputWithLabel
          label="비밀번호"
          placeholder="비밀번호"
          type="password"
          onChange={onChangePassword}
          handleFocus={handleFocus}
          value={password}
        />
        <AuthButton onClick={onClickLogin}>로그인</AuthButton>
      </AuthContent>
      <RightAlignedLink to="/auth/register">회원가입</RightAlignedLink>
    </AuthWrapper>
  );
};
export default Login;
