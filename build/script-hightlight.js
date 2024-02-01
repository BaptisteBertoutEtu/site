"use strict";

var _int;
var h = document.getElementById("home").offsetTop;
var f = document.getElementById("formations").offsetTop;
var compet = document.getElementById("competences").offsetTop;
var e = document.getElementById("experiences").offsetTop;
var r = document.getElementById("realisations").offsetTop;
var conta = document.getElementById("contact").offsetTop;
var lastHightLight = "h";
window.onscroll = function () {
  changeHightLightOnScroll();
};
function changeHightLightOnScroll() {
  _int = window.scrollY;
  if (_int < f) {
    changeHightLight("h");
  } else if (_int >= f && _int < compet) {
    changeHightLight("f");
  } else if (_int >= compet && _int < e) {
    changeHightLight("compet");
  } else if (_int >= e && _int < r) {
    changeHightLight("e");
  } else if (_int >= r && _int < conta) {
    changeHightLight("r");
  } else {
    changeHightLight("conta");
  }
}
function changeHightLight(elem) {
  document.getElementById(lastHightLight).classList.remove("set-hightlight");
  document.getElementById(elem).classList.add("set-hightlight");
  lastHightLight = elem;
}
//# sourceMappingURL=script-hightlight.js.map