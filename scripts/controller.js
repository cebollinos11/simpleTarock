// controller.js

import * as _model from './model.js';
import * as _view from './view.js';

const _DELAY_MID = 500;


function tradeWithDog(index) {
    const card = game.tradeCardFromPlayerToDog(index);
    _view.renderDog(game.getDogHand(), tradeWithHand, card,game.dogsize);
    _view.renderPlayerHand(game.getPlayerHand(), tradeWithDog,null,game.getPlayerHand());
}

function tradeWithHand(index) {
    const card = game.tradeCardFromDogToPlayer(index);
    _view.renderDog(game.getDogHand(), tradeWithHand,null,game.dogsize);
    _view.renderPlayerHand(game.getPlayerHand(), tradeWithDog, card,game.getPlayerHand());
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


//new round
function newRound()
{
    game.newRound();
    //show hand
    _view.renderPlayerHand(game.getPlayerHand(),null);

    //as for contract
    _view.showChooseContract(callbackContract,game.roundCount);
    //handle dog
    
    //ask for pick trump
    
    //_view.showChooseTrump(callbackChosenTrump);
}    

function callbackContract(selectedContract)
{
    console.log(selectedContract);
    //if pass show scores and restart round
    if(selectedContract == "pass")
    {
        newRound();
        return;
    }
    
    //set multiplier
    game.setMultiplier(selectedContract);

    if(game.dogsize == 0)
    {//skip dog
        dogConfirmCallback()
    }
    {
        //show dog
        _view.setDogConfirmCallback(dogConfirmCallback);
        _view.renderDog(game.getDogHand(),tradeWithHand,null,game.dogsize);
        _view.renderPlayerHand(game.getPlayerHand(),tradeWithDog,null,game.getPlayerHand());
    }

}

function dogConfirmCallback()
{
    _view.showChooseTrump(callbackChosenTrump);
}

function callbackChosenTrump(trump)
{
    game.setTrump(trump);

    //ask for bonus
    _view.showBonusMenu(callbackBonusMenu)
}

async function callbackBonusMenu(listOfBonus)
{
    console.log(listOfBonus)
    await ExecuteGameLoop();
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
// _view.renderPlayerHand(game.getPlayerHand(), playToTrick);
// _view.renderDog(game.getDogHand(), tradeWithHand);
newRound();

