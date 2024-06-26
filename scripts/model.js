// model.js

import * as cardUtils from "./card-utils.js";


class CardGame
{
    constructor(numPlayers){
        this.numPlayers = numPlayers;
        this.players = []
        for (let index = 0; index < numPlayers; index++) {
            this.players.push(new Player(index>0));            
        }
        this.deck = [];
        this.dogHand = [];
    }
}

class Player {
    constructor(isAi) {
     this.isAi = isAi;
     this.hand = [];
   }
 }

let gameState = new CardGame(4);


let playerHand = [];
let dogHand = [];




const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function initializeDeck() {
    let deck = [];
    suits.forEach(suit => {
        ranks.forEach(rank => {
            deck.push({ suit, rank });
        });
    });

    gameState.deck = shuffleDeck(deck);
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function dealCards() {

    const dogSize = 4;
    const handsize = Math.floor(gameState.deck.length / gameState.numPlayers - dogSize);
    for (let index = 0; index < gameState.players.length; index++) {
        let playerHand = gameState.deck.slice(0, handsize);
        playerHand = cardUtils.sortCardsBySuit(playerHand);
        gameState.players[index].hand = playerHand;
        gameState.deck = gameState.deck.slice(handsize);       
    }   

    gameState.dogHand = gameState.deck.slice(0, dogSize);
    gameState.dogHand = cardUtils.sortCardsBySuit(gameState.dogHand);
    gameState.deck = gameState.deck.slice(4);
    console.log(gameState);
}

function getPlayerHand() {
    return gameState.players[0].hand;
}

function getDogHand() {
    return gameState.dogHand;
}

function tradeCardFromPlayerToDog(index) {
    const playedCard = gameState.players[0].hand.splice(index, 1)[0];
    gameState.dogHand.push(playedCard);
    return playedCard;
}

function tradeCardFromDogToPlayer(index) {
    const playedCard = gameState.dogHand.splice(index, 1)[0];
    gameState.players[0].hand.push(playedCard);
    gameState.players[0].handplayerHand = cardUtils.sortCardsBySuit(gameState.players[0].hand);
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
