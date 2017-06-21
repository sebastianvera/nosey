import js from './js';
import vim from './vim';
import go from './go';

export const parsersByExtension = {
  vim,
  go,
  js,
  ts: js,
};

export default parsersByExtension;
