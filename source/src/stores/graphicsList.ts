class Page {
  "id": string
  "date": string
  "time": number
  "coverUrl": string
  "vue": any
  constructor(path: string, vue: any) {
    const node = path.split('/')
    const name = node.pop()
    const id = node[node.length - 1]
    const folderPath = node.join('/')
    const date = name!.split(/\-|\./).slice(1, 3).reduce((dateText, timeText) => {
      const year = dateText.slice(0, 4);
      const month = dateText.slice(4, 6)
      const date = dateText.slice(6, 8)
      const hour = timeText.length >= 2 ? timeText.slice(0, 2) : '00';
      const minute = timeText.length >= 4 ? timeText.slice(2, 4) : '00'
      const second = timeText.length >= 6 ? timeText.slice(4, 6) : '00'
      return `${year}.${month}.${date} ${hour}:${minute}:${second}`
    })
    this.id = id
    this.date = date
    this.time = (new Date(date)).valueOf()
    this.coverUrl = new URL(`../graphics-components/${id}/index.jpg`, import.meta.url).href
    this.vue = vue
  }
}
//
const paths = import.meta.glob('@src/graphics-components/*/index-*.ts')
const list = Object.entries(paths).map(([key, item]) => new Page(key, item))
list.sort((a, b) => b.time - a.time);
export default [list.pop(), ...list]