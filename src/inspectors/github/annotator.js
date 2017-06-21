import { goToUrl } from '../../utils';

const annotator = (node, url) => {
  node.style.cursor = 'pointer';
  node.addEventListener('mouseenter', ({ target }) => {
    target.style.fontWeight = 'bolder';
  });
  node.addEventListener('mouseleave', ({ target }) => {
    target.style.fontWeight = 'normal';
  });
  node.onclick = goToUrl(url);
};

export default annotator;
