import React from "react";
import styled from "styled-components";

const DetailWrapper = styled.div``;

//위에 위치에서 stationName뽑아오기
//dataTime, pm10Grade, pm25Grade
const Airdata = ({ pm10Grade, pm10Value }) => {
  let pm10GradeR;
  let pm10ValueR;
  pm10ValueR = pm10Value;

  switch (pm10Grade) {
    case "1":
      pm10GradeR = "좋음";
      break;
    case "2":
      pm10GradeR = "보통";
      break;
    case "3":
      pm10GradeR = "나쁨";
      break;
    case "4":
      pm10GradeR = "매우나쁨";
      break;
    default:
  }
  return (
    <div>
      <p>현재미세먼지농도</p>
      <h3>{pm10ValueR}</h3>
      <p>현재 미세먼지 상태는 {pm10GradeR}입니다</p>
    </div>
  );
};

export default Airdata;
