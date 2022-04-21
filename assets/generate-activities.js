//set a variable to the array of activities from local storage or an empty array if local storage is empty
let activityList = JSON.parse(localStorage.getItem("activity-list")) || []
 

if (activityList === []) {
    //if there are no activities in local storage set the text to alert the user
    $("#chosen-activities").text("You have not added any activities yet!")
} else {
    //otherwise make sure the html container is empty
    $("#chosen-activities").empty()
    //before looping over the activity array
    activityList.map(activity => {
        //for each activity create a card, input, and label
        let card = $('<div class="activity-check"></div>`')
        let checkbox = $('<input type="checkbox" checked class="include-activity"/>').val(activity)
        let body = $('<label></label>').text(activity)
        //append the checkbox and label to the card and the card to the containter in the html
        card.append(checkbox, body)
        card.appendTo($("#chosen-activities"))
    })
}

doNotIncludeEvent = () => {
    //create an array to hold all the currently checked activities
    let currentList = []
    //for each checkbox
    $("input[type=checkbox]").each(function () {
        //if the input is currently 'checked'
        if (this.checked === true) {
            //add the value of the input to the currentArray 
            currentList.push($(this).val())
        }
    })
    //return the current activities checked array
    return currentList
}
//chooses a random activity
generateDecision = (activities) => {
    //generates a random number between 0 and the length of the given array
    let num = Math.floor(Math.random() * activities.length)
    //sets the text of an html element to the activity at the index of the random number
    $("#your-activity").text(activities[num])
}
//listens to the generate button on the html
$("#generate-decision").on("click", async e => {
    //when clicked prevent the page from reloading
    e.preventDefault();
    //declares a variable to hold the currently checked activies that is returned from doNotIncludeEvent
    let activityArr = await doNotIncludeEvent()
    //if there are less that 2 activities in the array
    if (activityArr.length < 2) {
        //reveal the modal and set the text to inform user of error
        $("#modal").removeClass("hide")
        $("#modal-message").text("Must choose at least two activities!!")
    } else {
        //otherwise call function to generate a random activity
        generateDecision(activityArr)
    }
})
//listens to the X button on the modal 
$("#modal-btn").click(e => {
    //on click prevents default browser functionality
    e.preventDefault();
    //and hides the modal
    $("#modal").addClass("hide")
})

