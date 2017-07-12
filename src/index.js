// @format
/*
 * - Consider relative paths
 * - Run all parsers in README.md code blocks
 * - Open tab next to the current one
 * - Add function to remove added annotators
 * - Remove added annotators if user triggers the parsers manually
 */

import {debug} from './utils';
import {getInspectorByHref} from './inspectors';

const inspector = getInspectorByHref(window.location.href);
debug('Running', inspector);

chrome.runtime.sendMessage({type: 'started'});
inspector.start();

chrome.runtime.onMessage.addListener((message, sender) => {
  if (sender.tab || message.type !== 'parse') {
    return;
  }

  const {extension} = message;
  debug('Manually parsing', extension);
  inspector.addAnnotationsByExtension(extension);
});
