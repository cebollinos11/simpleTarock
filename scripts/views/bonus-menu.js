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
    handleCheckedOptions(checkedOptions);
});

function handleCheckedOptions(options) {
    // This function will receive the list of checked options
    console.log('Checked options:', options);
    // Perform any other actions with the checked options here
}