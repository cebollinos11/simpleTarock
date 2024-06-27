// view.js

import * as cardUtils from "./card-utils.js";

const playerHandElement = document.getElementById('player-hand');
const dogCardsElement = document.getElementById('dog-hand');

function renderCard(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.classList.add(cardUtils.suitImage[card.suit].color);

    var imgElement = document.createElement('img');
    imgElement.src = `cards/${card.rank}${cardUtils.suitImage[card.suit].imageCode}.svg`;
    cardElement.appendChild(imgElement);

    return cardElement;
}

function renderPlayerHand(playerHand, tradeWithDog, lastUpdated = null) {
    playerHandElement.innerHTML = '';
    playerHand.forEach((card, index) => {
        const cardElement = renderCard(card);
        cardElement.addEventListener('click', () => tradeWithDog(index));
        playerHandElement.appendChild(cardElement);
        
        if (lastUpdated === card) {
            console.log("animate");
            cardElement.classList.add('animate-top');
        }
    });
}

function renderDog(dogHand, tradeWithHand, lastUpdated = null) {
    const dogCardsNumber = 4;
    dogCardsElement.innerHTML = '';

    dogHand.forEach((card, index) => {
        const cardElement = renderCard(card);
        if (lastUpdated === card) {
            cardElement.classList.add('animate-bottom');
        }
        cardElement.addEventListener('click', () => tradeWithHand(index));
        dogCardsElement.appendChild(cardElement);
    });

    if (dogHand.length < 4) {
        for (let i = 0; i < dogCardsNumber - dogHand.length; i++) {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            dogCardsElement.appendChild(cardElement);
        }
    }

    if (dogCardsNumber === dogHand.length) {
        const dogCommitElement = document.createElement('button');
        dogCommitElement.innerText = "Commit";
        dogCardsElement.appendChild(dogCommitElement);
    }
}

//_view.renderTrick(game.currentTrick,true);
function renderTrick(currentTrick,whoStarted)
{
    //clean tricks

    currentTrick.forEach(card => {
        
        console.log("show card "+card.toString())

    });
}

export {
    renderPlayerHand,
    renderDog,
    renderTrick
};
