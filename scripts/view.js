// view.js

import TableModule from "./classes/TableModule.js";
import * as cardUtils from "./card-utils.js";
import * as chooseTrump from "./views/trump-menu.js";
import * as bonusMenu from "./views/bonus-menu.js";
import * as resultPanel from "./views/result-panel.js";
import * as resDTO from "./classes/resultDTO.js";
import * as bidMenu from "./views/bid-menu.js"

const playerHandElement = document.getElementById('player-hand');
const dogCardsElement = document.getElementById('dog-hand');
const hash_trickCounter = 'trick-counter';
const trickResult = document.getElementById('trick-result');
const testbutton = document.getElementById("test");
const trickcenter = document.getElementById("trick-center");



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
    

}

function animateTrickTaker(winnerId)
{
    showAndMoveTrickResult(trickcenter,"move-to-"+winnerId);
}

function showAndMoveTrickResult(div,moveto) {
    
    console.log(moveto);
    // trickResult.style.backgroundColor="yellow";
    // trickResult.innerHTML = "LOSE"

    // Make the div visible
    div.classList.add('visible');
    div.classList.add(moveto);

    
    //Move to bottom after a short delay to ensure visibility
    setTimeout(() => {
        div.classList.add(moveto);
    }, 200); // Adjust the delay as needed
    
    // Hide the div again after the animation is complete
    setTimeout(() => {
        div.classList.remove('visible', moveto);        
        div.style.visibility = 'hidden'; // Ensure it's hidden after animation
    }, 600); // 500ms delay + 2000ms animation time
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
    trickcenter.style.visibility="visible";    
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

export function showChooseContract(callback)
{
    bidMenu.init();
    bidMenu.setCallback(callback);
} 

function showChooseTrump(callback)
{
    chooseTrump.init();
    chooseTrump.setCallback(callback);
}

function showBonusMenu(callback)
{
    bonusMenu.init();
    bonusMenu.setCallback(callback)
}

export {
    initialize,
    renderPlayerHand,
    renderDog,
    renderTrick,
    renderTrickStatus,
    showRoundScores,
    animateTrickTaker,
    showChooseTrump,
    showBonusMenu,
    
};


//test

const b1 = new resDTO.Bonus("big dick",8,true);
const b2 = new resDTO.Bonus("small dick",2,false);
let blist = [b1,b2];

const res = new resDTO.ResultDTO(5,11,4,30,blist,2,20,2,10);

 //resultPanel.init(res);