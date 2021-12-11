/* global kakao */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import axios from "axios";
import { COLORS } from "../../components/Colors";
import SearchWithKeyword from "../Main/components/SearchWithKeyword";
import { useLocation } from "react-router-dom";
import CuteButton from "./../../components/CuteButton";
import {
  dummyCode5,
  dummyCode4,
  dummyCode3,
  dummyCode2,
  dummyCode1,
  dummyCode0,
} from "../../components/dummyData";
const { kakao } = window;

const MainWrapper = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .results {
  }
  .yellow-box {
    text-align: center;
    border: 2px solid ${COLORS.yellow};
    border-radius: 5px;
    margin: 10px;
    padding: 20px;
    width: 500px;
  }
`;
const Index = ({}) => {
  const location = useLocation();
  const lng = location.state.lat;
  const lat = location.state.lat;
  const gudata = location.state.gudata;
  const WCode = location.state.WCode;
  const [searchPlace, setSearchPlace] = useState(null);
  const [keyword, Setkeyword] = useState(null);
  const [event1, setEvent1] = useState(null);
  const [event2, setEvent2] = useState(null);

  const tmp1 = dummyCode5[Math.floor(Math.random() * dummyCode5.length)];

  console.log(tmp1);
  useEffect(() => {
    setSearchPlace(gudata + keyword);
  }, [keyword]);

  const handleclick = (e) => {
    Setkeyword(tmp1);
  };
  const handleclick2 = (e) => {
    Setkeyword("마라탕");
  };
  const handleclick3 = (e) => {
    Setkeyword("짜장면");
  };

  return (
    <MainWrapper>
      <div className="yellow-box">
        <h2>오늘의 추천 메뉴는?</h2>
        {tmp1 && (
          <button onClick={handleclick} className="button-choice">
            {tmp1}
          </button>
        )}
        <button onClick={handleclick2} className="button-choice">
          마라탕
        </button>
        <button onClick={handleclick3} className="button-choice">
          짜장면
        </button>
      </div>
      <div className="yellow-box">
        {searchPlace && (
          <div>
            <SearchWithKeyword
              children={searchPlace}
              searchPlace={searchPlace}
              lat={lat}
              lng={lng}
            />
          </div>
        )}
      </div>
      <CuteButton title="결과 기록"></CuteButton>
    </MainWrapper>
  );
};
export default Index;
