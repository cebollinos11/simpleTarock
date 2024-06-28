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
    gameloop();
}


const game = new _model.CardGame(4);
game.initializeDeck();
game.dealCards();
// Initial render
//_model.initializeDeck();
//_model.dealCards();
game.randomizeDealer();

function gameloop()
{
    console.log("gameloop enter"); 
    let waitingForPlayer = false;
    while(game.currentTrick.length<4)
        {
            waitingForPlayer = game.givePriority();
            //render trick
            if(waitingForPlayer == true)
                {
                    //enable the view so user can pick a card
                    _view.renderPlayerHand(game.getPlayerHand(), playToTrick);
                    break
                }
            else
                {
                    //show trick because AI played
                    _view.renderTrick(game.currentTrick,game.currentTrickStarterIndex);
                }
        }
    
    
}
gameloop();
console.log("n");
// _view.renderPlayerHand(game.getPlayerHand(), playToTrick);
// _view.renderDog(game.getDogHand(), tradeWithHand);


