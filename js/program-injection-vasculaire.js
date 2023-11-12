/*
 * Copyright (c) Baptiste Bertout.
 * Mail : baptiste.bertout@gmail.com
 */

const examType = document.getElementById("exam-select");
const patientType = document.getElementById("patient-select");
const timeArriv = document.querySelector(".arriv");
const timeAcquis = document.querySelector(".acquis");
const tempsInjec = document.getElementById("tempsInjec");
const debitIode = document.getElementById("debitIode");



const tabConcentration = [300,320,350];
const allVitesseInjec = "vitesseInjec";
const allVolume = "vol";

let valueTempsInjec = 0;
let valueDebit = 0;
let valueVitesseInjec = [];
let valueVolume = [];

let mapPatient = new Map();
mapPatient.set("","NaN");
mapPatient.set("normal",1.4);
mapPatient.set("agé",1.2);
mapPatient.set("sportif",1.8);
mapPatient.set("obese",2.0);

let mapExam = new Map();
mapExam.set("embolie",10);
mapExam.set("coroscanner",17);
mapExam.set("aorteAbdo",30);
mapExam.set("aorteCrosse",20);
mapExam.set("membreInf",40);
mapExam.set("carotide",20);

/**
 * Méthode {@code calculer} est applée losque le bouton de calcul est préssé.
 * Elle permet de calculer les différentes valeurs.
 */
function calculer() {
    if( !examNotNull() || !patientNotNull() ) setNaN();
    else calculAll();
}

/**
 * Méthode {@code patientNotNull} permettant de définir si la valeur du choix du patient est nulle ou non.
 * @returns true si la valeur n'est pas nulle, false sinon.
 */
function patientNotNull(){
    let index = patientType.selectedIndex;
    let bool = notNull(patientType.options[index].value);
    if (!bool) {
        patientType.focus();
        alert("Remplir les paramètres")
    }
    return bool;
}

/**
 * Méthode {@code acquisNotNull} permettant de définir si la valeur du temps d'acquisition est nulle ou non.
 * @returns true si la valeur n'est pas nulle, false sinon.
 */
function acquisNotNull(){
    let bool = notNull(timeAcquis.value);
    if (!bool) {
        timeAcquis.focus();
        alert("Remplir les paramètres");
    }
    else if(timeAcquis.value < 0) timeAcquis.value = 0;
    return bool;
}

/**
 * Méthode {@code examNotNull} permettant de définir si la valeur du choix d'examen est nulle ou non.
 * @returns true si la valeur n'est pas nulle, false sinon.
 */
function examNotNull(){
    let index = examType.selectedIndex;
    let bool = notNull(examType.options[index].value);
    if (!bool) {
        examType.focus();
        alert("Remplir les paramètres")
    }
    return bool;
}

/**
 * Méthode {@code notNull} permettant de définir si la valeur passée en paramètre est nulle ou non.
 * @param temp La valeur à vérifier.
 * @returns true si la valeur n'est pas nulle, false sinon.
 */
function notNull(temp) {
    return temp != "";
}

/**
 * Méthode {@code setNaN} permettant de définir les valeurs à "NaN" pour indiquer qu'aucun calcul n'a été effectué.
 */
function setNaN(){
    timeAcquis.value = "";
    tempsInjec.innerText = "NaN";
    debitIode.innerText = "NaN";
    tabConcentration.forEach(element => {
        document.getElementById(allVitesseInjec+element).innerText = "NaN";
        document.getElementById(allVolume+element).innerText = "NaN";
    });
}

/**
 * Méthode {@code calculAll} permettant de calculer les différentes valeurs.
 */
function calculAll(){
    calculTempInjec();
    calculVolume();
}

/**
 * Méthode {@code calculTempInjec} permettant de calculer le temps d'injection et de les affichées aux endroits adéquat.
 */
function calculTempInjec() {
    valueTempsInjec = parseInt(timeArriv.value) -(parseInt(timeAcquis.value)/2);
    tempsInjec.innerText = valueTempsInjec;
}

/**
 * Méthode {@code changeValueDebit} permettant de changer la valeur du débit selon la valeur du choix du patient.
 * Les valeurs sont définit dans la Map {@code mapPatient}.
 */
function changeValueDebit(){
    let index = patientType.selectedIndex;
    let valuePatient = patientType.options[index].value;
    valueDebit = mapPatient.get(valuePatient);
    debitIode.innerText = valueDebit;
    calculVitesse();
    if(notNull(timeAcquis)) calculAll();
}

/**
 * Méthode {@code calculVitesse} permettant de calculer les valeurs de la vitesse d'injection et de les affichées aux endroits adéquat.
 */
function calculVitesse(){
    valueVitesseInjec.length = 0;
    let calcul;
    tabConcentration.forEach(element => {
        calcul = (valueDebit / element)*1000;
        valueVitesseInjec.push((Math.round(calcul*10)/10)) ;
    });

    for (let i = 0; i < tabConcentration.length; i++) {
        document.getElementById(allVitesseInjec+tabConcentration[i]).innerText = valueVitesseInjec[i];
    }
}

/**
 * Méthode {@code calculVolume} permettant de calculer les valeurs du volume et de les affichées aux endroits adéquat.
 */
function calculVolume(){
    valueVolume.length = 0;
    let calcul;
    valueVitesseInjec.forEach(element => {
        calcul = valueTempsInjec * element;
        valueVolume.push((Math.round(calcul*10)/10)) ;
    });

    for (let i = 0; i < tabConcentration.length; i++) {
        document.getElementById(allVolume+tabConcentration[i]).innerText = valueVolume[i];
    }
}

/**
 * Méthode {@code changeValueDebit} permettant de changer la valeur du temps d'arrivé selon la valeur du choix d'examen.
 * Les valeurs sont définit dans la Map {@code mapExamen}.
 */
function changeValueTempsArriv(){
    let index = examType.selectedIndex;
    let valueExam = examType.options[index].value;
    if(valueExam != "embolie" && valueExam != "") {
        patientType.disabled = true;
        patientType.value = "normal";
    }
    else if(valueExam == ""){
        patientType.value = "";
        patientType.disabled = false;
    }
    else {
        patientType.disabled = false;
        patientType.value = "";
    }
    changeValueDebit();
    document.getElementById("tempsArriv").value = mapExam.get(valueExam);
}