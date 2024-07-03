class Trick
{

    firstCard = null;
    lastCardPlayed = null;
    constructor(numPlayers)
    {
        this.cards = []
        for (let index = 0; index < numPlayers; index++) {
            this.cards.push(null);            
        }
        
    }

    playCard(card,playerIndex)
    {
        this.cards[playerIndex] = card;
        if(this.getCardsPlayed() == 1)
            {
                this.firstCard = card;
            }
        this.lastCardPlayed = card;
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
}

export {Trick};