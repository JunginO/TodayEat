import React, { useEffect, useState } from "react";
import { Route, Link } from "react-router-dom";
const { kakao } = window;
import styled from "styled-components";
import { COLORS } from "../../../components/Colors";
const List = styled.div`
  .num {
    font-size: 25px;
    font-weight: 600;
    margin: 8px;
    align-self: center;
  }
  .large-box {
  }
  .medium-box {
    justify-content: flex-start;
    display: flex;
    border: 2px solid ${COLORS.yellow};
    padding: 5px;
    border-radius: 5px;
  }

  .small-box {
    text-align: left;
  }
  .hide {
    display: none;
  }
`;
const MapContainer = ({ searchPlace, lat, lng }) => {
  const [Places, setPlaces] = useState([]);

  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    var markers = [];
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 5,
      size: 10,
      page: 1,
      location: new kakao.maps.LatLng(lat, lng),
      radius: 1000,
      sort: kakao.maps.services.SortBy.distance,
      draggable: false,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
        // 페이지 목록 보여주는 displayPagination() 추가
        displayPagination(pagination);
        setPlaces(data);
      }
    }

    // 검색결과 목록 하단에 페이지 번호 표시
    function displayPagination(pagination) {
      var paginationEl = document.getElementById("pagination"),
        fragment = document.createDocumentFragment(),
        i;

      // 기존에 추가된 페이지 번호 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement("a");
        el.href = "#";
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = "on";
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  }, [searchPlace]);

  return (
    <List>
      <div
        id="myMap"
        style={{
          width: "500px",
          height: "400px",
        }}
      ></div>
      <div id="large-box">
        {searchPlace &&
          Places.map((item, i) => (
            <div className="medium-box" key={i} style={{ marginTop: "20px" }}>
              <span className="num">{i + 1}</span>
              <div className="small-box">
                <div>
                  <a href={"https://map.kakao.com/link/map/" + item.id}>
                    {item.place_name}
                  </a>
                </div>
                {item.road_address_name ? (
                  <div>
                    <span>{item.road_address_name}</span>
                    <span>{item.address_name}</span>
                  </div>
                ) : (
                  <span>{item.address_name}</span>
                )}
                <span>{item.phone}</span>
              </div>
            </div>
          ))}
        <div id="pagination" className="hide"></div>
      </div>
    </List>
  );
};

export default MapContainer;
