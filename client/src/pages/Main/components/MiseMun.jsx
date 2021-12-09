import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";
import sido_to_si from "./sido_to_si";
import Airdata from "./Airdata";
const StyleBox = styled.div`
  display: flex;
  justify-content: center;
`;
const MiseMun = ({ sidodata, setMisedust }) => {
  const [btn, setBtn] = useState(null);
  const serviceKey2 = process.env.REACT_APP_Mise_API_KEY;
  const sido = sido_to_si(sidodata);
  const url2 = `/getCtprvnRltmMesureDnsty?numOfRows=1&sidoName=${sido}&serviceKey=${serviceKey2}&ver=1.0&returnType=json`;
  const [mise, setMiseapi] = useState(null);

  const SetMise = async () => {
    try {
      const response2 = await axios("api/v2" + url2, {
        method: "GET",
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/xml; charset=utf-8",
        },
        withCredentials: true,
        credentials: "same-origin",
      });
      setMiseapi(response2.data.response.body.items);
      setMisedust(response2.data.response.body.items[0].pm10Grade);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    SetMise();
  }, [sidodata]);
  return (
    <StyleBox>
      <div className="weather-box">
        {mise &&
          mise.map((d) => (
            <Airdata pm10Grade={d.pm10Grade} pm10Value={d.pm10Value} />
          ))}
      </div>
    </StyleBox>
  );
};
export default MiseMun;
