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
    _view,_view.renderPlayerHand(game.getPlayerHand(),null,null,[]);
    _view.renderTrick(game.currentTrick.cards,game.currentTrick.lastCardPlayed);
    await delay(_DELAY_MID);
    await ExecuteGameLoop();
}

const nPlayers = 4
const game = new _model.CardGame(nPlayers);
_view.initialize(nPlayers);
game.initializeDeck();
game.dealCards();
game.randomizeDealer();

//ask for pick trump
_view.showChooseTrump(callbackChosenTrump);

function callbackChosenTrump(trump)
{
    console.log("start");
    console.log(trump);
    console.log("end");
    game.setTrump(trump);
}


async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function gameloop() {
    let escapeLoop = false

    //todo, this is wrong
    while (game.isRoundFinished == false) { // Continue the loop until the round is over
        
        if(escapeLoop)
            break;
        while (game.currentTrick.getCardsPlayed()   < 4) {
            let waitingForPlayer = game.givePriority();

            if (waitingForPlayer) {
                // Enable the view so user can pick a card
                _view.renderPlayerHand(game.getPlayerHand(), playToTrick, null, game.currentTrick.getLegalCards(game.getPlayerHand())   );
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
            await delay(_DELAY_MID);
            const winnerID = game.completeTrick(); // Handle end of trick (e.g., determine winner, collect cards)
            _view.animateTrickTaker(winnerID);
            await delay(_DELAY_MID);
            await delay(_DELAY_MID);
            const [attack,defense] = game.getAttackDefenseTricks();
            _view.renderTrickStatus(attack,defense);
            await delay(_DELAY_MID);
            await delay(_DELAY_MID);
            _view.renderTrick(game.currentTrick.cards,game.currentTrick.lastCardPlayed);

        }
    }

    // Handle end of round logic here, like scoring and starting a new round
    _view.showRoundScores();

}

async function ExecuteGameLoop()
{
    await gameloop()
}
await ExecuteGameLoop();
// _view.renderPlayerHand(game.getPlayerHand(), playToTrick);
// _view.renderDog(game.getDogHand(), tradeWithHand);


