import { createApp } from "vue";
import Alert404 from "./Alert404.vue"

export default (input: any = {}) => {
    const wraper = window.document.createElement('DIV')
    const unmount = () => document.body.removeChild(wraper)

    const app = createApp(Alert404, Object.assign(input, { unmount }))

    app.mount(wraper)
    document.body.appendChild(wraper)
}