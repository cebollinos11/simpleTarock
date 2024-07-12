document.addEventListener("DOMContentLoaded", function() {
    // Get all the buttons inside the trump-panel
    const buttons = document.querySelectorAll("#choose-trump  button");
    const parent = document.getElementById("choose-trump");
    // Add click event listener to each button
    buttons.forEach(button => {
      button.addEventListener("click", function() {
        // Get the suit from the data-suit attribute
        const suit = button.getAttribute("data-suit");
        // Print the suit to the console
        console.log(`Selected trump suit: ${suit}`);

        parent.style.visibility="hidden";
        callback(suit);
      });
    });
  });

let callback = null;  
export function setCallback(newcallback)
{
    callback = newcallback;
}