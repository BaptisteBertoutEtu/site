let cpt = 1;
let lastCpt = cpt;

const min = 1;
const max = parseInt(
	document.querySelector('meta[name="nombre-fichier"]').getAttribute('content')
);
const path = document
	.querySelector('meta[name="path"]')
	.getAttribute('content');

const image = document.querySelector('.image-present');
const buttonSuiv = document.querySelector('.button-suiv');
const buttonPrec = document.querySelector('.button-prec');

const allOneCircle = document.querySelectorAll('.one-circle');

buttonPrec.addEventListener('click', e => {
	cpt = cpt - 1 >= min ? cpt - 1 : max;
	changeToImage(`${path}${cpt}.png`, cpt);
});

buttonSuiv.addEventListener('click', e => {
	cpt = cpt + 1 <= max ? cpt + 1 : 1;
	changeToImage(`${path}${cpt}.png`, cpt);
});

allOneCircle.forEach(elem => {
	elem.addEventListener('click', e => {
		const id = e.target.getAttribute('id').replace('image', '');
		changeToImage(`${path}${id}.png`, parseInt(id));
	});
});

function changeToImage(pathForImage, currentCpt) {
	document
		.querySelector(`#image${lastCpt}`)
		.classList.remove('selected-circle');
	lastCpt = currentCpt;
	cpt = currentCpt;
	image.src = pathForImage;
	document
		.querySelector(`#image${currentCpt}`)
		.classList.add('selected-circle');
}
