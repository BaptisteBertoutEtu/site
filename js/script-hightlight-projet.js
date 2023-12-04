let int;

const h = document.getElementById("home").offsetTop;
const p = document.getElementById("presentation").offsetTop;
let i;
try {
    i = document.getElementById("image").offsetTop;
} catch (error) {
    i = null;
}

let lastHightLight = "h"

window.onscroll = () => {
    changeHightLightOnScroll();
} 


function changeHightLightOnScroll(){
    int = window.scrollY;
    if(int < p){
        changeHightLight("h");
    }
    else if(int >= p && i!=null && int < i){
        changeHightLight("p");
    }
    else if(int >= p && i==null){
        changeHightLight("p");
    }
    else{
        changeHightLight("i");
    }
}

function changeHightLight(elem){
    try {
        document.getElementById(lastHightLight).classList.remove("set-hightlight");
        document.getElementById(elem).classList.add("set-hightlight");
        lastHightLight = elem;
    } catch (error) {
        
    }
}