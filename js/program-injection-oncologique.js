/*
 * Copyright (c) Baptiste Bertout.
 * Mail : baptiste.bertout@gmail.com
 * Version : 1.0
 * Compilé à l'aide de NodeJs. Le résultat de la compilation se trouve dans le répertoire build.
 */

const weight = document.querySelector('.weight');
const tension = document.querySelector('.tension-tube-select');
const doseInjec = document.querySelector('.doseInjec');
const allVolume = document.querySelectorAll('.vol');
const reset = document.querySelector('.reset-button');
const popup = document.querySelector('.modal');
const popupCloseButton = document.querySelector('#modal-close');

const nan = 'NaN';

const tabConcentration = [300, 320, 350, 370, 400];

const mapTension = new Map();
mapTension.set('80', 0.3);
mapTension.set('100', 0.4);
mapTension.set('120', 0.5);

let valueDoseInjec = 0;
let actualTensionValue = 0;

/**
 * Evénement déclenché par un click sur le bouton reset permettant de remettre à zéro l'ensemble des affichages
 */
reset.addEventListener('click', setNaN);

/**
 * Evenement déclenché par un changement d'état pour l'élément 'select'
 * permettant de calculer les données voulus et de les afficher.
 */
tension.addEventListener('change', e => {
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
weight.addEventListener('input', () => {
	if (tensionNotNull()) {
		calculDoseInjec();
		calculVolume();
	}
});

/**
 * Méthode {@code calculDoseInjec()} permettant de calculer la dose d'injection souhaitée.
 */
function calculDoseInjec() {
	const calcul = parseInt(weight.value) * mapTension.get(actualTensionValue);
	valueDoseInjec = Math.round(calcul * 100) / 100;
	doseInjec.innerHTML = valueDoseInjec;
}

/**
 * Méthode {@code calculVolume()} permettant de calculer le volume pour chaque Concentration.
 */
function calculVolume() {
	let calcul;
	tabConcentration.forEach(element => {
		calcul = (valueDoseInjec / element) * 1000;
		document.querySelector(`#vol${element}`).innerHTML = Math.round(calcul);
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
	const bool = weight.value != '';
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
	allVolume.forEach(elem => {
		elem.innerHTML = nan;
	});
}

/**
 * Evénement déclenché par un click sur la croix de fermeture de la popup permettant de fermer cette popup.
 */
popupCloseButton.addEventListener('click', () => {
	popup.style.display = 'none';
});
