import Statsjs from 'stats.js'


export class Stats extends Statsjs {
    constructor(viewContainerDom?: HTMLElement) {
        super()
        // 正常流程
        this.showPanel(0)
        if (viewContainerDom) {
            viewContainerDom.appendChild(this.dom)
        }
        // 修改样式
        this.dom.style.position = 'absolute'
    }
}
