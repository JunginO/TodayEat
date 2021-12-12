import React from "react";
import styled from "styled-components";
import ContentBox from "./ContentBox";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
const MainWrapper = styled.div`
  margin: 0px 100px;
  background-color: white;

  .underline {
    border-bottom: 3px solid gray;
    padding-bottom: 5px;
    width: 400px;
    font-weight: 600;
  }
`;

const Diarybox = () => {
  let userId = window.localStorage.getItem("userId");
  const [data, setData] = useState(null);
  useEffect(() => {
    const diarydata = async () => {
      const result = await axios({
        method: "get",
        url: `http://localhost:5000/api/diary/${userId}`,
        data: {
          userId: userId,
        },
      });
      if (result) {
        setData(result.data.data);
      } else {
        alert("Server Error");
      }
    };
    diarydata();
  }, []);
  return (
    <MainWrapper>
      <div className="wrap-box">
        <p className="underline">기록들</p>
        {data &&
          data.map((data) => (
            <div>
              <ContentBox data={data} />
            </div>
          ))}
      </div>
    </MainWrapper>
  );
};
export default Diarybox;
