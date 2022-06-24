// 计算距离 lat,lng（自己的位置坐标）,aimLat,amiLng（目标位置的坐标）
export function getDistance(lat,lng,aimLat,amiLng){
  var radLat1 = this.getRad(lat);
  var radLat2 = this.getRad(aimLat)
  var a = radLat1 - radLat2;
  var b = this.getRad(lng) - this.getRad(amiLng);

  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  console.log(s);
  s = s * 6378.137;
  s = Math.round(s * 10000) / 10000;
  s = s.toFixed(1); 
  return s;
}