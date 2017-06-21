import { debug } from '../../../utils';

const npmUrl = 'https://www.npmjs.com/package';
const nodeUrl = 'https://nodejs.org/api';
const regexes = [
  /require\(["']([\w-\/\.]+)["']\)/,
  /(?:import)?.*\sfrom\s+["']([\w-\/\.]+)["']/,
];

const builtinLibs = [
  'assert',
  'buffer',
  'child_process',
  'cluster',
  'crypto',
  'dgram',
  'dns',
  'domain',
  'events',
  'fs',
  'http',
  'https',
  'net',
  'os',
  'path',
  'punycode',
  'querystring',
  'readline',
  'repl',
  'stream',
  'string_decoder',
  'tls',
  'tty',
  'url',
  'util',
  'v8',
  'vm',
  'zlib',
];

const getLibrary = line => {
  for (let i = 0; i < regexes.length; i++) {
    const match = line.match(regexes[i]);
    if (match) {
      return match[1];
    }
  }
};

const parseLine = line => {
  const library = getLibrary(line);
  if (!library || library.startsWith('./') || library.startsWith('../')) {
    // TODO: add support for relative paths?
    return;
  }

  let url;
  if (builtinLibs.includes(library)) {
    url = `${nodeUrl}/${library}.html`;
  } else {
    url = `${npmUrl}/${library.split('/').shift()}`;
  }

  return { url, name: library };
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
