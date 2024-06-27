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

function playToTrick(index)
{
    game.playCard(game.getPlayerHand()[index]);
}


const game = new _model.CardGame(4);
game.initializeDeck();
game.dealCards();
// Initial render
//_model.initializeDeck();
//_model.dealCards();
game.randomizeDealer();

let waitingForPlayer = false;
while(waitingForPlayer)
    {
        waitingForPlayer = game.givePriority();
        //render trick
        if(waitingForPlayer == true)
            {
                //enable the view so user can pick a card
                _view.renderPlayerHand(game.getPlayerHand(), playToTrick);
                
            }
        else
            {
                //show trick because AI played
                _view.renderTrick(game.currentTrick,game.currentTrickStarterIndex);
            }
    }

console.log("n");
// _view.renderPlayerHand(game.getPlayerHand(), playToTrick);
// _view.renderDog(game.getDogHand(), tradeWithHand);


