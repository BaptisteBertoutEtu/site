const divHome = document.querySelector('div[id="home"]');
const divFormations = document.querySelector('div[id="formations"]');
const divCompetences = document.querySelector('div[id="competences"]');
const divExperiences = document.querySelector('div[id="experiences"]');
const divRealisations = document.querySelector('div[id="realisations"]');
const divContact = document.querySelector('div[id="contact"]');

const selecteur = 'header-right';

const map = new Map();

map.set(divHome.getAttribute('id'), divHome.offsetTop);
map.set(divFormations.getAttribute('id'), divFormations.offsetTop);
map.set(divCompetences.getAttribute('id'), divCompetences.offsetTop);
map.set(divExperiences.getAttribute('id'), divExperiences.offsetTop);
map.set(divRealisations.getAttribute('id'), divRealisations.offsetTop);
map.set(divContact.getAttribute('id'), divContact.offsetTop);
