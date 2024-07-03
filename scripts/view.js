// view.js

import * as cardUtils from "./card-utils.js";

const playerHandElement = document.getElementById('player-hand');
const dogCardsElement = document.getElementById('dog-hand');
let trickSlots = []
let numPlayers = -1;

function renderCard(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.classList.add(cardUtils.suitImage[card.suit].color);

    var imgElement = document.createElement('img');
    imgElement.src = `cards/${card.rank}${cardUtils.suitImage[card.suit].imageCode}.svg`;
    cardElement.appendChild(imgElement);

    return cardElement;
}

function renderPlayerHand(playerHand, callbackOnClick, animateCard = null, disabledCards = []) {
    playerHandElement.innerHTML = '';
    playerHand.forEach((card, index) => {
        const cardElement = renderCard(card);
        cardElement.style.zIndex = index;
        if (!disabledCards.includes(card)) {
            //cardElement.addEventListener('click', () => callbackOnClick(index));
            cardElement.addEventListener('click', () => callbackOnClick(index));
        }
        else
        {
            cardElement.classList.add("disabled");//visual filter
        }        
        
        playerHandElement.appendChild(cardElement);
        
        if (animateCard === card) {
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
function renderTrick(currentTrickCards,lastCardPlayed)
{
    //clean tricks

    for (let index = 0; index < numPlayers; index++) {
        trickSlots[index].innerHTML = "";
        trickSlots[index].innerHTML = "";
        const c = currentTrickCards[index];
        if(c!=null)
            {
                let rCard = renderCard(c);
                if(c==lastCardPlayed)
                    {
                        rCard.classList.add(getAnimationDirection(lastCardPlayed.ownerIndex));
                    }
                trickSlots[index].appendChild(rCard);
            }

    }

    
}

function getAnimationDirection(playerIndex)
{
    

    switch (playerIndex) {
        case 0:
            return "animate-bottom"
            break;
        case 1:
            return "animate-right"
            break;
        case 2:
            return "animate-top"
            break;
        case 3:
            return "animate-left"
            break;
    
        default:
            return "animate-bottom";
            break;
    }
}

function initialize(nPlayers)
{
    numPlayers = nPlayers;
    for (let index = 0; index < nPlayers; index++) {        
        trickSlots.push(document.getElementById(`cardslot${index+1}`));
    }
}

export {
    initialize,
    renderPlayerHand,
    renderDog,
    renderTrick
};
