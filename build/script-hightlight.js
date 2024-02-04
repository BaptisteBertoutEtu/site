"use strict";

var lastHightLight = 'home';
window.onscroll = function () {
  changeHightLightOnScroll();
};
function changeHightLightOnScroll() {
  var _int = window.scrollY + 2;
  map.forEach(function (values, keys) {
    if (_int >= values) {
      changeHightLight(keys);
    }
  });
}
function changeHightLight(id) {
  document.querySelector(".".concat(selecteur, " a[id=\"goTo").concat(lastHightLight, "\"]")).classList.remove('set-hightlight');
  document.querySelector(".".concat(selecteur, " a[id=\"goTo").concat(id, "\"]")).classList.add('set-hightlight');
  lastHightLight = id;
}
//# sourceMappingURL=script-hightlight.js.map