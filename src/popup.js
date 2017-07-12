// @format
/*
 * - Preselect the option with the correct extension if the file
 *   has been already parsed automatically.
*/
const select$ = document.querySelector('select#parsers');
const loading$ = document.querySelector('#loading');

const startLoading = () => {
  loading$.innerText = '...';
};

const stopLoading = () => {
  loading$.innerText = 'Done';
};

const clearLoading = () => {
  loading$.innerText = '';
};

select$.onchange = ({target}) => {
  clearLoading();
  const option = target.children[target.selectedIndex];
  const extension = option.value;

  if (extension === 'none') {
    clearLoading();
    return;
  }

  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    startLoading();

    chrome.tabs.sendMessage(
      tabs[0].id,
      {type: 'parse', extension},
      stopLoading
    );
  });
};
