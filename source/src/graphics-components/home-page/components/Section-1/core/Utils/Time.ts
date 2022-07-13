import { EventEmitter } from "../All";

export default class Time extends EventEmitter {
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

    requestAnimationFrameID = 0
    onTickLoopFunction = () => {
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start

        this.emit('tick');

        this.requestAnimationFrameID = window.requestAnimationFrame(this.currentTickLoopFunction)
    }

    // 当清除时，函数为空函数已终结 requestAnimationFrame
    currentTickLoopFunction = () => { }


    // Tick 
    isTicking = false
    tick() {
        //避免重复启动 currentTickLoopFunction
        if (this.currentTickLoopFunction !== this.onTickLoopFunction) {
            this.currentTickLoopFunction = this.onTickLoopFunction
            if (!this.isTicking) {
                this.isTicking = true
                this.current = Date.now() - Math.trunc(1000 / 60)//为了在暂停后再开始不至于delta过大造成停顿
                this.currentTickLoopFunction()
            }
        }
    }

    // 暂停
    paused() {
        if (this.isTicking) {
            window.cancelAnimationFrame(this.requestAnimationFrameID)
            this.currentTickLoopFunction = () => { }
            this.isTicking = false
        }
    }

    onTick(fun: Function) {
        return this.on('tick', fun)
    }

    destroy() {
        this.currentTickLoopFunction = () => { }
        return this.clearEvents()
    }

}