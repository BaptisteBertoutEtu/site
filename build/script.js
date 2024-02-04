"use strict";

var burger = document.querySelector('.hamburger');
var to_moove = document.querySelectorAll('.to-moove');
var to_moove_left = document.querySelectorAll('.to-moove-left');
var menu = document.querySelector('.menu');
var viewBar = document.querySelector('#view-bar');
window.addEventListener('scroll', function () {
  setViewBar();
  setMenu();
});
function setViewBar() {
  var hauteur = document.documentElement.scrollHeight - window.innerHeight;
  var hauteurEcran = document.documentElement.clientHeight;
  var position = window.scrollY;
  var barre = position / hauteur * hauteurEcran;
  viewBar.style.height = "".concat(barre, "px");
}
burger.addEventListener('click', function () {
  burger.classList.toggle('menu-active');
  burger.classList.toggle('manual-active');
  burger.classList.remove('auto-active');
  to_moove.forEach(function (e) {
    e.classList.toggle('all-menu-active');
  });
  to_moove_left.forEach(function (e) {
    e.classList.toggle('all-menu-active-left');
  });
  menu.classList.toggle('background-to-none');
});
function setMenu() {
  var x = document.documentElement.scrollTop;
  var scrollUp = document.querySelector('.go-up');
  if (!isActiveManual()) {
    if (x > 550) {
      burger.classList.add('menu-active');
      burger.classList.add('auto-active');
      burger.classList.remove('auto-desactive');
      scrollUp.classList.add('set-active');
      scrollUp.classList.remove('set-inactive');
      to_moove.forEach(function (e) {
        e.classList.add('all-menu-active');
      });
      to_moove_left.forEach(function (e) {
        e.classList.add('all-menu-active-left');
      });
      menu.classList.add('background-to-none');
    } else {
      burger.classList.remove('menu-active');
      burger.classList.remove('manual-active');
      burger.classList.remove('auto-active');
      burger.classList.add('auto-desactive');
      scrollUp.classList.remove('set-active');
      scrollUp.classList.add('set-inactive');
      to_moove.forEach(function (e) {
        e.classList.remove('all-menu-active');
      });
      to_moove_left.forEach(function (e) {
        e.classList.remove('all-menu-active-left');
      });
      menu.classList.remove('background-to-none');
    }
  } else if (x > 550) {
    burger.classList.remove('manual-active');
  }
}
function isActiveManual() {
  return burger.classList.contains('manual-active');
}
function copy_mail() {
  var text = document.getElementById('mail').innerHTML;
  var doc = document.getElementById('ok-mail');
  copy(text, doc);
}
function copy_tel() {
  var text = document.getElementById('tel').innerHTML;
  var doc = document.getElementById('ok-tel');
  copy(text, doc);
}
function copy(text, doc) {
  navigator.clipboard.writeText(text);
  doc.style.opacity = 1;
  doc.style.transition = 'all 1s';
  setTimeout(function (e) {
    doc.style.opacity = 0;
  }, 2000);
}
//# sourceMappingURL=script.js.map