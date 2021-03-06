window.addEventListener("load", setMode);

const btnNightToggle = document.getElementById("nightToggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = localStorage.getItem("mode");

function setMode() {
    if (currentTheme != null) {
        if (currentTheme == "night") {
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

btnNightToggle.addEventListener("click", toggleMode);

function toggleMode() {
    if (currentTheme == "night") {
        localStorage.setItem("mode", "day");

    } else {
        localStorage.setItem("mode", "night");

    }
    document.body.classList.toggle("night-mode");
    console.log(prefersDarkScheme)
}