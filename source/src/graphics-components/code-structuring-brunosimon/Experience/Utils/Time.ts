import { EventEmitter } from '@src/utils/EventEmitter'

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

    onTickLoopFunction = () => {
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start

        this.emit('tick');

        window.requestAnimationFrame(this.currentTickLoopFunction)
    }

    // 当清除时，函数为空函数已终结 requestAnimationFrame
    currentTickLoopFunction = () => { }


    // Tick 
    tick() {
        //避免重复启动 currentTickLoopFunction
        if (this.currentTickLoopFunction !== this.onTickLoopFunction) {
            this.currentTickLoopFunction = this.onTickLoopFunction
            this.currentTickLoopFunction()
        }
    }


    onTick(fun: Function) {
        return this.on('tick', fun)
    }

    offTick() {
        this.currentTickLoopFunction = () => { }
        return this.offAll('tick')
    }

}