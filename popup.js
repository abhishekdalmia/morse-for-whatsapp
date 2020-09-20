document.addEventListener("DOMContentLoaded", function() {
    chrome.storage.local.get("toConvert", function(result) {
        document.getElementById("toggleInfo").innerHTML = result["toConvert"];
    });
    document.getElementById("toggle").addEventListener("click", function() {
        // inverting toggle value for morse code conversion if toggle button clicked
        chrome.storage.local.get("toConvert", function(result) {
            chrome.storage.local.set({ "toConvert": !result["toConvert"] })
            document.getElementById("toggleInfo").innerHTML = !result["toConvert"];
        });
    }, false);
});