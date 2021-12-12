import React, { useState } from "react";
import styled from "styled-components";
import { useHistory, useLocation, useParams, Link } from "react-router-dom";
import { COLORS } from "../../components/Colors";
import moment from "moment";
import { useEffect } from "react";
import axios from "axios";
const TopWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 55px;
  .result-box {
    display: inline-block;
    text-align: center;
    border: 2px solid ${COLORS.yellow};
    border-radius: 5px;
    margin: 10px;
    padding: 20px;
    width: 500px;
    margin-top: 100px;
  }
  .inputform {
    width: 400px;
    height: 80px;
  }
  .inputbtn {
    height: 80px;
    margin-left: 10px;
    width: 80px;
  }
  .title {
    padding: 20px;
  }
`;

const index = ({ state }) => {
  const location = useLocation();
  const [word, setToken] = useState("");
  useEffect(() => {
    setToken(location.state.keyword);
  });
  const [diary, setDiary] = useState("");
  let userId = window.localStorage.getItem("userId");
  let ph = "";
  const CurrentDate = moment().format("YYYY년MM월DD일");
  const CurrentHour = moment().subtract(1, "hour").format("HH시");
  const handleChange = ({ target: { value } }) => setDiary(value);
  ph = "오늘 먹을 " + word + "!";
  const title = CurrentDate + " " + CurrentHour + "의 " + word;
  const onClickPost = async () => {
    const result = await axios({
      method: "POST",
      url: `http://localhost:5000/api/diary/post/${userId}`,
      data: {
        title: title,
        content: diary,
      },
    });
    if (result) {
      window.location.replace("/");
    } else {
      alert("Server Error");
    }
  };
  return (
    <TopWrapper>
      <div className="result-box">
        <div className="title">{title}</div>

        <input
          className="inputform"
          type="text"
          name="diary"
          value={diary}
          onChange={handleChange}
          placeholder={ph}
        />
        <button onClick={onClickPost} className="inputbtn">
          기록!
        </button>
      </div>
    </TopWrapper>
  );
};
export default index;
