"use strict";

var divHome = document.querySelector('div[id="home"]');
var divPresentation = document.querySelector('div[id="presentation"]');
var divImage = document.querySelector('div[id="image"]');
var selecteur = 'menu-projet';
var map = new Map();
map.set(divHome.getAttribute('id'), divHome.offsetTop);
map.set(divPresentation.getAttribute('id'), divPresentation.offsetTop);
if (divImage != null) {
  map.set(divImage.getAttribute('id'), divImage.offsetTop);
}
//# sourceMappingURL=script-hightlight-projet.js.map