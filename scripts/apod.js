window.addEventListener("load", getAPOD);
window.addEventListener("load", setMode);

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = localStorage.getItem("mode");
var dailyPicExp = document.getElementById("dailyDesc");
var dailyPicTitle = document.getElementById("dailyTitle");
var dailyPicContent = document.getElementById("apodContent");

function getAPOD() {
    fetch("https://api.nasa.gov/planetary/apod?api_key=Z9vNJRtaCbaIrzOk6PAROFfpbFvdTlpW0k59SRhL").then(function(response) {
        //fetch("https://api.nasa.gov/planetary/apod?date=2021-04-11&api_key=Z9vNJRtaCbaIrzOk6PAROFfpbFvdTlpW0k59SRhL").then(function(response) { //Video apod testing URL
        return response.json();
    }).then(function(apod) {

        if (apod.media_type === "video") {
            dailyPicContent.innerHTML =
                `
                <div class="vidContainer">
                    <iframe class="resIFrame"
                        src=${apod.url}
                        title=${apod.title} allow="accelerometer;
                        clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                    </iframe>
                </div>
            `
        } else {
            dailyPicContent.innerHTML =
                `
                <picture>
                    <img src=${apod.url} alt="${apod.title}"
                    srcset=${apod.url}>
                </picture>
                <figcaption>${apod.title}</figcaption>
            `
        }

        dailyPicExp.innerText = apod.explanation;
        dailyPicTitle.innerText = apod.title;

    }).catch(function(error) {
        dailyPicContent.innerHTML =
            `
                <picture>
                    <img id="dailyPic" src="images/fallback/spacewalk1x.jpg" alt="Lonely astronaut on spacewalk"
                    srcset="images/fallback/spacewalk1x.jpg, images/fallback/spacewalk2x.jpg 2x, images/fallback/spacewalk3x.jpg 3x, images/fallback/spacewalk4x.jpg 4x">
                </picture>
                <figcaption><strong>Error retrieving Astronomical Picture of the Day: Check network connection!</strong></figcaption>
            `
        dailyPicExp.innerText = "Error retrieving picture description: Check network connection!";
        dailyPicTitle.innerText = "Error retrieving title: Check network connection!";

        console.log(`Error - ${error}`);
    });
}

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