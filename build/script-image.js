"use strict";

var cpt = 1;
var lastCpt = cpt;
var min = 1;
var max = parseInt(document.querySelector('meta[name="nombre-fichier"]').getAttribute('content'));
var path = document.querySelector('meta[name="path"]').getAttribute('content');
var image = document.querySelector('.image-present');
var buttonSuiv = document.querySelector('.button-suiv');
var buttonPrec = document.querySelector('.button-prec');
var allOneCircle = document.querySelectorAll('.one-circle');
buttonPrec.addEventListener('click', function (e) {
  cpt = cpt - 1 >= min ? cpt - 1 : max;
  changeToImage("".concat(path).concat(cpt, ".png"), cpt);
});
buttonSuiv.addEventListener('click', function (e) {
  cpt = cpt + 1 <= max ? cpt + 1 : 1;
  changeToImage("".concat(path).concat(cpt, ".png"), cpt);
});
allOneCircle.forEach(function (elem) {
  elem.addEventListener('click', function (e) {
    var id = e.target.getAttribute('id').replace('image', '');
    changeToImage("".concat(path).concat(id, ".png"), parseInt(id));
  });
});
function changeToImage(pathForImage, currentCpt) {
  document.querySelector("#image".concat(lastCpt)).classList.remove('selected-circle');
  lastCpt = currentCpt;
  cpt = currentCpt;
  image.src = pathForImage;
  document.querySelector("#image".concat(currentCpt)).classList.add('selected-circle');
}
//# sourceMappingURL=script-image.js.map