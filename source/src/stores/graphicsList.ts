import ProjectInfo from './ProjectInfo'
//
const paths = import.meta.globEager('@src/graphics-components/*/index.ts')
const list = Object.entries(paths).map(([key, item]) => new ProjectInfo(key, item.default));
list.sort((a, b) => b.time - a.time);
export default list