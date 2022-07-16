import { runInContext } from "lodash";
import { EventEmitter, Debug, Sizes, Time, World } from "./All"

export default class Main extends EventEmitter {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    viewArea: HTMLElement
    world: World
    sizes: Sizes
    /*  
     time: Time
     renderer: Renderer
     
     //
     */
    debug: Debug

    constructor(canvas: HTMLCanvasElement, viewArea: HTMLElement) {
        super()

        // Init
        this.canvas = canvas;
        this.viewArea = viewArea;
        this.ctx = this.canvas.getContext("2d")!;

        //Debug
        this.debug = new Debug(this)

        // Setup
        this.sizes = new Sizes(this)
        // this.time = new Time()
        this.world = new World(this)

        // Sizes resize event
        // this.sizes.onResize(() => this.resize())

        // Time tick event
        // this.time.onTick(() => this.update())
    }


    resize() {
        // this.world.resize()
        // this.renderer.resize()
    }

    update() {
        // this.world.update()
        // this.renderer.update()
    }

    render() {
        // this.time.tick()
    }

    pausedRender() {
        // this.time.paused()
    }

    destroy() {
        // Important destroy
        // this.sizes.destroy()
        // this.time.destroy()
        // this.renderer.destroy()

        // Emit Destroyed Event
        this.emit('destroyed')
    }

    onDestroyed(fun: Function) {
        return this.once('destroyed', fun)
    }
}
