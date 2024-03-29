const burger = document.querySelector('.hamburger');
const to_moove = document.querySelectorAll('.to-moove');
const to_moove_left = document.querySelectorAll('.to-moove-left');
const menu = document.querySelector('.menu');
const viewBar = document.querySelector('#view-bar');

window.addEventListener('scroll', () => {
	setViewBar();
	setMenu();
});

function setViewBar() {
	const hauteur = document.documentElement.scrollHeight - window.innerHeight;
	const hauteurEcran = document.documentElement.clientHeight;
	const position = window.scrollY;
	const barre = (position / hauteur) * hauteurEcran;
	viewBar.style.height = `${barre}px`;
}

burger.addEventListener('click', () => {
	burger.classList.toggle('menu-active');
	burger.classList.toggle('manual-active');
	burger.classList.remove('auto-active');

	to_moove.forEach(e => {
		e.classList.toggle('all-menu-active');
	});

	to_moove_left.forEach(e => {
		e.classList.toggle('all-menu-active-left');
	});

	menu.classList.toggle('background-to-none');
});

function setMenu() {
	const x = document.documentElement.scrollTop;
	const scrollUp = document.querySelector('.go-up');
	if (!isActiveManual()) {
		if (x > 550) {
			burger.classList.add('menu-active');
			burger.classList.add('auto-active');
			burger.classList.remove('auto-desactive');
			scrollUp.classList.add('set-active');
			scrollUp.classList.remove('set-inactive');

			to_moove.forEach(e => {
				e.classList.add('all-menu-active');
			});

			to_moove_left.forEach(e => {
				e.classList.add('all-menu-active-left');
			});

			menu.classList.add('background-to-none');
		} else {
			burger.classList.remove('menu-active');
			burger.classList.remove('manual-active');
			burger.classList.remove('auto-active');
			burger.classList.add('auto-desactive');

			scrollUp.classList.remove('set-active');
			scrollUp.classList.add('set-inactive');

			to_moove.forEach(e => {
				e.classList.remove('all-menu-active');
			});

			to_moove_left.forEach(e => {
				e.classList.remove('all-menu-active-left');
			});

			menu.classList.remove('background-to-none');
		}
	} else if (x > 550) {
		burger.classList.remove('manual-active');
	}
}

function isActiveManual() {
	return burger.classList.contains('manual-active');
}

function copy_mail() {
	const text = document.getElementById('mail').innerHTML;
	const doc = document.getElementById('ok-mail');
	copy(text, doc);
}

function copy_tel() {
	const text = document.getElementById('tel').innerHTML;
	const doc = document.getElementById('ok-tel');
	copy(text, doc);
}

function copy(text, doc) {
	navigator.clipboard.writeText(text);
	doc.style.opacity = 1;
	doc.style.transition = 'all 1s';
	setTimeout(e => {
		doc.style.opacity = 0;
	}, 2000);
}
