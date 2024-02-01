"use strict";

var _int;
var h = document.getElementById("home").offsetTop;
var p = document.getElementById("presentation").offsetTop;
var i;
try {
  i = document.getElementById("image").offsetTop;
} catch (error) {
  i = null;
}
var lastHightLight = "h";
window.onscroll = function () {
  changeHightLightOnScroll();
};
function changeHightLightOnScroll() {
  _int = window.scrollY;
  if (_int < p) {
    changeHightLight("h");
  } else if (_int >= p && i != null && _int < i) {
    changeHightLight("p");
  } else if (_int >= p && i == null) {
    changeHightLight("p");
  } else {
    changeHightLight("i");
  }
}
function changeHightLight(elem) {
  try {
    document.getElementById(lastHightLight).classList.remove("set-hightlight");
    document.getElementById(elem).classList.add("set-hightlight");
    lastHightLight = elem;
  } catch (error) {}
}
//# sourceMappingURL=script-hightlight-projet.js.map