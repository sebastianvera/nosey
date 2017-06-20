/*
 * - Consider relative paths
 * - Run all parsers in README.md code blocks
 * - Open tab next to the current one
 * - Add popover.html to activate parser manually
 */

import { debug } from './utils';
import { getInspectorByHref } from './inspectors';

const inspector = getInspectorByHref(window.location.href);
debug('Running', inspector);

chrome.runtime.sendMessage({ type: 'started' });
inspector.start();
