import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import axios from "axios";
import Login from "./pages/Auth/Login";
import { Register } from "./pages/Auth";
import HeaderContainer from "./pages/Header/HeaderContainer";
import ShowRestaurant from "./pages/ShowRestaurant";
import Mypage from "./pages/Mypage";
import DeleteId from "./pages/Mypage/components/DeleteId";
import Diary from "./pages/Diary";
import SelectedFood from "./pages/Mypage/components/SelectedFood";
const App = () => {
  return (
    <BrowserRouter>
      <HeaderContainer />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/auth/login" element={<Login />} />
        <Route exact path="/auth/register" element={<Register />} />
        <Route exact path="/show/:WCode" element={<ShowRestaurant />} />
        <Route exact path="/mypage" element={<Mypage />} />
        <Route exact path="/mypage/setting" element={<DeleteId />} />
        <Route exact path="/diary" element={<Diary />} />
        <Route exact path="/food" element={<SelectedFood />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
