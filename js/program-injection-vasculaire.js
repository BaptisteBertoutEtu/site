/*
 * Copyright (c) Baptiste Bertout.
 * Mail : baptiste.bertout@gmail.com
 * Version : 1.0
 * Compilé à l'aide de NodeJs. Le résultat de la compilation se trouve dans le répertoire build.
 */

const examSelect = document.querySelector('.exam-select');
const patientSelect = document.querySelector('.patient-select');
const arriv = document.querySelector('.arriv');
const acquis = document.querySelector('.acquis');

const tempsInjec = document.querySelector('.tempsInjec');
const debitIode = document.querySelector('.debitIode');
const allVitesseInjec = document.querySelectorAll('.vitesseInjec');
const allVolume = document.querySelectorAll('.vol');

const reset = document.querySelector('.reset-button');
const popupExam = document.querySelector('.modal-exam');
const popupPatient = document.querySelector('.modal-patient');
const popupExamCloseButton = document.querySelector('#modal-close-exam');
const popupPatientCloseButton = document.querySelector('#modal-close-patient');

const tabConcentration = [300, 320, 350];
let valueTempsInjec = 0;
let valueDebit = 0;
let valueVitesseInjec = [];

const nan = 'NaN';

const mapPatient = new Map();
mapPatient.set('', 'NaN');
mapPatient.set('1', 1.4);
mapPatient.set('2', 1.2);
mapPatient.set('3', 1.8);
mapPatient.set('4', 2.0);

const mapExam = new Map();
mapExam.set('embolie', 10);
mapExam.set('coroscanner', 17);
mapExam.set('aorteAbdo', 30);
mapExam.set('aorteCrosse', 20);
mapExam.set('membreInf', 40);
mapExam.set('carotide', 20);

let actualSelectedExam = '';
let actualSelectedPatient = '';

/**
 * Evénement déclenché par un click sur le bouton reset permettant de remettre à zéro l'ensemble des affichages
 */
reset.addEventListener('click', setNaN);

/**
 * Evenement déclenché par un changement d'état pour l'élément 'select' pour la selection de l'examen
 * permettant de calculer les données voulus et de les afficher.
 */
examSelect.addEventListener('change', e => {
	const value = e.target.value;
	const bool = value != 'embolie' && value != '';

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
acquis.addEventListener('input', e => {
	if (!examNotNull() || !patientNotNull()) setNaN();
	else calculAll();
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
	params.forEach(elem => {
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
	const valuePatient = patientSelect.options[patientSelect.selectedIndex].value;
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
	let bool = notNull(actualSelectedExam);
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
	let bool = notNull(actualSelectedPatient);
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
	let calcul;
	let i = 0;

	tabConcentration.forEach(element => {
		calcul = Math.round((valueDebit / element) * 1000 * 10) / 10;
		document.querySelector(`#vitesseInjec${element}`).innerHTML = calcul;
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
	let calcul;
	let i = 0;

	valueVitesseInjec.forEach(element => {
		calcul = valueTempsInjec * element;
		document.querySelector(`#vol${tabConcentration[i++]}`).innerHTML =
			Math.round(calcul * 10) / 10;
	});
}

/**
 * Evénement déclenché par un click sur la croix de fermeture de la popup liée au select examen permettant de fermer cette popup.
 */
popupExamCloseButton.addEventListener('click', e => {
	popupExam.style.display = 'none';
});

/**
 * Evénement déclenché par un click sur la croix de fermeture de la popup liée au select patient permettant de fermer cette popup.
 */
popupPatientCloseButton.addEventListener('click', e => {
	popupPatient.style.display = 'none';
});
