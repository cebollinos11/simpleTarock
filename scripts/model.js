// model.js

import * as cardUtils from "./card-utils.js";
import { Trick } from "./classes/trick.js";


class CardGame
{
    currentTrick = null;
    constructor(numPlayers){
        this.numPlayers = numPlayers;
        this.players = []
        for (let index = 0; index < numPlayers; index++) {
            this.players.push(new Player(index>0));            
        }
        this.deck = [];
        this.dogHand = [];
        this.currentPlayerIndex = 0;
        this.currentTrickStarterIndex = 0;
        
        this.trickHistory = []
        this.currentTrump = null
    }
    randomizeDealer()
    {
        this.currentTrump = "hearts";
        this.currentTrick = new Trick(this.numPlayers,this.currentTrump);
        this.currentPlayerIndex = 0;
        this.currentTrickStarterIndex = 0;
    }
    givePriority()
    {
        if(this.players[this.currentPlayerIndex].isAi)
            {
                //handle ai,
                const chosenCard = this.aiSelectCard()
                return false;
            }
            else
            {
                //handle human player
                return true;
            }
    }  
    
    getPlayerHand()
    {
        return this.players[0].hand;
    }
        
        
    //todo, proper AI
    aiSelectCard()
    {
        //get legal cards
        const legalcards = this.currentTrick.getLegalCards(this.players[this.currentPlayerIndex].hand);
        let card = legalcards[Math.floor((Math.random()*legalcards.length))];
        this.playCard(card);
        return card;
    }

    calculateTrickWinner()
    {
        const winCard = cardUtils.highestCard(this.currentTrick.cards,this.currentTrump,this.currentTrick.firstCard);
        console.log(winCard);
        return winCard;
    }

    completeTrick() //called by controller
    {
        this.trickHistory.push(this.currentTrick);
        const winCard = this.calculateTrickWinner();
        this.players[winCard.ownerIndex].tricksWon++;
        this.currentTrick.clear();
        //TODO select new starter
        this.currentPlayerIndex = winCard.ownerIndex;
        this.currentTrickStarterIndex = winCard.ownerIndex;
    }

    getAttackDefenseTricks()
    {
        const attack = this.players[0].tricksWon;
        let defense = 0;
        for (let index = 1; index < this.players.length; index++) {
            defense += this.players[index].tricksWon;
            
        }

        return [attack,defense];
    }
    
    playCard(chosenCard)
    {        
        this.currentTrick.playCard(chosenCard,this.currentPlayerIndex);        
        const index = this.players[this.currentPlayerIndex].hand.indexOf(chosenCard);
        if (index !== -1) {
            this.players[this.currentPlayerIndex].hand.splice(index, 1);
        }  
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;

    }

    
    
    


    initializeDeck() {
        let deck = [];
        suits.forEach(suit => {
            ranks.forEach(rank => {
                deck.push( new Card(suit,rank));
            });
        });
    
        this.deck = shuffleDeck(deck);
    }

    dealCards() {
        const dogSize = 4;
        const handsize = Math.floor((this.deck.length- dogSize) / this.numPlayers );
        for (let index = 0; index < this.players.length; index++) {
            let playerHand = this.deck.slice(0, handsize);
            playerHand.forEach(c => {
                c.ownerIndex = index;
            });
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
     this.score = 0;
     this.tricksWon = 0;
   }
}


class Card{
    constructor(suit,rank)
    {
        this.suit=suit;
        this.rank=rank;
        this.ownerIndex = -1;
    }

    toString()
    {
        return this.rank+this.suit;
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
