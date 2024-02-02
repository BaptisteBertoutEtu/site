"use strict";

/*
 * Copyright (c) Baptiste Bertout.
 * Mail : baptiste.bertout@gmail.com
 * Version : 1.0
 * Compilé à l'aide de NodeJs. Le résultat de la compilation se trouve dans le répertoire build.
 */

var examSelect = document.querySelector('.exam-select');
var patientSelect = document.querySelector('.patient-select');
var arriv = document.querySelector('.arriv');
var acquis = document.querySelector('.acquis');
var tempsInjec = document.querySelector('.tempsInjec');
var debitIode = document.querySelector('.debitIode');
var allVitesseInjec = document.querySelectorAll('.vitesseInjec');
var allVolume = document.querySelectorAll('.vol');
var reset = document.querySelector('.reset-button');
var popupExam = document.querySelector('.modal-exam');
var popupPatient = document.querySelector('.modal-patient');
var popupExamCloseButton = document.querySelector('#modal-close-exam');
var popupPatientCloseButton = document.querySelector('#modal-close-patient');
var tabConcentration = [300, 320, 350];
var valueTempsInjec = 0;
var valueDebit = 0;
var valueVitesseInjec = [];
var nan = 'NaN';
var mapPatient = new Map();
mapPatient.set('', 'NaN');
mapPatient.set('1', 1.4);
mapPatient.set('2', 1.2);
mapPatient.set('3', 1.8);
mapPatient.set('4', 2.0);
var mapExam = new Map();
mapExam.set('embolie', 10);
mapExam.set('coroscanner', 17);
mapExam.set('aorteAbdo', 30);
mapExam.set('aorteCrosse', 20);
mapExam.set('membreInf', 40);
mapExam.set('carotide', 20);
var actualSelectedExam = '';
var actualSelectedPatient = '';

/**
 * Evénement déclenché par un click sur le bouton reset permettant de remettre à zéro l'ensemble des affichages
 */
reset.addEventListener('click', setNaN);

/**
 * Evenement déclenché par un changement d'état pour l'élément 'select' pour la selection de l'examen
 * permettant de calculer les données voulus et de les afficher.
 */
examSelect.addEventListener('change', function (e) {
  var value = e.target.value;
  var bool = value != 'embolie' && value != '';
  patientSelect.value = bool ? '1' : '';
  patientSelect.disabled = bool;
  actualSelectedPatient = patientSelect.value;
  actualSelectedExam = value;
  arriv.value = mapExam.get(value);
  changeValueDebit();
});

/**
 * Evenement déclenché par un changement d'état pour l'élément 'select' pour la selection du patient
 * permettant de calculer les données voulus et de les afficher.
 */
patientSelect.addEventListener('change', changeValueDebit);

/**
 * Evenement déclenché par un changement d'état pour l'élément 'input' correspondant au temps d'acquisition
 * permettant de calculer les données voulus et de les affichées, si l'examen et le patient sont choisis.
 */
acquis.addEventListener('input', function (e) {
  if (!examNotNull() || !patientNotNull()) setNaN();else calculAll();
});

/**
 * Méthode {@code setNaN()} permettant de réinitialiser l'ensemble des affichages.
 */
function setNaN() {
  examSelect.value = '';
  patientSelect.value = '';
  patientSelect.disabled = false;
  arriv.value = '';
  acquis.value = '';
  tempsInjec.innerHTML = nan;
  debitIode.innerHTML = nan;
  setNaNForEach(allVolume);
  setNaNForEach(allVitesseInjec);
  valueTempsInjec = 0;
  valueDebit = 0;
  valueVitesseInjec = [];
}

/**
 * Méthode {@code setNaNForEach()} permettant de réinitialiser l'affichage de l'élément passé en paramètre.
 *
 * @param {*} params L'élément HTML à réinitialisé.
 */
function setNaNForEach(params) {
  params.forEach(function (elem) {
    elem.innerHTML = nan;
  });
}

/**
 * Méthode {@code notNull()} retournant un booléen selon si le paramètre est une chaine de caractère vide.
 * @param {*} temp Une chaine de caractère.
 * @returns Cette méthode retourne un booléen {@code true} ou {@code false} selon si le paramètre est une chaine de caractère vide.
 */
function notNull(temp) {
  return temp != '';
}

/**
 * Méthode {@code changeValueDebit()} permettant de changer la valeur de la section "Débit d'iode".
 */
function changeValueDebit() {
  var valuePatient = patientSelect.options[patientSelect.selectedIndex].value;
  actualSelectedPatient = valuePatient;
  valueDebit = mapPatient.get(valuePatient);
  debitIode.innerText = valueDebit;
  calculVitesse();
  if (notNull(acquis.value)) calculAll();
}

/**
 * Méthode {@code examNotNull()} retournant un booléen selon si la valeur du select examen est {@code null} ou non.
 * @returns Cette méthode retourne {@code true} si la valeur du select examen est {@code null}, {@code false} sinon.
 */
function examNotNull() {
  var bool = notNull(actualSelectedExam);
  if (!bool) {
    popupExam.style.display = 'block';
  }
  return bool;
}

/**
 * Méthode {@code patientNotNull()} retournant un booléen selon si la valeur du select patient est {@code null} ou non.
 * @returns Cette méthode retourne {@code true} si la valeur du select patient est {@code null}, {@code false} sinon.
 */
function patientNotNull() {
  var bool = notNull(actualSelectedPatient);
  if (!bool) {
    popupPatient.style.display = 'block';
  }
  return bool;
}

/**
 * Méthode {@code calculAll()} permettant de calculer le temps d'injection et les volumes.
 */
function calculAll() {
  calculTempsInjec();
  calculVolume();
}

/**
 * Méthode {@code calculVitesse()} permettant de calculer l'ensemble des vitesses d'injection.
 */
function calculVitesse() {
  valueVitesseInjec.length = 0;
  var calcul;
  var i = 0;
  tabConcentration.forEach(function (element) {
    calcul = Math.round(valueDebit / element * 1000 * 10) / 10;
    document.querySelector("#vitesseInjec".concat(element)).innerHTML = calcul;
    valueVitesseInjec[i++] = calcul;
  });
}

/**
 * Méthode {@code calculTempsInjec()} permettant de calculer le temps d'injection.
 */
function calculTempsInjec() {
  valueTempsInjec = parseInt(arriv.value) - parseInt(acquis.value) / 2;
  tempsInjec.innerText = valueTempsInjec;
}

/**
 * Méthode {@code calculVolume()} permettant de calculer l'ensemble des volumes.
 */
function calculVolume() {
  var calcul;
  var i = 0;
  valueVitesseInjec.forEach(function (element) {
    calcul = valueTempsInjec * element;
    document.querySelector("#vol".concat(tabConcentration[i++])).innerHTML = Math.round(calcul * 10) / 10;
  });
}

/**
 * Evénement déclenché par un click sur la croix de fermeture de la popup liée au select examen permettant de fermer cette popup.
 */
popupExamCloseButton.addEventListener('click', function (e) {
  popupExam.style.display = 'none';
});

/**
 * Evénement déclenché par un click sur la croix de fermeture de la popup liée au select patient permettant de fermer cette popup.
 */
popupPatientCloseButton.addEventListener('click', function (e) {
  popupPatient.style.display = 'none';
});
//# sourceMappingURL=program-injection-vasculaire.js.map