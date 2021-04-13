window.addEventListener("load", setMode);

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = localStorage.getItem("mode");

function setMode() {
    if (currentTheme != null) {
        if (currentTheme === "night") {
        document.body.classList.toggle("night-mode");
        }
    }
    else {
        if (prefersDarkScheme.matches) {
            document.body.classList.toggle("night-mode");
            localStorage.setItem("mode", "night");
        }
        else {
            localStorage.setItem("mode", "day");
        }
    }
}