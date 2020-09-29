import { isArray } from "util";

export default class Card {
    constructor() {
        this.phrases = null;
        this.phrasesNotAvalable = null;
    }

    setConstants({ PHRASES_SELECT, PHRASES_NOT_AVAILABLE }) {
        this.phrases = PHRASES_SELECT;
        this.phrasesNotAvalable = PHRASES_NOT_AVAILABLE;
    }

    onMouseLeave(event) {
        const cardNode = event.target.closest('.card');
        try {
            const cardBody = cardNode.querySelector('.card__body_selected');
            if (cardBody) {
                const cardPrologText = cardNode.querySelector('.card__prolog');
                cardPrologText.textContent = 'Котэ не одобряет?';
                cardPrologText.classList.add('card__prolog_selected-hover');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    onClick(event) {
        const cardNode = event.target.closest('.card');
        try {
            const cardBody = cardNode.querySelector('.card__body_disabled');
            if (!cardBody) {
                const cardBody = cardNode.querySelector('.card__body');
                cardBody.classList.toggle('card__body_selected');
                const cardCorner = cardNode.querySelector('.card__corner');
                cardCorner.classList.toggle('card__corner_selected');
                const cardHead = cardNode.querySelector('.card__head');
                cardHead.classList.toggle('card__head_selected');
                const cardOval = cardNode.querySelector('.card__oval');
                cardOval.classList.toggle('card__oval_selected');
                let cardBottomTextContainer = cardNode.querySelector('.card__bottom-text-container');

                if (cardBody.classList.contains('card__body_selected')) {
                    this.removeElementsFromNode(cardBottomTextContainer);
                    const template = document.createElement('template');
                    template.insertAdjacentHTML('afterbegin', this._getTemplate('selected', this.phrases[cardNode.id]));
                    cardBottomTextContainer = cardNode.querySelector('.card__bottom-text-container');
                    cardBottomTextContainer.appendChild(template.firstChild);
                }
                else {
                    this.removeElementsFromNode(cardBottomTextContainer);
                    const template = document.createElement('template');
                    template.insertAdjacentHTML('afterbegin', this._getTemplate('original'));
                    cardBottomTextContainer = cardNode.querySelector('.card__bottom-text-container');
                    cardBottomTextContainer.appendChild(template.firstChild);

                    const cardPrologText = cardNode.querySelector('.card__prolog');
                    cardPrologText.textContent = 'Сказочное заморское яство';
                    cardPrologText.classList.remove('card__prolog_selected-hover');
                }

            }
        } catch (error) {
            console.log('Карточка не выбрана', error);
        }
    }

    removeElementsFromNode(nodeContainer) {
        const parentNodeContainer = nodeContainer.parentNode;
        nodeContainer.parentNode.removeChild(nodeContainer);
        const template = document.createElement('template');
        template.insertAdjacentHTML('afterbegin', this._getTemplate('empty'));
        parentNodeContainer.appendChild(template.firstChild);
    }

    _getTemplate(template, textToShow = '') {
        const cardTextTemplates = {
            original: `<div class="card__bottom-text-container">
          <p class="card__bottom-text">Чего сидишь? Порадуй котэ,</p>
          <a href="" class="card__link">купи</a>
        </div>`,
            selected: `<div class="card__bottom-text-container">
        <p class="card__bottom-text">${textToShow}</p>
        </div>`,
            empty: `<div class="card__bottom-text-container">
            </div>`,
        };
        return cardTextTemplates[template];
    }

}

