
const suitOrder = {
    'clubs': 0,
    'diamonds': 1,
    'hearts': 2,
    'spades': 3
  };

const rankOrder = {
    'A':1,
    '2':2,
    '3':3,
    '4':4,
    '5':5,
    '6':6,
    '7':7,
    '8':8,
    '9':9,
    '10':10,
    'J':11,
    'Q':12,
    'K':13,
}

export const suitImage = {
    "spades":   { symbol: "♠", color: "black" , imageCode:'S' },
    "hearts":   { symbol: "♥", color: "red", imageCode:'H'},
    "diamonds": { symbol: "♦", color: "red", imageCode:'D'},
    "clubs":    { symbol: "♣", color: "black" , imageCode:'C'} 
};


 export function sortCardsBySuit(cards) {
    return cards.sort((a, b) => {
      return suitOrder[a.suit]*100+rankOrder[a.rank] - suitOrder[b.suit]*100-rankOrder[b.rank];
    });
  }
  function cardValue(card,trumpsuit) {

    if (card.suit == trumpsuit) {
        return 100 + trumps.indexOf(card.rank);  // Trumps have higher base value
    }
    return rankOrder[card.rank];
}
  export function highestCard(cards,trumpsuite) {
    if (cards.length === 0) {
        throw new Error("No cards in the trick.");
    }

    const leadingSuit = cards[0].suit;
    let winningCard = cards[0];
    
    for (let i = 1; i < cards.length; i++) {
        if (cards[i].suit === trumpsuite) {
            if (winningCard.suit !== trumpsuite || cardValue(cards[i]) > cardValue(winningCard)) {
                winningCard = cards[i];
            }
        } else if (cards[i].suit === leadingSuit) {
            if (winningCard.suit !== trumpsuite && cardValue(cards[i]) > cardValue(winningCard)) {
                winningCard = cards[i];
            }
        }
    }
    return winningCard;
}
