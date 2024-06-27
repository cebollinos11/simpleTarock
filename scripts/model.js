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

    initializeDeck() {
        let deck = [];
        suits.forEach(suit => {
            ranks.forEach(rank => {
                deck.push({ suit, rank });
            });
        });
    
        this.deck = shuffleDeck(deck);
    }

    dealCards() {
        const dogSize = 4;
        const handsize = Math.floor((this.deck.length- dogSize) / this.numPlayers );
        for (let index = 0; index < this.players.length; index++) {
            let playerHand = this.deck.slice(0, handsize);
            playerHand = cardUtils.sortCardsBySuit(playerHand);
            this.players[index].hand = playerHand;
            this.deck = this.deck.slice(handsize);       
        }   
    
        this.dogHand = this.deck.slice(0, dogSize);
        this.dogHand = cardUtils.sortCardsBySuit(this.dogHand);
        this.deck = this.deck.slice(4);
        console.log(this);
    }

    getPlayerHand() {
        return this.players[0].hand;
    }
    
    getDogHand() {
        return this.dogHand;
    }

    tradeCardFromPlayerToDog(index) {
        const playedCard = this.players[0].hand.splice(index, 1)[0];
        this.dogHand.push(playedCard);
        return playedCard;
    }
    
    tradeCardFromDogToPlayer(index) {
        const playedCard = this.dogHand.splice(index, 1)[0];
        this.players[0].hand.push(playedCard);
        this.players[0].handplayerHand = cardUtils.sortCardsBySuit(this.players[0].hand);
        return playedCard;
    }
}

class Player {
    constructor(isAi) {
     this.isAi = isAi;
     this.hand = [];
   }
}


const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];



function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

export {
    CardGame,
    shuffleDeck
};
