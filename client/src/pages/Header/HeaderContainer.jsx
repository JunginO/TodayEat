import React from "react";
import Header from "./Header";
import LoginButton from "./LoginButton";
import { useLocation } from "react-router";
const HeaderContainer = () => {
  let location = useLocation();
  if (
    location.pathname === "/auth/login" ||
    location.pathname === "/auth/register"
  )
    return null;
  return (
    <Header>
      <LoginButton />
    </Header>
  );
};
export default HeaderContainer;
