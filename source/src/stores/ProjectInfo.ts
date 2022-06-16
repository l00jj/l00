export default class ProjectInfo {
    "id": string
    "title": string
    "date": string
    "time": number
    "coverUrl": string
    //
    "href": string // 后续添加
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