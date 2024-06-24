
//python -m http.server 8000

import * as cardUtils from "./card-utils.js";

    // script.js


const playerHandElement = document.getElementById('player-hand');
const dogCardsElement = document.getElementById('dog-hand');
const dealButton = document.getElementById('deal-button');

let deck = [];
let playerHand = [];
let dogHand = [];

const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const ranks = ['A','2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// Initialize deck
function initializeDeck() {
    deck = [];
    suits.forEach(suit => {
        ranks.forEach(rank => {
            deck.push({ suit, rank });
        });
    });
    shuffleDeck();
}

// Shuffle deck
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Deal cards to the player
function dealCards() {

    var handsize = Math.floor(deck.length/4-4);
    playerHand = deck.slice(0, handsize); // Deal 5 cards to player
    playerHand = cardUtils.sortCardsBySuit(playerHand);
    deck = deck.slice(handsize); // Remove dealt cards from deck
    //deal to the dog
    dogHand = deck.slice(0,4);
    dogHand = cardUtils.sortCardsBySuit(dogHand);
    deck = deck.slice(4);
    renderPlayerHand();
}

function renderCard(card)
{
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.classList.add(cardUtils.suitImage[card.suit].color);
    //cardElement.innerText = `${card.rank}\n${ cardUtils.suitImage[card.suit].symbol}`;
    
    // Create the img element
    var imgElement = document.createElement('img');
    imgElement.src = `cards/${card.rank}${ cardUtils.suitImage[card.suit].imageCode}.svg`;
    cardElement.appendChild(imgElement);
    
    return cardElement;
}

// Render player's hand
function renderPlayerHand() {
    cardUtils.sortHand();
    playerHandElement.innerHTML = '';
    playerHand.forEach((card, index) => {
        
        const cardElement = renderCard(card);
        //cardElement.addEventListener('click', () => tradeWithDog(index));
        playerHandElement.appendChild(cardElement);

        
    });
}


// Render played cards
function renderDog() {

    const dogCardsNumber = 4;

    dogCardsElement.innerHTML = '';
    dogHand.forEach((card, index) => {
        const cardElement = renderCard(card);
        // const cardElement = document.createElement('div');
        // cardElement.classList.add('card');
        // cardElement.classList.add(cardUtils.suitImage[card.suit].color);
        // cardElement.innerText = `${card.rank}\n${ cardUtils.suitImage[card.suit].symbol}`;
        // //cardElement.addEventListener('click', () => tradeWithHand(index));
        dogCardsElement.appendChild(cardElement);
    });

    if(dogHand.length<4)
    {
        for (let i = 0; i < dogCardsNumber-dogHand.length; i++)
            {
                const cardElement = document.createElement('div');
                cardElement.classList.add('card');
                dogCardsElement.appendChild(cardElement);
            }
    }
    
        

    //add dog commit button
    if(dogCardsNumber === dogHand.length)
        {
            const dogCommitElement = document.createElement('button');
            dogCommitElement.innerText="Commit";
            dogCardsElement.appendChild(dogCommitElement);
        }
}

// Send card to dog
function tradeWithDog(index) {
    const playedCard = playerHand.splice(index, 1)[0];
    dogHand.push(playedCard);
    renderDog();
    renderPlayerHand();
}

//send card from dog to hand
function tradeWithHand(index) {
    const playedCard = dogHand.splice(index, 1)[0];
    playerHand.push(playedCard);
    renderDog();
    renderPlayerHand();
}

// Initial render
initializeDeck();
dealCards();
renderPlayerHand();
renderDog();
