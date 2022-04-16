// Verify content script is working
console.log('Content Script Loaded');
// query and save every DOM element
// let isActive = false;

// const dom = document.querySelectorAll('*');
// console.log(dom);

// function toggle() {
//     isActive = !isActive;
//     if (isActive) {
//         for (el of dom) {
//             el.classList.add('hleTracked');
//         }
//         // Send webpage dom to popup
//         chrome.storage.local.set({"DOM" : JSON.stringify(dom)});
//         chrome.runtime.sendMessage({"DOM": "loaded"});
//     } else {
//         for (el of dom) {
//             el.classList.remove('hleTracked');
//         }
//     }
// }
// // Iterate through dom array and give every element a border

// Mark's working stuff

const colors = [
    '#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6',
    '#bfef45', '#fabed4', '#469990', '#dcbeff', '#9A6324', '#fffac8', '#800000', '#aaffc3',
    '#808000', '#ffd8b1', '#000075', '#a9a9a9'
]; //Some colors to start out with
  
const blacklistTags = {'SCRIPT': 1 };
  
  function buttonCallback(message, sender, sendResponse) { // This function gets called in content-script when pressing button in popup
    // We have access to the current active tab here
    if (message.pressed) {
      const allElements = document.body.getElementsByTagName('*');
      const response = [];
      for (let i = 0; i < allElements.length; i++) {
        if (blacklistTags[allElements[i].tagName]) {
          continue;
        }
        // I don't know how to easily identify items without a class or id, or differentiate which class is which, etc, but getting low on time
        let bestIdentifier;
        if (allElements[i].id != '') {
          bestIdentifier = 'id: ' + allElements[i].id;
        } else if (allElements[i].className != '') {
          bestIdentifier = 'class: ' + allElements[i].className;
        } else {
            bestIdentifier = 'element: ' + allElements[i].tagName;
        }
        const randColor = Math.floor(Math.random() * colors.length); // For the sake of time, just grab any random color, though we would want to not get duplicates as much as possible TODO
        response.push({id: bestIdentifier, color: colors[randColor]});
        if (allElements[i].style) {
          allElements[i].style.border = '1px solid ' + colors[randColor];
        }
      }
      sendResponse(response);
    }
  }
  
  chrome.runtime.onMessage.addListener(buttonCallback);
  
  