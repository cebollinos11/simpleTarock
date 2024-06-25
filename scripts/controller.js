// controller.js

import * as _model from './model.js';

import {
    renderPlayerHand,
    renderDog
} from './view.js';


function tradeWithDog(index) {
    const card = _model.tradeCardFromPlayerToDog(index);
    renderDog(_model.getDogHand(), tradeWithHand, card);
    renderPlayerHand(_model.getPlayerHand(), tradeWithDog);
}

function tradeWithHand(index) {
    const card = _model.tradeCardFromDogToPlayer(index);
    renderDog(_model.getDogHand(), tradeWithHand);
    renderPlayerHand(_model.getPlayerHand(), tradeWithDog, card);
}


// Initial render
_model.initializeDeck();
_model.dealCards();
renderPlayerHand(_model.getPlayerHand(), tradeWithDog);
renderDog(_model.getDogHand(), tradeWithHand);
