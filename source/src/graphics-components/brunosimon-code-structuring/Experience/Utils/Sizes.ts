import { EventEmitter } from '@src/unit/EventEmitter'

export default class Sizes extends EventEmitter {
    // Setup
    width = window.innerWidth;
    height = window.innerHeight;
    pixelRatio = Math.min(window.devicePixelRatio, 2)

    constructor() {
        super()

        // Resize event        
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)

            this.emit('resize')
        })


    }
}