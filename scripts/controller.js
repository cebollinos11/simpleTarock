// controller.js

import * as _model from './model.js';
import * as _view from './view.js';

const _DELAY_MID = 500;


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
    _view.renderTrick(game.currentTrick.cards,game.currentTrick.lastCardPlayed);
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

async function gameloop() {
    let escapeLoop = false

    //todo, this is wrong
    while (game.getPlayerHand().length>0) { // Continue the loop until the round is over
        
        if(escapeLoop)
            break;
        while (game.currentTrick.getCardsPlayed()   < 4) {
            let waitingForPlayer = game.givePriority();

            if (waitingForPlayer) {
                // Enable the view so user can pick a card
                _view.renderPlayerHand(game.getPlayerHand(), playToTrick);
                escapeLoop = true;
                break; // Exit the inner loop to wait for player input
            } else {
                // Show trick because AI played
                _view.renderTrick(game.currentTrick.cards,game.currentTrick.lastCardPlayed);
                await delay(_DELAY_MID);
            }
        }

        if (game.currentTrick.getCardsPlayed() === 4) {
            // Trick is complete
            game.completeTrick(); // Handle end of trick (e.g., determine winner, collect cards)
            _view.renderTrick(game.currentTrick.cards,game.currentTrick.lastCardPlayed);

        }
    }

    // Handle end of round logic here, like scoring and starting a new round
}
await gameloop();
// _view.renderPlayerHand(game.getPlayerHand(), playToTrick);
// _view.renderDog(game.getDogHand(), tradeWithHand);


