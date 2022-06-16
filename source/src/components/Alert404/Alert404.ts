import { createApp, App, ref } from "vue";
import { EventEmitter } from "@src/utils/EventEmitter"
import Alert404Vue from "./Alert404.vue"


export class Alert404Controler extends EventEmitter {

    isShow = ref(false)
    app = createApp(Alert404Vue, { controler: this })
    wraper = window.document.createElement('DIV')


    constructor(input: any = {}) {
        super()

        // 挂载
        this.app.mount(this.wraper)
    }

    show = () => {
        this.update()
        this.isShow.value = true
        document.body.appendChild(this.wraper)
    }

    hide = () => {
        if (this.isShow.value) {
            this.isShow.value = false
        }
    }


    update = () => {
        this.emit('update')
    }

    onUpdate = (event: Function) => {
        this.on('update', event)
    }


    afterLeave = () => {
        if (!this.isShow.value) {
            document.body.removeChild(this.wraper)
        }
    }

}


const alert404Controler = new Alert404Controler()

export const Alert404 = {
    show() {
        alert404Controler.show()
    },
    hide() {
        alert404Controler.hide()
    }
}