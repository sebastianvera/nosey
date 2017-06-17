import parsersByExtension from '../parsers';
import { goToUrl, debug } from '../utils';

export default class GithubInspector {
  static isAtDomain(url) {
    return /^https?:\/\/(www.)?github.com/.test(url);
  }

  constructor() {
    this.addAnnotations = this.addAnnotations.bind(this);
    this.startWatching = this.startWatching.bind(this);
  }

  start() {
    this.addAnnotations();
    this.startWatching();
  }

  startWatching() {
    document.addEventListener('pjax:end', this.addAnnotations);
    window.addEventListener('popstate', this.addAnnotations);
  }

  addAnnotations() {
    const nodes = document.getElementsByClassName('js-file-line');
    if (nodes.length === 0) {
      debug('no lines detected');
      return;
    }

    const file = document.getElementsByClassName('final-path')[0].innerText;
    const extension = file.split('.').slice(-1).pop();
    const parser = parsersByExtension[extension];
    if (!parser) {
      debug('Parser not found for:', extension);
      return;
    }

    debug('extension:', extension);
    for (let i = 0; i < nodes.length; i++) {
      const library = parser.parse(nodes[i].innerText);
      if (!library) {
        continue;
      }

      const childs = nodes[i].childNodes;
      for (let j = 0; j < childs.length; j++) {
        const child = childs[j];
        if (
          child.className === 'pl-s' &&
          child.innerText.includes(library.name)
        ) {
          child.style.cursor = 'pointer';
          child.onclick = goToUrl(library.url);
          break;
        }
      }
    }
  }
}
