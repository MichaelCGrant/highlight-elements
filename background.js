// let color = '#3aa757';

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.sync.set({ color });
//   console.log('Default background color set to %cgreen', `color: ${color}`);
// });
chrome.action.onClicked.addListener(launchExtension);

function launchExtension() {
    chrome.windows.create({
        "focused": true,
        "type": "popup", 
        "url": "index.html"
    });
} 

