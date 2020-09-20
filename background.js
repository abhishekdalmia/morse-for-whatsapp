chrome.runtime.onInstalled.addListener(function (object) {
    chrome.storage.local.set({ "toConvert": true });
    alert("Required: Refresh the whatsapp web pages for extension to function.");
});