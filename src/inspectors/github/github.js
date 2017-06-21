import parsersByExtension from './parsers';
import annotator from './annotator';
import { debug } from '../../utils';

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
    const fileNodes = document.getElementsByClassName('final-path');
    if (fileNodes.length !== 1) {
      debug('No filename found');
      return;
    }

    const file = fileNodes[0].innerText;
    const extension = file.split('.').slice(-1).pop();
    const parser = parsersByExtension[extension];
    if (!parser) {
      debug('Parser not found for:', extension);
      return;
    }

    debug('parsing:', extension);
    parser(annotator);
  }
}
