export default class VimParser {
  parse(line) {
    let library = this.getLibrary(line);
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
  }

  getLibrary(line) {
    const match = line.match(/^Plug(?:in)?\s+['"]([^'"]+)['"]/);
    return match ? match[1] : undefined;
  }
}
