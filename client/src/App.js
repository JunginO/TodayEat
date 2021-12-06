import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import axios from "axios";
import Login from "./pages/Auth/Login";
import { Register } from "./pages/Auth";
import HeaderContainer from "./pages/Header/HeaderContainer";
const App = () => {
  return (
    <BrowserRouter>
      <HeaderContainer />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/auth/login" element={<Login />} />
        <Route exact path="/auth/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
