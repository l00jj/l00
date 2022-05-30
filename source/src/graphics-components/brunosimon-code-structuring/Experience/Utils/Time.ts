import { EventEmitter } from '@src/unit/EventEmitter'

export default class Time extends EventEmitter {
    // Setup
    start: number
    current: number
    elapsed: number
    delta: number
    constructor() {

        super()

        // Setup
        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16

    }

    tick() {
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start

        this.emit('tick');

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }
}