import { EventEmitter } from '@src/utils/EventEmitter'

export default class Sizes extends EventEmitter {
    // Setup
    width = window.innerWidth;
    height = window.innerHeight;
    pixelRatio = Math.min(window.devicePixelRatio, 2)


    onWindowResizeListener = () => {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        this.emit('resize')
    }

    constructor() {
        super()

        // Resize event    
        this.setWindowResizeEmitter()
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

    offResize() {
        this.removeWindowResizeEmitter()
        return this.offAll('resize')
    }
}