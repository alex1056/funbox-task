import './css/style.css';

import Card from './js/components/card';
const card = new Card();

const { PHRASES_SELECT, PHRASES_NOT_AVAILABLE } = require('./js/constants');

card.setConstants({ PHRASES_SELECT, PHRASES_NOT_AVAILABLE });

const cards = document.querySelectorAll('.card');
cards.forEach(currentCard => currentCard.addEventListener('click', card.onClick.bind(card)));
cards.forEach(currentCard => currentCard.addEventListener('mouseleave', card.onMouseLeave.bind(card)));

