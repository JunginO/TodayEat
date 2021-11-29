import React from "react";
import { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import axios from "axios";
import Weather from "./components/Weather";
const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  .weather-box {
    display: inline-block;
    text-align: center;
    border: 2px solid lightskyblue;
    border-radius: 5px;
    margin: 10px;
    padding: 20px;
  }
  .food-box {
    border: 2px solid lightskyblue;
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
  }
  .middle-box {
    border: 2px solid lightskyblue;
    margin: 10px;
    text-align: center;
  }
`;

const Main = () => {
  const [data, setData] = useState(null);
  const serviceKey = process.env.REACT_APP_WEATHER_API_KEY;
  const [numOfRows, setRows] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const CurrentDate = moment().format("YYYYMMDD");
  const CurrentHour = moment().subtract(1, "hour").format("HH30");
  const url = `/getUltraSrtNcst?serviceKey=${serviceKey}&dataType=json&numOfRows=${numOfRows}&pageNo=${pageNo}&base_date=${CurrentDate}&base_time=${CurrentHour}&nx=62&ny=125`;
  const onClick = async () => {
    try {
      const response = await axios("api" + url, {
        method: "GET",
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/xml; charset=utf-8",
        },
        withCredentials: true,
        credentials: "same-origin",
      });

      setData(response.data.response.body.items.item);
    } catch (e) {
      console.log(e);
    }
  };
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  return (
    <MainWrapper>
      <div>
        <div>
          <button onClick={onClick}>불러오기</button>
        </div>
        <div className="middle-box">서울특별시 송파구 날씨</div>
        <div className="weather-box">
          {data &&
            data.map((d) => (
              <Weather category={d.category} obsrValue={d.obsrValue} />
            ))}
        </div>

        <div className="middle-box">추천 메뉴</div>

        <div className="food-box">#떡볶이 #냉면 #아구찜</div>

        <div className="App">
          <button onClick={getLocation}>Get Location</button>
          <h3>현재 좌표</h3>
          <p>{status}</p>
          {lat && <p>Latitude: {lat}</p>}
          {lng && <p>Longitude: {lng}</p>}
        </div>
      </div>
    </MainWrapper>
  );
};
export default Main;
