const burger = document.querySelector('.hamburger');
const to_moove = document.querySelectorAll('.to-moove');
const menu = document.querySelector('.menu');

burger.addEventListener('click', () => {
    burger.classList.toggle('menu-active');
    burger.classList.toggle('manual-active');
    burger.classList.remove('auto-active');

    to_moove.forEach((e) => {
        e.classList.toggle('all-menu-active');
    });

    menu.classList.toggle('background-to-none');
    
});

window.onscroll = function() {myFunction()};
 
function myFunction() {
    var x = document.documentElement.scrollTop;
    if (!isActiveManual()) {
        if ( x > 650) {
            burger.classList.add('menu-active');
            burger.classList.add('auto-active');
            burger.classList.remove('auto-desactive');
    
            to_moove.forEach((e) => {
                e.classList.add('all-menu-active');
            });
    
            menu.classList.add('background-to-none');
        }
        else{
            burger.classList.remove('menu-active');
            burger.classList.remove('manual-active');
            burger.classList.remove('auto-active');
            burger.classList.add('auto-desactive');
    
            to_moove.forEach((e) => {
                e.classList.remove('all-menu-active');
            });
    
            menu.classList.remove('background-to-none');
        }      
    }
    else{
        if ( x > 650) {
            burger.classList.remove('manual-active');
        }
    }
}

function isActiveManual(){
    return burger.classList.contains('manual-active');
}

function isActiveAuto(){
    return burger.classList.contains('auto-active');
}

function isDesactiveAuto(){
    return burger.classList.contains('auto-desactive');
}

function copy_mail(){
    var text = document.getElementById("mail").innerHTML;
    var doc =  document.getElementById("ok_mail");
    copy(text,doc);
}

function copy_tel(){
    var text = document.getElementById("tel").innerHTML;
    var doc =  document.getElementById("ok_tel");
    copy(text,doc);
}

function copy(text,doc){
    navigator.clipboard.writeText(text);
    doc.style.opacity = 1;
    doc.style.transition = "all 1s";
    setTimeout(function() {
        doc.style.opacity = 0;
    }, 2000);
}

