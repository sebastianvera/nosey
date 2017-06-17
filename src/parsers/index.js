import JavascriptParser from './js';
import VimParser from './vim';

export const parsersByExtension = {
  js: new JavascriptParser(),
  vim: new VimParser(),
};

export default parsersByExtension;
