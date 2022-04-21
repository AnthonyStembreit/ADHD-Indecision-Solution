//set a variable to the array of activities from local storage or an empty array if local storage is empty
let activityList = JSON.parse(localStorage.getItem("activity-list")) || []

saveNewActivity = () => {
    //grabs the value of the html input for a new activity
    let newActivity = $("#activity-input").val().trim()
    //cpatalizes the first letter of that word
    newActivity = newActivity.charAt(0).toUpperCase() + newActivity.slice(1, newActivity.length)
    //reveals an error modal if there is no text from the input
    if (newActivity === "") {
        $("#modal").removeClass("hide")
        //sets the text of the error modal to communicate to the user how to correct the error
        $("#modal-message").text("Activity cannot be blank!!")
        //checks to see if the activity is already in the array of activities
    } else if (activityList.indexOf(newActivity) === -1) {
        //if it is not adds the new activity to the array
        activityList.push(newActivity)
        //updates the array in local storage
        localStorage.setItem("activity-list", JSON.stringify(activityList))
        //calls the function to display the updated array of activities
        generateActivities()
        //resets the inputs value to blank
        $("#activity-input").val("")
    } else {
        //other wise the activity is in the array already 
        //so we reveal the error modal 
        $("#modal").removeClass("hide")
        //setting the text to alert the user 
        $("#modal-message").text("You have already added this activity!!")
    }
}
//listens to the X out button on the modal
$("#modal-btn").click(e => {
    e.preventDefault();
    //hides the modal once the user has clicked the X button
    $("#modal").addClass("hide")
})

//displays the activities in the html
generateActivities = () => {
    //removes all html elements from the container 
    $("#current-activities").empty()
    //loops over the array of activities and does something for each activity
    activityList.map(activity => {
        //in this case it creates a card, body, and button
        let card = $('<div class="activity-card"></div>`')
        let body = $('<p></p>').text(activity) 
        let btn = $('<button class="delete-activity-btn">Delete</button>').val(activity)
        //adds an event listener to the dynamically created button
        btn.on("click", e => {
            e.preventDefault();
            //on click removes the activity from the array
            removeActivity(e.target.value)
        })
        //appends the body and button to the card and the card to the container in the html
        card.append(body, btn)
        card.appendTo($("#current-activities"))
    })
}
//removes an activity from the array
removeActivity = (deleted) => {
    //filters the array to removed the activity the user chose to delete
    activityList = activityList.filter(activity => activity !== deleted)
    //updates the array in local storage
    localStorage.setItem("activity-list", JSON.stringify(activityList))
    //displays the updated array of activities
    generateActivities()
}
//displays the array of activities on page load
generateActivities()
//when the add button is clicked
$("#add-activity").on("click", e => {
    e.preventDefault();
    //call the function to save the new activity
    saveNewActivity()
})