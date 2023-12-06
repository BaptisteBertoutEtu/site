
let cpt=1;
let lastCpt = cpt;

let min;
let max;
let path;

function imageSuivante(){
    document.getElementById("circle-"+cpt).classList.remove("selected-circle");
    cpt = (cpt+1 <= max ? cpt+1 : 1);
    lastCpt = cpt;
    changeImage(path + cpt + ".png", cpt);
}

function imagePrecedente(){
    document.getElementById("circle-"+cpt).classList.remove("selected-circle");
    cpt = (cpt-1 >= min ? cpt-1 : max);
    lastCpt = cpt;
    changeImage(path + cpt + ".png", cpt);
}

function changeImage(pathForImage,currentCpt){
    document.getElementById("circle-"+lastCpt).classList.remove("selected-circle");
    lastCpt = currentCpt;
    cpt = currentCpt;
    document.getElementById("change-image").src = pathForImage;
    document.getElementById("circle-"+currentCpt).classList.add("selected-circle");  
}

function changeImageButton(currentCpt){
    changeImage(path,currentCpt);
}

function setMinMaxPath(minimum, maximum, pathForImage){
    min = minimum;
    max = maximum;
    path = pathForImage;
}