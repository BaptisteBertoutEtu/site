"use strict";

var divHome = document.querySelector('div[id="home"]');
var divFormations = document.querySelector('div[id="formations"]');
var divCompetences = document.querySelector('div[id="competences"]');
var divExperiences = document.querySelector('div[id="experiences"]');
var divRealisations = document.querySelector('div[id="realisations"]');
var divContact = document.querySelector('div[id="contact"]');
var selecteur = 'header-right';
var map = new Map();
map.set(divHome.getAttribute('id'), divHome.offsetTop);
map.set(divFormations.getAttribute('id'), divFormations.offsetTop);
map.set(divCompetences.getAttribute('id'), divCompetences.offsetTop);
map.set(divExperiences.getAttribute('id'), divExperiences.offsetTop);
map.set(divRealisations.getAttribute('id'), divRealisations.offsetTop);
map.set(divContact.getAttribute('id'), divContact.offsetTop);
//# sourceMappingURL=script-hightlight-index.js.map