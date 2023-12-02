
let cpt=1;
let lastCpt = cpt;

function imageSuivante(path, max){
    if(cpt+1 <= max){
        document.getElementById("circle-"+cpt).classList.remove("selected-circle");
        cpt++;
        lastCpt = cpt;
        document.getElementById("circle-"+cpt).classList.add("selected-circle");
        changeImage(path + cpt + ".png", cpt);
    }
}

function imagePrecedente(path, min){
    if(cpt-1 >= min){
        document.getElementById("circle-"+cpt).classList.remove("selected-circle");
        cpt--;
        lastCpt = cpt;
        document.getElementById("circle-"+cpt).classList.add("selected-circle");
        changeImage(path + cpt + ".png", cpt);
    }
}

function changeImage(path, currentCpt){
    document.getElementById("circle-"+lastCpt).classList.remove("selected-circle");
    lastCpt = currentCpt;
    cpt = currentCpt;
    document.getElementById("change-image").src = path;
    document.getElementById("circle-"+currentCpt).classList.add("selected-circle");
}