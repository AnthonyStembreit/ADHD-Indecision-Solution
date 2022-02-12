let activityList = JSON.parse(localStorage.getItem("activity-list")) || []

saveNewActivity = () => {
    let newActivity = $("#activity-input").val().trim()
    newActivity = newActivity.charAt(0).toUpperCase() + newActivity.slice(1 , newActivity.length)
    if (newActivity ===""){
        $("#modal").removeClass("hide")
        $("#modal-message").text("Activity cannot be blank!!")
    }else if(activityList.indexOf(newActivity) === -1) {
        activityList.push(newActivity)
        localStorage.setItem("activity-list", JSON.stringify(activityList))
        generateActivities()
        $("#activity-input").val("")
    }else{
        $("#modal").removeClass("hide")
        $("#modal-message").text("You have already added this activity!!")
    }
}
$("#modal-btn").click(e => {
    e.preventDefault();
    $("#modal").addClass("hide")
})
generateActivities = () => {
    $("#current-activities").empty()
    activityList.map(activity => {
        let card = $('<div class="activity-card"></div>`')
        let body = $('<p></p>').text(activity)
        let btn = $('<button class="delete-activity-btn">Delete</button>').val(activity)
        btn.on("click", e => {
            e.preventDefault();
            removeActivity(e.target.value)
        })
        card.append(body, btn)
        card.appendTo($("#current-activities"))
    })
}

removeActivity = (deleted) => {
    activityList = activityList.filter(activity => activity !== deleted)
    localStorage.setItem("activity-list", JSON.stringify(activityList))
    generateActivities()
}

generateActivities()
$("#add-activity").on("click", e => {
    e.preventDefault();
    saveNewActivity()
})