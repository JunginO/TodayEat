/* global kakao */
import React, { useEffect, useState } from "react";
const { kakao } = window;
import styled from "styled-components";
import moment from "moment";
import axios from "axios";
import Weather from "./components/Weather";
import KakaoMap from "./components/KakaoMap";
//import { NaverMap, RenderAfterNavermapsLoaded } from "react-naver-maps";
//import Coordinate from "./components/Coordinate";
//import CurrentMap from "./components/CurrentMap";
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
    width: 500px;
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

function dfs_xy_conv(code, v1, v2) {
  var RE = 6371.00877; // 지구 반경(km)
  var GRID = 5.0; // 격자 간격(km)
  var SLAT1 = 30.0; // 투영 위도1(degree)
  var SLAT2 = 60.0; // 투영 위도2(degree)
  var OLON = 126.0; // 기준점 경도(degree)
  var OLAT = 38.0; // 기준점 위도(degree)
  var XO = 43; // 기준점 X좌표(GRID)
  var YO = 136; // 기1준점 Y좌표(GRID)
  var DEGRAD = Math.PI / 180.0;
  var RADDEG = 180.0 / Math.PI;

  var re = RE / GRID;
  var slat1 = SLAT1 * DEGRAD;
  var slat2 = SLAT2 * DEGRAD;
  var olon = OLON * DEGRAD;
  var olat = OLAT * DEGRAD;

  var sn =
    Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
    Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  var sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
  var ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);
  var rs = {};
  if (code == "toXY") {
    rs["lat"] = v1;
    rs["lng"] = v2;
    var ra = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5);
    ra = (re * sf) / Math.pow(ra, sn);
    var theta = v2 * DEGRAD - olon;
    if (theta > Math.PI) theta -= 2.0 * Math.PI;
    if (theta < -Math.PI) theta += 2.0 * Math.PI;
    theta *= sn;
    rs["x"] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
    rs["y"] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
  } else {
    rs["x"] = v1;
    rs["y"] = v2;
    var xn = v1 - XO;
    var yn = ro - v2 + YO;
    ra = Math.sqrt(xn * xn + yn * yn);
    if (sn < 0.0) -ra;
    var alat = Math.pow((re * sf) / ra, 1.0 / sn);
    alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

    if (Math.abs(xn) <= 0.0) {
      theta = 0.0;
    } else {
      if (Math.abs(yn) <= 0.0) {
        theta = Math.PI * 0.5;
        if (xn < 0.0) -theta;
      } else theta = Math.atan2(xn, yn);
    }
    var alon = theta / sn + olon;
    rs["lat"] = alat * RADDEG;
    rs["lng"] = alon * RADDEG;
  }
  return rs;
}

const Main = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [xdata, setxData] = useState(null);
  const [ydata, setyData] = useState(null);

  const [DetailAddr, setDetailAddr] = useState(null);
  function displayCenterInfo(result, status) {
    if (status === daum.maps.services.Status.OK) {
      setDetailAddr(result[1].address_name);
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
    console.log("why????????", lat, lng);
    console.log("얘는 왜 또 안돼", xdata, ydata);
  }, [lng]);

  useEffect(() => {
    kakao.maps.load(() => {
      console.log(lat, lng, "please");
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
  const [currentLoca, setCurrentLoca] = useState(null);
  const SetWeather = async () => {
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
  useEffect(() => {
    SetWeather();
  }, [ydata]);

  return (
    <MainWrapper>
      <div>
        <div>
          <div>
            <div className="middle-box">현재위치</div>
            <div className="middle-box">
              {DetailAddr && <span>{DetailAddr}</span>}
            </div>
            <div id="map" style={{ width: "600px", height: "300px" }}></div>
          </div>
        </div>

        <div className="weather-box">
          {data &&
            data.map((d) => (
              <Weather category={d.category} obsrValue={d.obsrValue} />
            ))}
        </div>
        <div className="middle-box">추천 메뉴</div>

        <div className="food-box">#떡볶이 #냉면 #아구찜</div>
      </div>
    </MainWrapper>
  );
};
export default Main;
