const express = require("express");
const router = express.Router();
const app = express();
const request = require("request");
const cheerio = require("cheerio");

const key =
  "x3o7i8kywzNdPm3WwuKsyhNEhs%2BkygeG7lkBtRfkAZ9K9epJvCVrdxtpG%2Bc91ACXqegpvdQVNKhxbej5Uq4ymQ%3D%3D";
const addr =
  "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=";
const add2 = "&dataType=json&numOfRows=10&pageNo=1";
const add3 = "&base_date=20211116&base_time=0500&nx=55&ny=127";
var myaddr = addr + key + add2 + add3;

router.get("/", function (req, res, next) {
  request(myaddr, function (error, response, body) {
    if (error) {
      console.log(error);
    }
    var obj = JSON.parse(body);

    console.log(obj); // 콘솔창에 찍어보기
  });
});

module.exports = router;
