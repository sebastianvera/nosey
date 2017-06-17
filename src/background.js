chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (sender.tab && message.type === 'open_tab') {
    chrome.tabs.create({url: message.url})
  }
});
