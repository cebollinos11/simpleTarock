// controller.js

import * as _model from './model.js';
import * as _view from './view.js';


function tradeWithDog(index) {
    const card = game.tradeCardFromPlayerToDog(index);
    _view.renderDog(game.getDogHand(), tradeWithHand, card);
    _view.renderPlayerHand(game.getPlayerHand(), tradeWithDog);
}

function tradeWithHand(index) {
    const card = game.tradeCardFromDogToPlayer(index);
    _view.renderDog(game.getDogHand(), tradeWithHand);
    _view.renderPlayerHand(game.getPlayerHand(), tradeWithDog, card);
}


const game = new _model.CardGame(4);
game.initializeDeck();
game.dealCards();
// Initial render
//_model.initializeDeck();
//_model.dealCards();
game.randomizeDealer();

let waitingForPlayer = false;
while(waitingForPlayer==false)
    {
        waitingForPlayer = game.givePriority();
    }
_view.renderPlayerHand(game.getPlayerHand(), tradeWithDog);
_view.renderDog(game.getDogHand(), tradeWithHand);


