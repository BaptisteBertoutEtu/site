let int;

const h = document.getElementById("home").offsetTop;
const f = document.getElementById("formations").offsetTop;
const compet = document.getElementById("competences").offsetTop;
const e = document.getElementById("experiences").offsetTop;
const r = document.getElementById("realisations").offsetTop;
const conta = document.getElementById("contact").offsetTop;
let lastHightLight = "h"

window.onscroll = changeHightLightOnScroll();

function changeHightLightOnScroll(){
    int = window.scrollY;
    if(int < f){
        changeHightLight("h");
    }
    else if(int >= f && int < compet){
        changeHightLight("f");
    }
    else if(int >= compet && int < e){
        changeHightLight("compet");
    }
    else if(int >= e && int < r){
        changeHightLight("e");
    }
    else if(int >= r && int < conta){
        changeHightLight("r");
    }
    else{
        changeHightLight("conta");
    }
}

function changeHightLight(elem){
    document.getElementById(lastHightLight).classList.remove("set-hightlight");
    document.getElementById(elem).classList.add("set-hightlight");
    lastHightLight = elem;
}