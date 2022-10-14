onload = function (_) {
    const emailTextBox = document.getElementById("email")
    emailTextBox.oninput = onEmailChange

    const startGameButton = document.getElementById("start-button")
    startGameButton.onclick = onGameStart
    startGameButton.disabled = true
}

function onEmailChange(e) {
    const emailTextBox = document.getElementById("email")
    const startGameButton = document.getElementById("start-button")

    const re = /\\[a-zA-Z]+\[[a-zA-Z]+(\|[a-zA-Z]+)+\]/;
    const email = e.target.value;

    if(email.match(re)) {
        emailTextBox.className = ""
        startGameButton.disabled = false
    }
    else {
        emailTextBox.className = "inputWrong"
        startGameButton.disabled = true
    }
    console.log("onEmailChange", email, email.match(re));
}

function onGameStart() {
    console.log("game start");
    location.href = "main.html";
}