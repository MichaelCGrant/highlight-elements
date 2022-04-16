// // Define extension activation per tab
// function getState() {
//     let state;
//     chrome.storage.sync.get("currentState", (response) => {
//         state = response["currentState"]});
//         console.log(state);
//     return state;    
// }

// function setState(st) {
//     chrome.storage.sync.set({"currentState": st});
// }

// function setPopupWindowID(iD) {
//     chrome.storage.sync.set({"popupWinID": iD});
// }

// // Initialize settings on install
// chrome.runtime.onInstalled.addListener(() => {
//   setState(false);
// });
let isActive = false;
let windowID;

chrome.action.onClicked.addListener(toggleExtension);
chrome.windows.onCreated.addListener(openWindow);
chrome.windows.onRemoved.addListener(closeWindow);

function toggleExtension() {
    // let isActive = chrome.storage.sync.get("currentState");
    // console.log(isActive);
    isActive = !isActive;
    // setState(isActive);
    if (isActive) {
        // chrome.action.setIcon({"path": "assets/Highlighter-Blue-icon-css.png"});
        chrome.windows.create({
            "focused": true,
            "type": "popup", 
            "url": "index.html",
            "left": 1520,
            "top": 1000,
            "width": 400,
            "height": 600
        }, (window) => {windowID = window.id});
    } else {
        // chrome.action.setIcon({"path": "assets/Highlighter-White-icon-css.png"});
        chrome.windows.remove(windowID);
    }
    
} 

function openWindow(win) {
    // console.log(win.id);
    // console.log(windowID);
    if (win.id === windowID) {
        chrome.action.setIcon({"path": "assets/Highlighter-Blue-icon-css.png"});
        isActive = true;
    }
}

function closeWindow(win) {
    // console.log(win);
    // console.log(windowID);
    if (win === windowID) {
        chrome.action.setIcon({"path": "assets/Highlighter-White-icon-css.png"});
        isActive = false;
    }
}


