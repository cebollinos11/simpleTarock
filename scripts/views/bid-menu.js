let parent = null
let callback = null;  

export function init(roundCount)
{
    createBidPanel("game-board",roundCount);
    parent = document.getElementById("bid");
    const buttons = document.querySelectorAll("#bid  button");


    // Add click event listener to each button
    buttons.forEach(button => {
      button.addEventListener("click", function() {
        // Get the suit from the data-suit attribute
        const bid = button.getAttribute("data-bid");
        // Print the suit to the console
        parent.style.visibility = "hidden";
        callback(bid);
      });
    });
}

export function setCallback(newcallback)
{
    parent.style.visibility = "visible";
    callback = newcallback;
}

function createBidPanel(parentId, roundCount) {
    // Check if the parent element exists
    const parentElement = document.getElementById(parentId);
    if (!parentElement) {
        console.error(`Parent element with ID '${parentId}' not found.`);
        return;
    }

    //delete previous
    const prevBid = document.getElementById("bid");

    if(prevBid!=null)
    {
        prevBid.remove();

    }
    // Create the main container div
    const bidPanel = document.createElement('div');
    bidPanel.id = 'bid';
    bidPanel.className = 'trump-panel';
    
    // Create and append the 'Select Contract' paragraph
    const selectContract = document.createElement('p');
    selectContract.textContent = 'Select Contract for Round '+roundCount;
    bidPanel.appendChild(selectContract);
    
    // Array of bid options
    const bids = [
        { bid: '3', text: 'Help 3', multiplier: 'x1' },
        { bid: '2', text: 'Help 2', multiplier: 'x2' },
        { bid: '1', text: 'Help 1', multiplier: 'x3' },
        { bid: '0', text: 'No help', multiplier: 'x4' },
        { bid: 'pass', text: 'Deal again', multiplier: 'Penalization x1' }
    ];
    
    // Create and append each bid option div
    bids.forEach(option => {
        const div = document.createElement('div');
        
        const button = document.createElement('button');
        button.setAttribute('data-bid', option.bid);
        button.textContent = option.text;
        div.appendChild(button);
        
        const p = document.createElement('p');
        p.textContent = `Score multiplier ${option.multiplier}`;
        div.appendChild(p);
        
        bidPanel.appendChild(div);
    });
    
    // Append the bid panel to the specified parent element
    parentElement.appendChild(bidPanel);
}


// Example usage
// createBidPanel('parent-container-id'); // Replace 'parent-container-id' with the ID of the parent element
