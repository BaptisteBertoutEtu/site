const divHome = document.querySelector('div[id="home"]');
const divPresentation = document.querySelector('div[id="presentation"]');
const divImage = document.querySelector('div[id="image"]');

const selecteur = 'menu-projet';

const map = new Map();

map.set(divHome.getAttribute('id'), divHome.offsetTop);
map.set(divPresentation.getAttribute('id'), divPresentation.offsetTop);
if (divImage != null) {
	map.set(divImage.getAttribute('id'), divImage.offsetTop);
}
