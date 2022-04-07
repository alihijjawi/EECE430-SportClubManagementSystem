var SERVER_URL = "http://127.0.0.1:5000";
var errorMessage = document.getElementById("error-message");
var addButton = document.getElementById("add-button");
var resetButton = document.getElementById("reset-button");
addButton.addEventListener("click", addMatch);
resetButton.addEventListener("click", resetInput);

function resetInput() {
    const inputFields = document.querySelectorAll("input");
    for (let i = 0; i < inputFields.length; i++) {
        inputFields[i].value = "";
    }
    errorMessage.innerHTML = "";
    return;
}
function handleResponse(data) {
    errorMessage.innerHTML = data["message"];
    return;
}

function addMatch() {
    const inputFields = document.querySelectorAll("input");
    for (let i = 0; i < inputFields.length; i++) {
        let input = inputFields[i];
        if (input.value.length == 0) {
            errorMessage.innerHTML = "Some details are missing! Please fill in all the fields.";
            return;
        }
    }
    let game_name = document.getElementById("game_name")
    let team1_name = document.getElementById("team1_name")
    let team2_name = document.getElementById("team2_name")
    let timing = document.getElementById("timing")

    const data = {
        "name": game_name.value,
        "timing": timing.value,
        "team_1_id": team1_name.value,
        "team_2_id": team2_name.value
    };
    fetch(`${SERVER_URL}/postmatches`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(dat => handleResponse(dat))
        .catch((error) => {
            console.error('Error:', error);
        });

}


