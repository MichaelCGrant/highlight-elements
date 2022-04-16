// // Initialize variable to hold info from content script
// let pageDOM;
// chrome.runtime.onMessage.addListener((request) => {
//     if (request["DOM"] === "loaded") {
//         chrome.storage.local.get("DOM", (response) => {
//             console.log(response);
//             pageDOM = JSON.parse(response["DOM"]);
//         })
//     };
// })

// console.log(pageDOM);

// for (el in pageDOM) {
//     const child = document.createElement("h5");
//     child.innerText = JSON.stringify(el);
//     document.body.appendChild(child);
// }

// Mark's working stuff

const button = document.querySelector('#start-button');

function receivedResponse(response) {
  const topLine = document.createElement('div');
  topLine.innerText = 'Color : Identifier';
  document.body.appendChild(topLine);
  response.forEach((el) => {
    const legend = document.createElement('div');
    const colorBlock = document.createElement('div');
    colorBlock.style.display = 'inline-block';
    colorBlock.style.width = '12px';
    colorBlock.style.height = '12px';
    colorBlock.style.backgroundColor = el.color;
    legend.appendChild(colorBlock);
    legend.appendChild(document.createTextNode(` : ${el.id}`)); // Should show the actual color and not just hex code
    document.body.appendChild(legend);
  })
}

button.onclick = () => {
  chrome.tabs.query({active: true}, function(tabs) {
    const tab = tabs[0];
    chrome.tabs.sendMessage(
      tabId = tab.id,
      message = {pressed: true},
      callback = receivedResponse
    )
  });
};