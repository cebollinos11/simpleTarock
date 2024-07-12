let parent = null
let callback = null;  



export function init()
{
    parent = document.getElementById("choose-bonus");

    document.getElementById('start-playing').addEventListener('click', function() {
    
    
    // Get all checkboxes inside the 'choose-bonus' div
    const checkboxes = document.querySelectorAll('#choose-bonus input[type="checkbox"]');
    // Initialize an array to hold the names of checked options
    const checkedOptions = [];
    // Iterate through each checkbox
    checkboxes.forEach(function(checkbox) {
        // If the checkbox is checked, add its name to the checkedOptions array
        if (checkbox.checked) {
            checkedOptions.push(checkbox.name);
        }
    });
    // Call the function with the list of checked options
    callback(checkedOptions);
    parent.style.visibility = "hidden";
    
});
}
export function setCallback(newcallback)
{
    console.log("setting bonus callback");
    console.log(newcallback);
    parent.style.visibility = "visible";
    callback = newcallback;

}