let activityList = JSON.parse(localStorage.getItem("activity-list")) || []

saveNewActivity = () => {
    let newActivity = $("#activity-input").val().trim()
    if (newActivity ===""){
        $("#modal-error").text("activity cannot be blank")
    }else if(activityList.indexOf(newActivity) === -1) {
        activityList.push(newActivity)
        localStorage.setItem("activity-list", JSON.stringify(activityList))
        generateActivities()
        $("#activity-input").val("")
    }else{
        $("#modal-error").text("you have already added this activity")
    }
}

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