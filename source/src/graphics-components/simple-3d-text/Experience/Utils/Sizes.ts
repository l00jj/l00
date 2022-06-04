import { EventEmitter } from '@src/utils/EventEmitter'

export default class Sizes extends EventEmitter {

    viewArea: HTMLElement;
    width = 0;
    height = 0;
    pixelRatio = 0;

    onWindowResizeListener = () => {
        this.updateSize()
        this.emit('resize')
    }

    constructor(viewArea: HTMLElement) {
        super()

        // Setup
        this.viewArea = viewArea
        this.updateSize()

        // Resize event    
        this.setWindowResizeEmitter()
    }

    updateSize() {
        this.width = this.viewArea.offsetWidth;
        this.height = this.viewArea.offsetHeight;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
    }

    setWindowResizeEmitter() {
        window.addEventListener('resize', this.onWindowResizeListener)
    }

    removeWindowResizeEmitter() {
        window.removeEventListener('resize', this.onWindowResizeListener)
    }

    onResize(fun: Function) {
        return this.on('resize', fun)
    }

    destroy() {
        this.removeWindowResizeEmitter()
        return this.clearEvents()
    }
}