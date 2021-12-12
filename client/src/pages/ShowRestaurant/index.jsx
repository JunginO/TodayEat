/* global kakao */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import axios from "axios";
import { COLORS } from "../../components/Colors";
import SearchWithKeyword from "../Main/components/SearchWithKeyword";
import { useLocation, Link } from "react-router-dom";
import CuteButton from "./../../components/CuteButton";

const { kakao } = window;

const MainWrapper = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .button-choice {
    margin: 5px;
    height: 30px;
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
  const [searchPlace, setSearchPlace] = useState("");
  const [keyword, Setkeyword] = useState("");

  let selected = "";
  useEffect(() => {
    setSearchPlace(gudata + " " + keyword);
  }, [keyword]);

  const handleclick = (params, e) => {
    Setkeyword(params);
  };
  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");
  const [word3, setWord3] = useState("");
  const [word4, setWord4] = useState("");
  useEffect(() => {
    const fooddata = async () => {
      const result = await axios({
        method: "get",
        url: `http://localhost:5000/api/food/random/${WCode}`,
        data: {
          is_weather: WCode,
        },
      });
      if (result) {
        setWord1(result.data.data[0].food_name);
        setWord2(result.data.data[1].food_name);
        setWord3(result.data.data[2].food_name);
        setWord4(result.data.data[3].food_name);
      } else {
        alert("Server Error");
      }
    };
    fooddata();
  }, []);
  return (
    <MainWrapper>
      <div className="yellow-box">
        <h2>오늘의 추천 메뉴는?</h2>
        {word1 && (
          <button
            onClick={(e) => {
              handleclick(word1, e);
            }}
            className="button-choice"
          >
            {word1}
          </button>
        )}
        {word2 && (
          <button
            onClick={(e) => {
              handleclick(word2, e);
            }}
            className="button-choice"
          >
            {word2}
          </button>
        )}
        {word3 && (
          <button
            onClick={(e) => {
              handleclick(word3, e);
            }}
            className="button-choice"
          >
            {word3}
          </button>
        )}
        {word4 && (
          <button
            onClick={(e) => {
              handleclick(word4, e);
            }}
            className="button-choice"
          >
            {word4}
          </button>
        )}
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
      {keyword && (
        <Link to={"/diary"} state={{ keyword: keyword }}>
          <CuteButton title="결과기록"></CuteButton>
        </Link>
      )}
    </MainWrapper>
  );
};
export default Index;
