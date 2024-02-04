let lastHightLight = 'home';

window.onscroll = () => {
	changeHightLightOnScroll();
};

function changeHightLightOnScroll() {
	const int = window.scrollY + 2;
	map.forEach((values, keys) => {
		if (int >= values) {
			changeHightLight(keys);
		}
	});
}

function changeHightLight(id) {
	document
		.querySelector(`.${selecteur} a[id="goTo${lastHightLight}"]`)
		.classList.remove('set-hightlight');
	document
		.querySelector(`.${selecteur} a[id="goTo${id}"]`)
		.classList.add('set-hightlight');
	lastHightLight = id;
}
