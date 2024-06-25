// model.js

import * as cardUtils from "./card-utils.js";

let deck = [];
let playerHand = [];
let dogHand = [];

const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function initializeDeck() {
    deck = [];
    suits.forEach(suit => {
        ranks.forEach(rank => {
            deck.push({ suit, rank });
        });
    });
    shuffleDeck();
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function dealCards() {
    const handsize = Math.floor(deck.length / 4 - 4);
    playerHand = deck.slice(0, handsize);
    playerHand = cardUtils.sortCardsBySuit(playerHand);
    deck = deck.slice(handsize);

    dogHand = deck.slice(0, 4);
    dogHand = cardUtils.sortCardsBySuit(dogHand);
    deck = deck.slice(4);
}

function getPlayerHand() {
    return playerHand;
}

function getDogHand() {
    return dogHand;
}

function tradeCardFromPlayerToDog(index) {
    const playedCard = playerHand.splice(index, 1)[0];
    dogHand.push(playedCard);
    return playedCard;
}

function tradeCardFromDogToPlayer(index) {
    const playedCard = dogHand.splice(index, 1)[0];
    playerHand.push(playedCard);
    playerHand = cardUtils.sortCardsBySuit(playerHand);
    return playedCard;
}

export {
    initializeDeck,
    shuffleDeck,
    dealCards,
    getPlayerHand,
    getDogHand,
    tradeCardFromPlayerToDog,
    tradeCardFromDogToPlayer
};
