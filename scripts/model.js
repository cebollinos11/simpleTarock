// model.js

import * as cardUtils from "./card-utils.js";
import { ResultDTO } from "./classes/resultDTO.js";
import { Round } from "./classes/round.js";
import { Trick } from "./classes/trick.js";


class CardGame
{
    currentTrick = null;
    constructor(numPlayers){
        this.numPlayers = numPlayers;
        this.players = []
        this.isRoundFinished = false;
        for (let index = 0; index < numPlayers; index++) {
            this.players.push(new Player(index>0));            
        }
        this.deck = [];
        this.dogHand = [];
        this.currentPlayerIndex = 0;
        this.currentTrickStarterIndex = 0;        
        this.currentTrump = null;
        this.currentRound = null;
        this.roundCount = 0;
        this.multiplier = 0;
        this.dogsize = 0;
        this.resultReport = null;
        this.accumulatedScore = 0;
    }
    randomizeDealer()
    {
        this.currentTrump = "hearts";
        this.currentTrick = new Trick(this.numPlayers,this.currentTrump);
        
        this.currentPlayerIndex = this.numPlayers-1;
        this.currentTrickStarterIndex = this.numPlayers-1;
    }

    setDogSize(n)
    {
        this.dogsize = n;
        this.dogHand = this.dogHand.slice(0,n);
        console.log("dogsize set to "+this.dogHand.length);
    }
    setMultiplier(stringInt)
    {
        this.multiplier = Number(stringInt);
        console.log("Multiplier set to: "+stringInt);
        
        let dogsize = 2;
        switch (this.multiplier) {
            case 1:
                dogsize = 3;
                break;
            case 3: 
                dogsize = 1;
                break;
            case 4:
                dogsize = 0;
                break;
            default:
                dogsize = 2;
                break;
        }
        this.setDogSize(dogsize);
    }



    newRound()
    {
        this.players.forEach(p => {
            p.tricksWon = 0;
        });
        this.isRoundFinished = false;
        this.roundCount++;
        this.currentRound = new Round();      
        this.initializeDeck();
        this.dealCards();
        this.randomizeDealer();  
    }

    setTrump(trump)
    {
        this.currentTrump = trump;        
        this.currentTrick = new Trick(this.numPlayers,this.currentTrump);
        console.log(`Model: trump set to ${trump}`)
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

    calculateRoundScore()
    {

        const [attack,defense] = this.getAttackDefenseTricks();
        const playerWon = attack>defense;


        //todo add extra bonus if over 6 tricks
        const totaltricks = attack+defense;
        const halftricks = Math.ceil(totaltricks/2);
        const extratricks = Math.max(attack,defense)-halftricks;
        const basicScore = (playerWon?1:-1)*this.multiplier*(2+extratricks);
        //todo, the view of results should have base + extra tricks bonus
        let bonusScore = 0;
        const roundScore = basicScore+bonusScore;
        this.accumulatedScore += roundScore;
        this.resultReport = new ResultDTO(attack,attack+defense,extratricks,this.multiplier,basicScore,[],roundScore,this.accumulatedScore,this.roundCount,100);
    }

    completeTrick() //called by controller
    {
        const winCard = this.calculateTrickWinner();
        console.log(winCard);
        console.log(winCard.ownerIndex);
        console.log(this.players[winCard.ownerIndex]);
        this.players[winCard.ownerIndex].tricksWon++;
        this.currentTrick.clear();
        //TODO select new starter
        
        //check for end of round
        if(this.players[0].hand.length==0)
        {
            this.isRoundFinished = true;
            this.calculateRoundScore();
        }
        else
        {
            this.currentPlayerIndex = winCard.ownerIndex;
            this.currentTrickStarterIndex = winCard.ownerIndex;

        }
        return winCard.ownerIndex;

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
        const dogSize = 3;

        //make hand size even so there is always a winner
        let  handsize = Math.floor((this.deck.length - dogSize) / this.numPlayers );
        if(handsize%2==0)
            handsize-=1;

        //handsize = 3;
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
        //set dog cards as owned by the player to prevent bugs
        this.dogHand.forEach(c=>{c.ownerIndex = 0});
        this.deck = this.deck.slice(4);

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
    //  this.isAi = true;
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
