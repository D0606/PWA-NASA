window.addEventListener("load", setMode);
window.addEventListener("load", getToday);

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = localStorage.getItem("mode");
const getTable = document.getElementById("neoTable");
const printBody = document.getElementById("neoTableBody");
const dateBtn = document.getElementById("neoDateButton");
const getDate = document.getElementById("neoDate");
var tableBody = "";

dateBtn.addEventListener("click", getNEO);

function getToday(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //Remember January == 0
    var yyyy = today.getFullYear();

    //Build today's correct string format
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    today = yyyy+'-'+mm+'-'+dd;
    getDate.setAttribute("value", today);
}

function getNEO() {
    //console.log(getDate.value);
    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${getDate.value}&end_date=${getDate.value}&api_key=Z9vNJRtaCbaIrzOk6PAROFfpbFvdTlpW0k59SRhL`).then(function(response) {
        //could also return response.text() 
        return response.json();
    }).then(function(neo) {
        tableBody = ""
        for (let i = 0; i < neo.element_count; i++) {
            let asteroid = neo.near_earth_objects[`${getDate.value}`][i];
            var neoDistance = asteroid.close_approach_data[0].miss_distance.kilometers;
            var neoRelativeV = asteroid.close_approach_data[0].relative_velocity.kilometers_per_second;
            var neoDiameterMin = asteroid.estimated_diameter.meters.estimated_diameter_min;
            var neoDiameterMax = asteroid.estimated_diameter.meters.estimated_diameter_max;
            var neoCloseApproach = asteroid.close_approach_data[0].close_approach_date_full;
            //console.log(neoCloseApproach);

            //Get time section of field only
            var approachTime = neoCloseApproach;
            approachTime = approachTime.split(' ')[1];
            //console.log(approachTime);

            //Format numbers into readable standard formats
            var sizeFormat = new Intl.NumberFormat('en-UK', {
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });

            //Build table body
            tableBody += `<tr><td>${asteroid.id}</td><td>${asteroid.name}</td>
            <td>${sizeFormat.format(neoDiameterMin)} - ${sizeFormat.format(neoDiameterMax)}</td>
            <td>${asteroid.is_potentially_hazardous_asteroid}</td><td>${approachTime}</td>
            <td>${(Math.round(neoRelativeV * 100) / 100).toFixed(2)}</td>
            <td>${sizeFormat.format(neoDistance)}</td>
            <td><a href=${asteroid.nasa_jpl_url} target="_blank" rel="noopener noreferrer">JPL Link</a></td></tr>` //Open in new tab with security to prevent tabnabbing
        }

        printBody.innerHTML = tableBody;

    }).catch(function(error) {
        getTable.innerHTML =
                `
                <picture>
                    <img id="dailyPic" src="images/fallback/spacewalk1x.jpg" alt="Lonely astronaut on spacewalk."
                    srcset="images/fallback/spacewalk1x.jpg, images/fallback/spacewalk2x.jpg 2x, images/fallback/spacewalk3x.jpg 3x, images/fallback/spacewalk4x.jpg 4x">
                </picture>
                <figcaption><strong>Error retrieving Near Earth Orbit information: Check network connection!</strong></figcaption>
            `
        console.log(`Error - ${error}`);
    });
}

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