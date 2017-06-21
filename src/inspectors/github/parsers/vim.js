import { debug } from '../../../utils';

const parseLine = line => {
  let library = parseLibrary(line);
  if (!library || library.startsWith('~')) {
    return;
  }

  if (library.startsWith('file://')) {
    return;
  }

  let url = 'https://github.com';
  let name = url;
  if (library.startsWith(url)) {
    url = library;
  } else if (!library.includes('/')) {
    name = library;
    url += `vim-scripts/${library}`;
  } else {
    url += `/${library}`;
    name = library.split(url).shift();
  }

  return { url, name };
};

const parseLibrary = line => {
  const match = line.match(/^Plug(?:in)?\s+['"]([^'"]+)['"]/);
  return match ? match[1] : undefined;
};

const parser = annotator => {
  const nodes = document.getElementsByClassName('js-file-line');
  if (nodes.length === 0) {
    debug('no lines detected');
    return;
  }

  for (let i = 0; i < nodes.length; i++) {
    const library = parseLine(nodes[i].innerText);
    if (!library) {
      continue;
    }

    const childs = nodes[i].childNodes;
    for (let j = 0; j < childs.length; j++) {
      const node = childs[j];
      if (node.className === 'pl-s' && node.innerText.includes(library.name)) {
        annotator(node, library.url);
        break;
      }
    }
  }
};

export default parser;
