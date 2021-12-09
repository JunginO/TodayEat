export default function WeatherCode(temp, misedust, rain) {
  var ans = "4"; //디폴트값
  var dust = parseInt(misedust);
  if (dust > 2) {
    ans = 0;
  } else {
    if (parseInt(rain) != 0) {
      if (parseInt(temp) > 25) {
        ans = 2;
      } else if (parseInt(temp) < 0) {
        ans = 3;
      }
    } else {
      ans = 1;
    }
  }

  return ans;
}
