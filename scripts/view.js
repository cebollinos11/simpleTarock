// view.js

import TableModule from "./classes/TableModule.js";
import * as cardUtils from "./card-utils.js";

const playerHandElement = document.getElementById('player-hand');
const dogCardsElement = document.getElementById('dog-hand');
const hash_trickCounter = 'trick-counter';
const trickResult = document.getElementById('trick-result');


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

function renderPlayerHand(playerHand, callbackOnClick, animateCard = null, enabledCards = []) {
    playerHandElement.innerHTML = '';
    playerHand.forEach((card, index) => {
        const cardElement = renderCard(card);
        cardElement.style.zIndex = index;
        if (enabledCards.includes(card)) {
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

function renderTrickStatus(attack,defense)
{
    console.log(attack,defense);
    // trickCounter.innerHTML = `${attack}/${defense}`;

    const data = [
        { Team: 'Attack', Tricks: attack },
        { Team: 'Defense', Tricks: defense }
    ];

    const tableModule = new TableModule(data, hash_trickCounter);
    tableModule.generateTable();

    if(attack>defense)
    {
        trickResult.innerHTML = "WIN"
        trickResult.style.classList = "win";
    }
    else{
        trickResult.innerHTML = "LOSE"
        trickResult.style.classList = "lose";
    }
    trickResult.style.visibility="visible"; 
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

function showRoundScores()
{

}

export {
    initialize,
    renderPlayerHand,
    renderDog,
    renderTrick,
    renderTrickStatus,
    showRoundScores
};
