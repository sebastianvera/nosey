import GithubInspector from './github';
const inspectors = [GithubInspector];

export const getInspectorByHref = href => {
  for (let i = 0; i < inspectors.length; i++) {
    const Inspector = inspectors[i];
    if (Inspector.isAtDomain(href)) {
      return new Inspector();
    }
  }

  throw new Error(`No inspector found for: ${href}`);
};

export default inspectors;
