
let parent = null
let callback = null;  


export function init(data)
{
    console.log(data);
    parent = document.getElementById("result-panel");
    parent.innerHTML = "";
    //fill out content
    const title = document.createElement('p');
    title.innerText = "Results";
    parent.appendChild(title);

    parent.appendChild(simpleTable(data));
    //generate button
    const newDiv = document.createElement('div');
    // Create a new button element
    const newButton = document.createElement('button');
    // Set the button's ID
    newButton.id = 'result-panel-button';
    // Set the button's text content
    newButton.textContent = '!Next Round';
    // Append the button to the new div
    newDiv.appendChild(newButton);
    
    parent.appendChild(newDiv);

    document.getElementById('result-panel-button').addEventListener('click', function() {
    
    
    //butt

    // Call the function with the list of checked options
    callback(checkedOptions);
    parent.style.visibility = "hidden";
    
});
}
export function setCallback(newcallback)
{
    console.log("setting results callback");
    console.log(newcallback);
    parent.style.visibility = "visible";
    callback = newcallback;

}

function simpleTable(resultDTO)
{
    const table = document.createElement('table');

    let generalVibe = (resultDTO.roundsWon *2)>resultDTO.totalRounds ? "good":"bad";

    table.appendChild(generateRow("Tricks won",resultDTO.roundsWon+"/"+resultDTO.totalRounds,generalVibe));
    table.appendChild(generateRow("Multiplier", "x"+resultDTO.multiplier,"empty"));
    table.appendChild(generateRow("Score", resultDTO.roundScore,generalVibe));
    
    if(resultDTO.listOfBonus!=null)
    {
        resultDTO.listOfBonus.forEach(element => {
            table.appendChild(generateRow(element.displayName, (element.success?"":"-") + element.points,element.success?"good":"bad"));

        });

    }
    else
    {
        table.appendChild(generateRow("Bonus", "None","red"));
    }
        
    table.appendChild(generateRow("Round total", resultDTO.totalForThisRound,resultDTO.totalForThisRound>0?"good":"bad"));
    table.appendChild(generateRow("Accumulated Score", resultDTO.accumulatedScore,"empty"));    
    table.classList.add("results-table");
    return table;
}

function generateRow(col1Text, col2Text, className) {
    // Create a new row
    const row = document.createElement('tr');
    
    // Create the first cell
    let cell = document.createElement('td');
    cell.innerText = col1Text;
    cell.classList.add(className); // Add the class to the first cell
    row.appendChild(cell);
    
    // Create the second cell
    cell = document.createElement('td');
    cell.innerText = col2Text;
    cell.classList.add(className); // Add the class to the second cell
    row.appendChild(cell);
    
    // Return the completed row
    return row;
}
