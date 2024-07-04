class Trick
{

    firstCard = null;
    lastCardPlayed = null;
    highestTrump = -1;
    constructor(numPlayers,trumpSuit)
    {
        this.highestTrump = -1;
        this.cards = []
        for (let index = 0; index < numPlayers; index++) {
            this.cards.push(null);            
        }
        this.trumpSuit = trumpSuit;
        
    }

    playCard(card,playerIndex)
    {
        this.cards[playerIndex] = card;
        if(this.getCardsPlayed() == 1)
            {
                this.firstCard = card;
            }
        this.lastCardPlayed = card;
        if(card.suit === this.trumpSuit)
            {
                this.highestTrump = Math.max(this.highestTrump,card.rank);
            }
    }

    clear()
    {
        for (let index = 0; index < this.cards.length; index++) {
            this.cards[index] = null;
            
        }
    }
    getCardsPlayed()
    {
        let totalCards = 0;
        this.cards.forEach(c => {
            if(c!=null)
                {
                    totalCards++;
                }
        });

        return totalCards;
    }

    getLegalCards(cardsInHand) {
        let legalCards = [];

        if (this.getCardsPlayed() == 0) {
            // If no cards have been played yet in this trick, all cards in hand are legal.
            return cardsInHand;
        }

        let firstCardSuit = this.firstCard.suit;

        // Check if the player has a card of the same suit as the first card played.
        let hasSameSuit = cardsInHand.some(card => card.suit === firstCardSuit);

        if (hasSameSuit) {
            // If the player has a card of the same suit, they must play one of those cards.
            legalCards = cardsInHand.filter(card => card.suit === firstCardSuit);
        } else {
            // If the player does not have a card of the same suit, check for trump suit.
            let hasTrumpSuit = cardsInHand.some(card => card.suit === this.trumpSuit);
            if (hasTrumpSuit) {
                // If the player has a card of the trump suit, they must play one of those cards.
                legalCards = cardsInHand.filter(card => card.suit === this.trumpSuit && (card.rank > this.highestTrump.rank));
                // If no higher trump cards are available, all trump cards are legal.
                if (legalCards.length === 0) {
                    legalCards = cardsInHand.filter(card => card.suit === this.trumpSuit);
                }
            } else {
                // If the player does not have a card of the same suit or the trump suit, they may play any card.
                legalCards = cardsInHand;
            }
        }

        return legalCards;
    }
}

export {Trick};