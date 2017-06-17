chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (sender.tab && message.type === 'open_tab') {
    chrome.tabs.create({ url: message.url });
  }

  if (sender.tab && message.type === 'started') {
    chrome.pageAction.show(sender.tab.id);
  }
});
