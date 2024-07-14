import * as cardUtils from "../card-utils.js";

let parent = null;
let callback = null;  
let dogCardsElement = null;
let confirmbutton = null;
export function init()
{
    parent = document.getElementById("dog-parent");
    dogCardsElement = document.getElementById('dog-hand');
    confirmbutton = document.getElementById('confirm-dog');
    confirmbutton.addEventListener('click', function() {
    parent.style.visibility = "hidden"; 
    callback();
    
});
}
export function setCallback(newcallback)
{
    console.log(newcallback);
    parent.style.visibility = "visible";
    callback = newcallback;

}

export function renderDog(dogHand, tradeWithHand, lastUpdated = null, dogsize) {
    
    console.log(dogsize);   
    dogCardsElement.innerHTML = '';
    parent.style.visibility = "visible";
    dogHand.forEach((card, index) => {
        const cardElement = cardUtils.renderCard(card);
        if (lastUpdated === card) {
            cardElement.classList.add('animate-bottom');
        }
        cardElement.addEventListener('click', () => tradeWithHand(index));
        dogCardsElement.appendChild(cardElement);
    });

    if (dogHand.length < 4) {
        for (let i = 0; i < dogsize - dogHand.length; i++) {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            dogCardsElement.appendChild(cardElement);
        }
    }

    if (dogsize === dogHand.length) {
        confirmbutton.disabled = false;
    }
    else
    {
        confirmbutton.disabled = true;
    }
}
