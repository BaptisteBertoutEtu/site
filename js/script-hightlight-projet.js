let int;

const h = document.getElementById("home").offsetTop;
const p = document.getElementById("presentation").offsetTop;
const i = document.getElementById("image").offsetTop;
let lastHightLight = "h"

window.onscroll = () => {
    changeHightLightOnScroll();
} 


function changeHightLightOnScroll(){
    int = window.scrollY;
    if(int < p){
        changeHightLight("h");
    }
    else if(int >= p && int < i){
        changeHightLight("p");
    }
    else{
        changeHightLight("i");
    }
}

function changeHightLight(elem){
    document.getElementById(lastHightLight).classList.remove("set-hightlight");
    document.getElementById(elem).classList.add("set-hightlight");
    lastHightLight = elem;
}