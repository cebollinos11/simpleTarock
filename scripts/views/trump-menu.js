let parent = null
let callback = null;  

export function init()
{
  const buttons = document.querySelectorAll("#choose-trump  button");
    parent = document.getElementById("choose-trump");
    console.log("set parent");
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
}

export function setCallback(newcallback)
{
    console.log("use parent");
    parent.style.visibility = "visible";
    callback = newcallback;
}