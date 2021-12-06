import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { AuthButton } from ".";
import { AuthWrapper } from ".";
import { AuthContent } from ".";
import { InputWithLabel } from ".";
const RegisterWrapper = styled.div`
  .alert {
    font-size: 12px;
    color: red;
    margin: 0;
  }
`;
const Register = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");

  const [pwError, setpwError] = useState(0);
  const [pwReError, setpwReError] = useState(0);
  const [errorMail, setErrorMail] = useState(0);

  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangePassWord = (e) => {
    const { value } = e.target;

    const patternSpecial = /[~!@#$%^&*()_+|<>?:{}]/;
    const patternEng = /[a-zA-Z]/;
    const patternNum = /[0-9]/;

    if (
      !patternSpecial.test(value) ||
      !patternEng.test(value) ||
      !patternNum.test(value)
    ) {
      setpwError(1);
    } else {
      setpwError(0);
    }
    setPassword(value);
  };
  const onChangeRePassWord = (e) => {
    const { value } = e.target;
    if (value !== password) {
      setpwReError(1);
    } else {
      setpwReError(0);
    }
    setRePassword(value);
  };
  const onChangeEmail = (e) => {
    const { value } = e.target;
    const patternEmail =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

    if (!patternEmail.test(value)) {
      setErrorMail(1);
    } else {
      setErrorMail(0);
    }
    setEmail(value);
  };

  return (
    <RegisterWrapper>
      <AuthWrapper>
        <AuthContent title="회원가입">
          <InputWithLabel
            label="아이디"
            name="username"
            placeholder="아이디"
            type="text"
            value={id}
            onChange={onChangeId}
          />
          <InputWithLabel
            label="비밀번호"
            name="password"
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={onChangePassWord}
          />
          {pwError === 1 && <p className="alert"> 비밀번호 조건 확인</p>}
          <InputWithLabel
            label="비밀번호 확인"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
            value={rePassword}
            onChange={onChangeRePassWord}
          />
          {pwReError === 1 && <p className="alert"> 비밀번호 불일치</p>}
          <InputWithLabel
            label="이름"
            name="name"
            placeholder="이름"
            type="name"
          />
          <InputWithLabel
            label="닉네임"
            name="nickname"
            placeholder="닉네임"
            type="nickname"
          />
          <InputWithLabel
            label="이메일"
            name="email"
            placeholder="이메일"
            type="email"
            value={email}
            onChange={onChangeEmail}
          />{" "}
          {errorMail === 1 && (
            <p className="alert">메일 형식이 맞지 않습니다</p>
          )}
          <AuthButton>회원가입</AuthButton>
        </AuthContent>
      </AuthWrapper>
    </RegisterWrapper>
  );
};
export default Register;
