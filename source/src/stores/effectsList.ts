class EffectJson {
  "id": string
  "date": number
  "title": string
  "tags": [string]
  //"urls": [string]//暂不使用
  constructor(input: EffectJson) {
    this.id = input.id
    this.date = input.date
    this.title = input.title
    this.tags = input.tags
    //this.urls = input.urls
  }
}

class EffectInfo extends EffectJson {
  "coverUrl": string
  "vue": any
  constructor(input: EffectJson, coverUrl: string, vue: any) {
    super(input)
    this.coverUrl = coverUrl
    this.vue = vue
  }
};

const jsons = import.meta.globEager('@components/effects/*/index.json')
const vues = import.meta.glob('@components/effects/*/*.vue')
const effectsList = Object.entries(jsons).map(([key, item]) => {
  const { id } = item.default
  const coverUrl = new URL(`../components/effects/${id}/index.jpg`, import.meta.url).href
  const vue = vues[`../components/effects/${id}/${id}.vue`]
  item.default.date = parseInt(item.default.date)
  return new EffectInfo(item.default as EffectJson, coverUrl, vue)
})
effectsList.sort((a, b) => b.date - a.date);

export default effectsList