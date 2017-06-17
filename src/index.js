/*
 * - Consider relative paths
 * - Run all parsers in README.md code blocks
 * - Open tab next to the current one
 */

import { debug } from './utils';
import { getInspectorByHref } from './inspectors';

const inspector = getInspectorByHref(window.location.href);
debug('Running', inspector);
inspector.start();
