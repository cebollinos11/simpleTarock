// controller.js

import * as _model from './model.js';
import * as _view from './view.js';

const _DELAY_MID = 1000


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

async function playToTrick(index)
{
    game.playCard(game.getPlayerHand()[index]);
    _view,_view.renderPlayerHand(game.getPlayerHand());
    _view.renderTrick(game.currentTrick,game.currentTrickStarterIndex);
    await delay(_DELAY_MID);
    await gameloop();
}

const nPlayers = 4
const game = new _model.CardGame(nPlayers);
_view.initialize(nPlayers);
game.initializeDeck();
game.dealCards();
// Initial render
//_model.initializeDeck();
//_model.dealCards();
game.randomizeDealer();

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function gameloop()
{
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
                    await delay(_DELAY_MID);
                }
        }  
    
}
await gameloop();
// _view.renderPlayerHand(game.getPlayerHand(), playToTrick);
// _view.renderDog(game.getDogHand(), tradeWithHand);


