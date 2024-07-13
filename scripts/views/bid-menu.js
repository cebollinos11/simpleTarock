let parent = null
let callback = null;  

export function init()
{
  const buttons = document.querySelectorAll("#bid  button");
    parent = document.getElementById("bid");
    console.log("set parent");
    // Add click event listener to each button
    buttons.forEach(button => {
      button.addEventListener("click", function() {
        // Get the suit from the data-suit attribute
        const bid = button.getAttribute("data-bid");
        // Print the suit to the console
        console.log(`Selected bid: ${bid}`);

        parent.style.visibility="hidden";
        callback(bid);
      });
    });
}

export function setCallback(newcallback)
{
    console.log("use parent");
    parent.style.visibility = "visible";
    callback = newcallback;
}