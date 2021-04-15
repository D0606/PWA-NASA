document.addEventListener("DOMContentLoaded", bandwidthModify, false);

var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
const notify = document.getElementById("bandWarn");
const sourceChange = document.getElementsByTagName("source");
const imgChange = document.getElementsByTagName("img");

function bandwidthModify() {
    if (connection.effectiveType !== "4g") {
        notify.innerHTML = "<strong>Bandwidth low: Large images will be shown as text description only.</strong>";
        var sourceLength = sourceChange.length;
        var imgLength = imgChange.length;
        for (i = 0; i < sourceLength; i++) {
            sourceChange[i].srcset = "";
        }
        for (i = 0; i < imgLength; i++) {
            imgChange[i].src = "";
        }
    }
}