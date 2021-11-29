import React from "react";
import styled from "styled-components";
import code00 from "../../../assets/icons/code00.png";
import code01 from "../../../assets/icons/code01.png";
import code03 from "../../../assets/icons/code03.png";
import code05 from "../../../assets/icons/code05.png";
import code06 from "../../../assets/icons/code06.png";
import code07 from "../../../assets/icons/code07.png";
const DetailWrapper = styled.div`
  .category {
    font-weight: bold;
  }
  .weather-img {
    width: 30%;
  }
  span {
    font-size: 20px;
  }
`;
const Weather = ({ category, obsrValue }) => {
  let cate;
  let rainism;
  let imglink;
  let flag;
  if (category === "PTY") {
    flag = true;
    cate = "강수";
    switch (obsrValue) {
      case "0":
        rainism = "없음";
        imglink = code00;
        break;
      case "1":
        rainism = "비";
        break;
      case "2":
        rainism = "비/눈";
        break;
      case "3":
        rainism = "눈";
        break;
      case "5":
        rainism = "빗방울";
        break;
      case "6":
        rainism = "빗방울눈날림";
        break;
      case "7":
        rainism = "눈날림";
        break;
      default:
        rainism = "디폴트";
    }
  }
  if (category === "T1H") {
    flag = true;
    cate = "기온";
    rainism = obsrValue + "도";
  }
  if (flag === true) {
    return (
      <DetailWrapper>
        <div>
          <div>
            <img className="weather-img" src={imglink} />
          </div>
          <span className="category">{cate}</span> <span>{rainism}</span>
        </div>
      </DetailWrapper>
    );
  } else {
    return "";
  }
};
export default Weather;
