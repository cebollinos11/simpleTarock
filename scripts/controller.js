// controller.js

import * as _model from './model.js';
import * as _view from './view.js';


function tradeWithDog(index) {
    const card = _model.tradeCardFromPlayerToDog(index);
    _view.renderDog(_model.getDogHand(), tradeWithHand, card);
    _view.renderPlayerHand(_model.getPlayerHand(), tradeWithDog);
}

function tradeWithHand(index) {
    const card = _model.tradeCardFromDogToPlayer(index);
    _view.renderDog(_model.getDogHand(), tradeWithHand);
    _view.renderPlayerHand(_model.getPlayerHand(), tradeWithDog, card);
}


// Initial render
_model.initializeDeck();
_model.dealCards();
_view.renderPlayerHand(_model.getPlayerHand(), tradeWithDog);
_view.renderDog(_model.getDogHand(), tradeWithHand);
