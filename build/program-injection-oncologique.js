"use strict";

/*
 * Copyright (c) Baptiste Bertout.
 * Mail : baptiste.bertout@gmail.com
 * Version : 1.0
 * Compilé à l'aide de NodeJs. Le résultat de la compilation se trouve dans le répertoire build.
 */

var weight = document.querySelector('.weight');
var tension = document.querySelector('.tension-tube-select');
var doseInjec = document.querySelector('.doseInjec');
var allVolume = document.querySelectorAll('.vol');
var reset = document.querySelector('.reset-button');
var popup = document.querySelector('.modal');
var popupCloseButton = document.querySelector('#modal-close');
var nan = 'NaN';
var tabConcentration = [300, 320, 350, 370, 400];
var mapTension = new Map();
mapTension.set('80', 0.3);
mapTension.set('100', 0.4);
mapTension.set('120', 0.5);
var valueDoseInjec = 0;
var actualTensionValue = 0;

/**
 * Evénement déclenché par un click sur le bouton reset permettant de remettre à zéro l'ensemble des affichages
 */
reset.addEventListener('click', setNaN);

/**
 * Evenement déclenché par un changement d'état pour l'élément 'select'
 * permettant de calculer les données voulus et de les afficher.
 */
tension.addEventListener('change', function (e) {
  if (!weightNotNull()) {
    setNaN();
    return;
  }
  actualTensionValue = e.target.value;
  calculDoseInjec();
  calculVolume();
});

/**
 * Evenement déclenché par un changement d'état pour l'élément 'input' correspondant au poids du patient
 * permettant de calculer les données voulus et de les affichées, si la tension TUBE est également choisie.
 */
weight.addEventListener('input', function (e) {
  if (tensionNotNull()) {
    calculDoseInjec();
    calculVolume();
  }
});

/**
 * Méthode {@code calculDoseInjec()} permettant de calculer la dose d'injection souhaitée.
 */
function calculDoseInjec() {
  var calcul = parseInt(weight.value) * mapTension.get(actualTensionValue);
  valueDoseInjec = Math.round(calcul * 100) / 100;
  doseInjec.innerHTML = valueDoseInjec;
}

/**
 * Méthode {@code calculVolume()} permettant de calculer le volume pour chaque Concentration.
 */
function calculVolume() {
  var calcul;
  tabConcentration.forEach(function (element) {
    calcul = valueDoseInjec / element * 1000;
    document.querySelector("#vol".concat(element)).innerHTML = Math.round(calcul);
  });
}

/**
 * Méthode {@code tensionNotNull()} permettant de déterminer si la tension TUBE est
 * {@code null} ou non, donc si une tension TUBE a été saisie.
 */
function tensionNotNull() {
  return tension.selectedIndex != 0;
}

/**
 * Méthode {@code tensionNotNull()} permettant de déterminer si
 * le poids est {@code null} ou non, donc si un poids a été saisi.
 */
function weightNotNull() {
  var bool = weight.value != '';
  if (!bool && tensionNotNull()) {
    popup.style.display = 'block';
  }
  return bool;
}

/**
 * Méthode {@code setNaN()} permettant de réinitialiser l'ensemble des affichages.
 */
function setNaN() {
  weight.value = '';
  tension.value = '';
  doseInjec.innerHTML = nan;
  allVolume.forEach(function (elem) {
    elem.innerHTML = nan;
  });
}

/**
 * Evénement déclenché par un click sur la croix de fermeture de la popup permettant de fermer cette popup.
 */
popupCloseButton.addEventListener('click', function (e) {
  popup.style.display = 'none';
});
//# sourceMappingURL=program-injection-oncologique.js.map