/*
 * Copyright (c) Baptiste Bertout.
 * Mail : baptiste.bertout@gmail.com
 */


const tensionTube = document.getElementById("tension-tube-select");
const inputWeight = document.querySelector(".weight");
const doseInjec = document.getElementById("doseInjec");
const debitInjec = document.getElementById("debitInjec");


const tabConcentration = [300,320,350];
const allDebitInjec = "debitInjec";
const allVolume = "vol";

let valueDoseInjec = 0;
let valueDebitInjec = [];
let valueVolume = [];

let mapTension = new Map();
mapTension.set("","NaN");
mapTension.set("80",0.3);
mapTension.set("100",0.4);
mapTension.set("120",0.5);

/**
 * Méthode {@code calculer} est applée losque le bouton de calcul est préssé.
 * Elle permet de calculer les différentes valeurs.
 */
function calculer() {
    if( !tensionNotNull()) setNaN();
    else calculAll();
}

/**
 * Méthode {@code examNotNull} permettant de définir si la valeur du choix d'examen est nulle ou non.
 * @returns true si la valeur n'est pas nulle, false sinon.
 */
function tensionNotNull(){
    let index = tensionTube.selectedIndex;
    let bool = notNull(tensionTube.options[index].value);
    if (!bool) {
        tensionTube.focus();
        alert("Remplir les paramètres")
    }
    return bool;
}

function weightNotNull(){
    return notNull(inputWeight.value);
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
    inputWeight.value = "";
    tabConcentration.forEach(element => {
        document.getElementById(allDebitInjec+element).innerText = "NaN";
        document.getElementById(allDoseInjec+element).innerText = "NaN";
        document.getElementById(allVolume+element).innerText = "NaN";
    });
}

/**
 * Méthode {@code calculAll} permettant de calculer les différentes valeurs.
 */
function calculAll(){
    if(weightNotNull()){
        calculDoseInjec();
        calculVolume();
        calculDebitInjec();
    }
}

/**
 * Méthode {@code calculTempInjec} permettant de calculer le temps d'injection et de les affichées aux endroits adéquat.
 */
function calculDoseInjec() {
    let index = tensionTube.selectedIndex;
    let valueTension = tensionTube.options[index].value;
    let calcul = parseInt(inputWeight.value) * mapTension.get(valueTension);
    valueDoseInjec = Math.round(calcul*100)/100;
    doseInjec.innerHTML = valueDoseInjec;
}

/**
 * Méthode {@code calculVitesse} permettant de calculer les valeurs de la vitesse d'injection et de les affichées aux endroits adéquat.
 */
function calculDebitInjec(){
    valueDebitInjec.length = 0;
    let calcul;
    valueVolume.forEach(element => {
        calcul = element / 30;
        valueDebitInjec.push((Math.round(calcul*100)/100)) ;
    });

    for (let i = 0; i < tabConcentration.length; i++) {
        document.getElementById(allDebitInjec+tabConcentration[i]).innerText = valueDebitInjec[i];
    }
}

/**
 * Méthode {@code calculVolume} permettant de calculer les valeurs du volume et de les affichées aux endroits adéquat.
 */
function calculVolume(){
    valueVolume.length = 0;
    let calcul;
    tabConcentration.forEach(element => {
        calcul = (valueDoseInjec / element)*1000;
        valueVolume.push((Math.round(calcul*100)/100)) ;
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