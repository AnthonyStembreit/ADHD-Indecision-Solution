let activityList = JSON.parse(localStorage.getItem("activity-list")) || []

if (activityList === []) {
    $("#chosen-activities").text("You have not added any activities yet!")
} else {
    $("#chosen-activities").empty()
    activityList.map(activity => {
        console.log(activity)
        let card = $('<div class="activity-check"></div>`')
        let checkbox = $('<input type="checkbox" checked class="include-activity"/>').val(activity)
        let body = $('<label></label>').text(activity)
        card.append(checkbox, body)
        card.appendTo($("#chosen-activities"))
    })
}

doNotIncludeEvent = () => {
    let currentList = []
    $("input[type=checkbox]").each(function () {
        if (this.checked === true) {
            currentList.push($(this).val())
        }
    })
    return currentList
}

generateDecision = (activities) => {
    let num = Math.floor(Math.random() * activities.length)
    $("#your-activity").text(activities[num])
}

$("#generate-decision").on("click", async e => {
    e.preventDefault();
    let activityArr = await doNotIncludeEvent()
    if (activityArr.length < 1) {
        $("#modal-error").text("must choose at least two activitys")
    } else {
        generateDecision(activityArr)
    }
})

