window.addEventListener("load", setMode);
window.addEventListener("load", maxDate);

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = localStorage.getItem("mode");
const geoOutputTxt = document.getElementById("geoOutput");
const landsatImage = document.getElementById("landsatImg");
const getLandsatDate = document.getElementById("landsatDate");
const getZoomLevel = document.getElementById("zoomSelect");
const dateForm = document.getElementById("landsatDateForm");

dateForm.addEventListener("submit", getLandsat);

function maxDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //Remember January == 0
    var yyyy = today.getFullYear();

    //Build today's correct string format
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;
    getLandsatDate.setAttribute("max", today);
    getLandsatDate.setAttribute("value", today);
}

function getLandsat(event) {
    event.preventDefault();
    if (!navigator.geolocation) {
        geoOutputTxt.innerHTML = "The geolocation feature is not available in your browser.";
    } else {
        geoOutputTxt.innerHTML = "Attempting to locate you&hellip;";
        //console.log(getLandsatDate.value);
        navigator.geolocation.getCurrentPosition(gotPosition, gotError);
    }
}

function gotPosition(position) {
    if (position == null) {
        console.log("Null position.");
        return;
    }
    //console.log(position);
    //Format numbers into readable standard formats
    var numFormat = new Intl.NumberFormat('en-UK', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    fetch(`https://api.nasa.gov/planetary/earth/assets?lon=${position.coords.longitude}&lat=${position.coords.latitude}&date=${getLandsatDate.value}&dim=${getZoomLevel.value}&api_key=Z9vNJRtaCbaIrzOk6PAROFfpbFvdTlpW0k59SRhL`).then(function(response) {
        return response.json();
    }).then(function(landSatDetails) {

        geoOutputTxt.innerHTML = `<p>Retrieved Landsat 8 picture for location: (${numFormat.format(position.coords.latitude)} 
							latitude, ${numFormat.format(position.coords.longitude)} longitude), to within ${numFormat.format(position.coords.accuracy)}m.</p>`;
        landsatImage.src = landSatDetails.url
        landsatImage.srcset = landSatDetails.url
        landsatImage.alt = "An image of the landsat photograph."

    }).catch(function(error) {
        geoOutputTxt.innerHTML = "<strong>Error retrieving Landsat 8 image: Check network connection!</strong>";
        landsatImage.src = "images/fallback/spacewalk1x.jpg";
        landsatImage.srcset = "images/fallback/spacewalk1x.jpg";
        landsatImage.alt = "Lonely astronaut on spacewalk";
        console.log(`Error - ${error}`);
    });
}

function gotError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            geoOutput.innerHTML = "You have declined permission to use GPS location data.";
            break;
        case error.POSITION_UNAVAILABLE:
            geoOutput.innerHTML = "Unable to determine your position using GPS location.";
            break;
        case error.TIMEOUT:
            geoOutput.innerHTML = "Unable to determine your position using GPS location in time.";
            break;
        case error.UNKNOWN_ERROR:
            geoOutput.innerHTML = "An unknown error occurred when using GPS location.";
            break;
    }
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