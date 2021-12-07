/* global kakao */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import axios from "axios";
import Weather from "./components/Weather";
import { COLORS } from "../../components/Colors";
import dfs_xy_conv from "./components/dfs_xy_conv";
import CuteButton from "../../components/CuteButton";
import SearchWithKeyword from "./components/SearchWithKeyword";
import MiseMun from "./components/MiseMun";
const { kakao } = window;
//import { NaverMap, RenderAfterNavermapsLoaded } from "react-naver-maps";
//import Coordinate from "./components/Coordinate";
//import CurrentMap from "./components/CurrentMap";
const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 55px;
  .weather-box {
    display: inline-block;
    text-align: center;
    border: 2px solid ${COLORS.yellow};
    border-radius: 5px;
    margin: 10px;
    padding: 20px;
    width: 500px;
  }
  .food-box {
    //border: 2px solid ${COLORS.yellow};
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
    display: flex;
    justify-content: center;
  }
  .middle-box {
    border: 2px solid ${COLORS.yellow};
    margin: 10px;
    text-align: center;
  }
`;

const Main = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [xdata, setxData] = useState(null);
  const [ydata, setyData] = useState(null);
  const [sidodata, setSidodata] = useState(null);
  const [DetailAddr, setDetailAddr] = useState(null);
  function displayCenterInfo(result, status) {
    if (status === daum.maps.services.Status.OK) {
      setDetailAddr(result[1].address_name);
      setSidodata(result[1].region_1depth_name);
      console.log(DetailAddr);
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("사용자 위치 접근이 불가합니다");
        }
      );
    }
    console.log(lat, lng);
  }, []); //처음시작시
  useEffect(() => {
    const rs = dfs_xy_conv("toXY", lat, lng);
    setxData(rs.x);
    setyData(rs.y);
    console.log("변환후", xdata, ydata);
  }, [lng]);

  useEffect(() => {
    kakao.maps.load(() => {
      console.log(lat, lng);
      const container = document.getElementById("map"),
        options = {
          center: new kakao.maps.LatLng(lat, lng), // 위도, 경도 입력
          level: 4,
          scrollwheel: false,
          draggable: false,
        };
      const map = new kakao.maps.Map(container, options); // 지도그리기
      const circle = new kakao.maps.Circle({
        center: new kakao.maps.LatLng(lat, lng), // 위도, 경도 입력
        radius: 50,
        strokeWeight: 5,
        strokeColor: "#ffa409",
        strokeOpacity: 1,
        strokeStyle: "dashed",
        fillColor: "#ffa409",
        fillOpacity: 0.5,
      });

      circle.setMap(map); // 지도에 원 표시하기

      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.coord2RegionCode(lng, lat, displayCenterInfo);

      //여기
    });
  }, [lng]);

  const [data, setData] = useState(null);
  const serviceKey = process.env.REACT_APP_WEATHER_API_KEY;
  const [numOfRows, setRows] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const CurrentDate = moment().format("YYYYMMDD");
  const CurrentHour = moment().subtract(1, "hour").format("HH30");
  const url = `/getUltraSrtNcst?serviceKey=${serviceKey}&dataType=json&numOfRows=${numOfRows}&pageNo=${pageNo}&base_date=${CurrentDate}&base_time=${CurrentHour}&nx=${xdata}&ny=${ydata}`;
  const SetWeather = async () => {
    try {
      const response = await axios("api/v1" + url, {
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
  //미세먼지 여기부터

  //여기까지
  useEffect(() => {
    SetWeather();
  }, [ydata]);

  const [searchPlace, setSearchPlace] = useState("공릉동 떡볶이");

  return (
    <MainWrapper>
      <div>
        <div>
          <div>
            <div className="middle-box">현재위치</div>
            <div className="middle-box">
              {DetailAddr && <span>{DetailAddr}</span>}
              <div id="map" style={{ width: "550px", height: "300px" }}></div>
            </div>
          </div>
        </div>
        <div className="weather-box">
          {data &&
            data.map((d) => (
              <Weather category={d.category} obsrValue={d.obsrValue} />
            ))}
        </div>

        <div>
          <MiseMun sidodata={sidodata} />
        </div>
        <div className="middle-box">추천 메뉴</div>
        <div className="food-box">
          <CuteButton title="떡볶이"></CuteButton>
          <CuteButton title="마라탕"></CuteButton>
          <CuteButton title="피자"></CuteButton>
        </div>
        <div>
          {lng && (
            <div>
              <SearchWithKeyword
                searchPlace={searchPlace}
                lat={lat}
                lng={lng}
              />
            </div>
          )}
        </div>
      </div>
    </MainWrapper>
  );
};
export default Main;
