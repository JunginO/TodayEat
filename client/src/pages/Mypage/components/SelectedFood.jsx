import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { COLORS } from "../../../components/Colors";
import { useLocation, Link } from "react-router-dom";
import SelectedFoodbox from "./SelectedFoodbox";
const MainWrapper = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .yellow-box {
    text-align: center;
    border: 2px solid ${COLORS.yellow};
    border-radius: 5px;
    margin: 10px;
    padding: 20px;
    width: 500px;
  }
`;
const SelectedFood = () => {
  const [cate, setCate] = useState(null);
  const [data, setData] = useState(null);
  const [keyword, Setkeyword] = useState("");
  const [food, setFood] = useState("");
  const handleChange = (e) => {
    setFood(JSON.parse(e.target.value));
  };
  const onClickPost = async () => {
    const result2 = await axios({
      method: "POST",
      url: `http://localhost:5000/api/diary/food/add/${food}`,
      data: {
        category: cate,
      },
    });
    if (result2) {
      console.log(result2);
    } else {
      alert("Server Error");
    }
  };
  const handleclick = (params, e) => {
    Setkeyword(params);
  };
  useEffect(() => {
    setCate(keyword);
  }, [keyword]);
  useEffect(() => {
    const getfood = async () => {
      const result = await axios({
        method: "get",
        url: `http://localhost:5000/api/food/select/${cate}`,
        data: {
          category: cate,
        },
      });
      if (result) {
        setData(result.data.data);
        console.log(result.data);
      } else {
        alert("Server Error");
      }
    };
    getfood();
  }, [cate]);
  return (
    <MainWrapper>
      <div>
        <div className="yellow-box">
          <button
            onClick={(e) => {
              handleclick("korean", e);
            }}
          >
            한식
          </button>
          <button
            onClick={(e) => {
              handleclick("snack_bar", e);
            }}
          >
            분식
          </button>
          <button
            onClick={(e) => {
              handleclick("aisan", e);
            }}
          >
            아시아음식
          </button>
          <button
            onClick={(e) => {
              handleclick("fastfood", e);
            }}
          >
            패스트푸드
          </button>
          <button
            onClick={(e) => {
              handleclick("western", e);
            }}
          >
            양식
          </button>
          <button
            onClick={(e) => {
              handleclick("steamed", e);
            }}
          >
            찜류
          </button>
          <button
            onClick={(e) => {
              handleclick("dessert", e);
            }}
          >
            디저트류
          </button>
        </div>
        <div>
          <input
            className="inputform"
            type="text"
            value={food}
            onChange={handleChange}
            placeholder={"데이터 등록!"}
          />
          <button onClick={onClickPost} className="inputbtn">
            등록
          </button>
        </div>
        {data &&
          data.map((data) => (
            <div>
              <SelectedFoodbox data={data} />
            </div>
          ))}
      </div>
    </MainWrapper>
  );
};
export default SelectedFood;
