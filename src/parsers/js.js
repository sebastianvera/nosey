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

export default class JavascriptParser {
  parse(line) {
    const library = this.getLibrary(line);
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
  }

  getLibrary(line) {
    for (let i = 0; i < regexes.length; i++) {
      const match = line.match(regexes[i]);
      if (match) {
        return match[1];
      }
    }
  }
}
