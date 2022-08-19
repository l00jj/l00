import Statsjs from 'stats.js'

export class Stats extends Statsjs {
    viewContainerDom: HTMLElement
    constructor(viewContainerDom: HTMLElement) {
        super()
        // Setup
        this.viewContainerDom = viewContainerDom
        // 显示0ms延迟
        this.showPanel(0)
        // 修改样式
        this.dom.style.position = 'absolute'
    }

    isShow = false
    show = () => {
        if (this.viewContainerDom) {
            this.viewContainerDom.appendChild(this.dom)
            this.isShow = true
        }
    }

    hide = () => {
        this.dom.remove()
        this.isShow = false
    }

}
