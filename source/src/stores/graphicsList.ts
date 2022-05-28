class Page {
  "id": string
  "title": string
  "date": string
  "time": number
  "coverUrl": string
  "vue": any
  constructor(path: string, pageInfo: any) {
    const node = path.split('/')
    const id = node[node.length - 2]
    this.id = id
    this.title = pageInfo.title
    this.date = pageInfo.date
    this.time = (new Date(pageInfo.date)).valueOf()
    this.coverUrl = pageInfo.coverUrl
    this.vue = pageInfo.vue
  }
}
//
const paths = import.meta.globEager('@src/graphics-components/*/index.ts')
const indexID = 'index'
const list: Page[] = [];
let indexPage: Page | null = null;
for (let [key, item] of Object.entries(paths)) {
  const page = new Page(key, item.default)
  if (!indexPage && page.id === indexID) indexPage = page
  else list.push(page)
}
list.sort((a, b) => b.time - a.time);
export default [indexPage, ...list]