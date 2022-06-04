const base = import.meta.env.BASE_URL;
const locationUrl = window.location.href
export default class PublicPath {
    static base = base;
    static locationUrl = locationUrl
    static completebase = new URL(base, PublicPath.locationUrl).href
    url: string
    constructor(relativePath: string) {
        relativePath = relativePath[0] === '/' ? '.' + relativePath : relativePath
        this.url = new URL(relativePath, PublicPath.completebase).href
    }
}