export default function sido_to_si(data) {
  var ans = "서울";
  if (data == "서울특별시") {
    ans = "서울";
  } else if (data == "부산광역시") {
    ans = "서울";
  } else if (data == "경상남도") {
    ans = "경남";
  } else if (data == "경상북도") {
    ans = "경북";
  } else if (data == "대구광역시") {
    ans = "대구";
  } else if (data == "인천광역시") {
    ans = "인천";
  } else if (data == "광주광역시") {
    ans = "광주";
  } else if (data == "대전광역시") {
    ans = "대전";
  } else if (data == "울산광역시") {
    ans = "울산";
  } else if (data == "경기도") {
    ans = "경기";
  } else if (data == "강원도") {
    ans = "강원";
  } else if (data == "충청북도") {
    ans = "충북";
  } else if (data == "충청남도") {
    ans = "충남";
  } else if (data == "전라북도") {
    ans = "전북";
  } else if (data == "전라남도") {
    ans = "전남";
  } else if (data == "제주특별자치도") {
    ans = "제주";
  } else if (data == "세종특별자치시") {
    ans = "세종";
  }

  return ans;
}
