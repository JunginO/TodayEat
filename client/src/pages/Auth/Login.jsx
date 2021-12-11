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
    console.log(userId, password);
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
        // id, pw 모두 일치 userId = userId1, msg = undefined
        console.log("======================", "로그인 성공");
        localStorage.setItem("userId", userId);
        localStorage.setItem("logged-in", "True");
        window.location.replace("/");
      } else {
        if (result.data.userId === null) {
          // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
          console.log(
            "======================",
            "입력하신 비밀번호 가 일치하지 않습니다."
          );
          if (result.data.userId === undefined) {
            // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
            console.log("======================", result.data.msg);
            alert("입력하신 id 가 일치하지 않습니다.");
          }
          alert("입력하신 비밀번호 가 일치하지 않습니다.");
        }
      }
    } catch {
      console.log("error");
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

        {errortxt && <p className="alert"> {errortxt}</p>}
        <AuthButton onClick={onClickLogin}>로그인</AuthButton>
      </AuthContent>
      <RightAlignedLink to="/auth/register">회원가입</RightAlignedLink>
    </AuthWrapper>
  );
};
export default Login;
