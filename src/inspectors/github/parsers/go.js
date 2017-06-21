import { debug } from '../../../utils';

const parseLine = line => {
  const name = getLibrary(line);
  const url = `http://godoc.org/${name}`;
  return { url, name };
};

const getLibrary = line => {
  const match = line.match(/"([\w\/\.-]+)"/);
  return match ? match[1] : undefined;
};

const getAnnotatedNode = node => node.querySelector('.pl-s');

const parser = annotator => {
  const nodes = document.getElementsByClassName('js-file-line');
  if (nodes.length === 0) {
    debug('no lines detected');
    return;
  }

  let isOnMultiline = false;
  for (let i = 0; i < nodes.length; i++) {
    const line = nodes[i].innerText;
    if (!line.includes('import')) {
      continue;
    }

    // single line import
    if (/^\s*import\s+(?:(?:\w+\s+)|(?:\.\s+))?"/.test(line)) {
      const library = parseLine(line);
      annotator(getAnnotatedNode(nodes[i]), library.url);

      continue;
    }

    // multiline import
    i++; // go to next line;
    while (nodes[i] && !nodes[i].innerText.includes(')')) {
      const node = nodes[i];
      if (node.innerText.trim() === '') {
        i++;
        debug('skip empty line', node);
        continue;
      }
      const library = parseLine(node.innerText);
      debug(library);
      annotator(getAnnotatedNode(node), library.url);

      i++;
    }
  }
};

export default parser;
