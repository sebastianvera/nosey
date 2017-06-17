export const debug = (...args) => {
  if (!process.env.DEBUG) return;
  console.info('%c[nosey]', 'background: #222; color: #bada55', ...args);
};

export const goToUrl = url => () =>
  chrome.runtime.sendMessage({
    type: 'open_tab',
    url,
  });
