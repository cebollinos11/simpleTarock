
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

export function sortHand()
{
    console.log("yo");
}