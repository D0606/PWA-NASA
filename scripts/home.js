window.addEventListener("load", setMode);
window.addEventListener("load", checkFormSub);

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = localStorage.getItem("mode");
const surveyForm = document.getElementById("form");
const surveyButton = document.getElementById("survForm");

surveyButton.addEventListener("submit", checkSurvey);

function setMode() {
    if (currentTheme != null) {
        if (currentTheme === "night") {
            document.body.classList.toggle("night-mode");
        }
    } else {
        if (prefersDarkScheme.matches) {
            document.body.classList.toggle("night-mode");
            localStorage.setItem("mode", "night");
        } else {
            localStorage.setItem("mode", "day");
        }
    }
}

function checkFormSub() {
    if (localStorage.getItem("form") !== null) {
        surveyForm.innerHTML = `<p class="centred">Thank you for completing our feedback and suggestions form!</p>`
    }
}

function checkSurvey(event) {
    event.preventDefault();

    const formArray = [];
    formArray[0] = document.getElementById("usrName").value;
    formArray[1] = document.getElementById("usrEmail").value;
    formArray[2] = document.getElementById("suggestions").value;
    formArray[3] = document.getElementById("usrFav").value;
    formArray[4] = document.getElementById("api1").checked;
    formArray[5] = document.getElementById("api2").checked;
    formArray[6] = document.getElementById("api3").checked;
    formArray[7] = document.getElementById("api4").checked;

    localStorage.setItem("form", formArray);

    surveyForm.innerHTML = `<p class="centred">Thank you for completing our feedback and suggestions form!</p>`
}