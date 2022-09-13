import { EventEmitter } from "@src/utils/EventEmitter"
import { Stats } from '@src/utils/Stats'
import { DatGui } from "@src/utils/DatGui";
import anime from "animejs"





/**
 * vision 220724.001
 */
class Common {
    static adapt(source: any, target: any) {
        Object.assign(source, target)
    }
}










/**
 * vision 220726.001
 */
class Sizes {
    main: Main
    width = 0;
    height = 0;
    //pixelRatio = 0;//可能有用，直接提高或降低分辨率

    /**
     * fit
     * fit使用是用于既定大小的渲染，既定大小，然后通过变形适配外框
     * :contain 优先内容，与外框不一致时等比缩小并尽可能把全部内容显示
     * :cover 优先填充，与外框不一致时等比放大并尽可能把覆盖外框
     * :fill 优先形状，与外框不一致时变形拉伸贴合外框
     * :none 动态大小
     */
    static Fit_Contain = Symbol()
    static Fit_Cover = Symbol()
    static Fit_Fill = Symbol()
    static Fit_None = Symbol()
    static fitMap = {
        [Sizes.Fit_Contain]: 'contain',
        [Sizes.Fit_Cover]: 'cover',
        [Sizes.Fit_Fill]: 'fill',
        [Sizes.Fit_None]: 'none',
    }
    fit = Sizes.Fit_None;

    constructor(main: Main, params?: { fit: symbol }) {
        // Setup
        this.main = main
        this.update({ fit: params?.fit ? params.fit : Sizes.Fit_None })

        // Resize event    
        Sizes.resizeObserve(this)
    }


    static resizeObserve(sizes: Sizes) {
        const main = sizes.main
        if (window.ResizeObserver) {
            const resizeObserver = new ResizeObserver((entries) => sizes.update());
            resizeObserver.observe(main.viewContainerDom)
            main.onDestroyed(() => resizeObserver.disconnect())
        } else {
            const onresize = () => sizes.update()
            window.addEventListener('resize', onresize)
            main.onDestroyed(() => window.removeEventListener('resize', onresize))
        }
    }

    update(update: { width?: number, height?: number, fit?: symbol } = {}) {
        let { width, height, fit } = update
        const { viewContainerDom, canvasDom } = this.main
        if (!viewContainerDom || !canvasDom) return;
        const updateSize = (width: number, height: number) => {
            this.width = width;
            this.height = height;
            canvasDom.width = width
            canvasDom.height = height
        }
        // 更新画布大小
        // Sizes.Fit_None 时无论如何都更新
        // 其他模式下，按需更新
        if (this.fit === Sizes.Fit_None) {
            width = width ? width : this.main.viewContainerDom.offsetWidth
            height = height ? height : this.main.viewContainerDom.offsetHeight
            updateSize(width, height)
            canvasDom.style.width = width + 'px'
            canvasDom.style.height = height + 'px'
        } else if ((this.width !== width || this.height !== height) && width && height) {
            updateSize(width, height)
            canvasDom.style.width = '100%'
            canvasDom.style.height = '100%'
        }
        //this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        // 更新画布填充模式
        if (fit && fit !== this.fit && Sizes.fitMap.hasOwnProperty(fit)) {
            this.fit = fit
            canvasDom.style.objectFit = Sizes.fitMap[this.fit]
        }
        //
        this.main.emit(Main.Event_Resize)
    }

    onResize(fun: Function) {
        return this.main.on(Main.Event_Resize, fun)
    }
}




























/**
 * vision 220724.001
 */
class Time {
    main: Main
    time: number
    start: number
    current: number
    elapsed: number
    delta: number

    constructor(main: Main) {
        // Setup
        this.main = main

        // Setup
        this.start = Date.now()
        this.current = this.start
        this.time = performance.now()
        this.elapsed = 0
        this.delta = 16
    }

    requestAnimationFrameID = 0
    onTickLoopFunction = (highResTimeStamp: DOMHighResTimeStamp) => {
        this.current = Date.now()
        const newTime = performance.now()
        this.delta = newTime - this.time
        this.time = newTime
        this.elapsed += this.delta
        //
        this.main.emit(Main.Event_Tick);
        //
        if (this.currentTickLoopFunction)
            this.requestAnimationFrameID = window.requestAnimationFrame(this.currentTickLoopFunction as () => {})
    }

    // 当清除时，函数为空函数已终结 requestAnimationFrame
    currentTickLoopFunction?: (time: DOMHighResTimeStamp) => void


    // Tick 
    isTicking = false
    tick() {
        //避免重复启动 currentTickLoopFunction
        if (!this.currentTickLoopFunction) {
            this.currentTickLoopFunction = this.main.params.helper.stats.enable ? (time: DOMHighResTimeStamp) => {
                this.main.stats?.begin()
                this.onTickLoopFunction(time)
                this.main.stats?.end()
            } : this.onTickLoopFunction;
            if (!this.isTicking) {
                this.isTicking = true
                this.time = performance.now() - (1000 / 60)//为了在暂停后再开始不至于delta过大造成停顿
                this.currentTickLoopFunction(window.performance.now())
            }
        }
    }

    // 暂停
    paused() {
        if (this.isTicking) {
            window.cancelAnimationFrame(this.requestAnimationFrameID)
            this.currentTickLoopFunction = undefined
            this.isTicking = false
        }
    }

    onTick(fun: Function) {
        return this.main.on(Main.Event_Tick, fun)
    }
}





















/**
 * vision 220724.001
 */
class Controler {
    main: Main
    target = {
        x: NaN,
        y: NaN,
    }

    static Event_Move = Symbol()
    static Event_Click = Symbol()

    constructor(main: Main) {
        // Setup
        this.main = main
    }



    clickControler = (event: MouseEvent | TouchEvent) => {
        //稳定版需要通过转换得到数据，layerX,layerY不是标准方案
        const x = (event as any).layerX as number
        const y = (event as any).layerY as number
        this.main.emit(Controler.Event_Click, x, y)
    }


    //  document.addEventListener("touchstart", handleEvent);

    static Event_RemoveClickControlerOnDestroyed = Symbol()
    onClick(fun: Function) {
        // 如不存在事件则部署监听
        if (!this.main.has(Controler.Event_Click)) {
            const { canvasDom } = this.main
            canvasDom.addEventListener('click', this.clickControler)
        }
        // 绝对清空事件
        if (!this.main.has(Controler.Event_RemoveClickControlerOnDestroyed)) {
            const { canvasDom } = this.main
            this.main.on(Controler.Event_RemoveClickControlerOnDestroyed, () => canvasDom.removeEventListener('click', this.clickControler))
        }
        // 添加
        return this.main.on(Controler.Event_Click, fun)
    }

    offClick() {
        // 如事件表不存在，移除监听
    }
}






















class ParticleHelper {
    main: Main
    datGui: DatGui
    constructor(main: Main) {
        this.main = main
        this.datGui = new DatGui(this.main.viewContainerDom)
        this.main.onDestroyed(() => this.datGui.destroy())
        Promise.resolve().then(() => this.init())
    }
    init() {
        const { particles } = this.main.params

        const particlesFolder = this.datGui.ui.addFolder('Particles')
        particlesFolder.open()
        const cEmitterNumber = particlesFolder.add(particles.color, 'randomIndex').name('RandomColorIndex')
        /* //     
        
        
        
        const cVanishSpeed = particlesFolder.add(particles.vanish, 'speed', 1, 100, 1).name('VanishSpeed')
        const cLinked = particlesFolder.add(particles.linked, 'enable').name('Linked')
        const cClearModes = particlesFolder.add({ clearModes: 'normal' }, 'clearModes', Object.keys(renderer.clearModes)).name('ClearModes')
            .onChange((val) => val in renderer.clearModes && (renderer.clearModes as any)[val].use())
        const funs = {
            Demo1() {
                main.world.createBaseParticles()
            }
        }
        particlesFolder.add(funs, 'Demo1').name('重置') */
    }
}


class Rigid {
    main: Main
    top = 0
    left = 0
    width = 0
    heigth = 0

    constructor(main: Main) {
        this.main = main
        this.resize()
        this.main.sizes.onResize(() => this.resize())
    }
    resize() {
        const { width, height } = this.main.sizes
        this.width = width * 0.5
        this.heigth = 30
        this.top = height * 0.5
        this.left = (width - this.width) / 2
    }
}


type ParticleParams = {
    type?: 'base' | 'emit'
    x?: number
    y?: number
    size?: number
    fill?: {
        color: string
    }
    stroke?: {
        width: number,
        color: string
    }
    opacity?: number
}

class Particle {
    Event_Destroy = Symbol()
    main: Main
    type: 'base' | 'emit' = 'base'
    x = NaN
    y = NaN
    xSpeed = 0
    ySpeed = 0
    xAccelerated = 0
    yAccelerated = 0
    size = NaN
    renderSize = NaN
    fill?: {
        color: '#000'
    } = undefined
    stroke?: {
        width: 3,
        color: '#000'
    } = undefined
    opacity = 1
    color = '#fff'
    colorHSL = [1, 1, 1]
    move = {
        outMode: null as 'out' | 'bounce' | null,
    }

    constructor(main: Main, params: ParticleParams) {
        this.main = main
        Common.adapt(this, params)
    }


    animation?: anime.AnimeInstance
    animate(animateInput: any) {
        animateInput.targets = this
        animateInput.autoplay = false
        animateInput.complete = () => this.destroy()
        this.animation = anime(animateInput)
    }


    update() {
        // 根据速度计算位置
        /* const sizes = this.main.sizes
        const mainParams = this.main.params
        const world = this.main.world
        const { current, delta } = this.main.time
        const { xSpeed, ySpeed, xAccelerated, yAccelerated } = this.attribute

        //  const deltaSec = delta / 1000 //把毫秒转化成秒
        let x = undefined
        if (world.forceMap[Math.floor(this.attribute.y)] && world.forceMap[Math.floor(this.attribute.y)][Math.floor(this.attribute.x)])
            x = world.forceMap[Math.floor(this.attribute.y)][Math.floor(this.attribute.x)]

        const forceCellRatio = x ? x.ratio : 0
        const newXSpeed = xSpeed + xAccelerated
        const xOffset = newXSpeed
        const newYSpeed = yAccelerated + (1 - forceCellRatio) * yAccelerated * 10
        const yOffset = newYSpeed

        if (!Number.isNaN(xOffset) && !Number.isNaN(yOffset)) {
            this.attribute.x += xOffset
            this.attribute.y += yOffset
            this.attribute.xSpeed = newXSpeed
            this.attribute.ySpeed = newYSpeed
        } */


        // 正常重力影响流程
        /*  
         const deltaSec = delta / 1000 //把毫秒转化成秒
         const newXSpeed = xSpeed + xAccelerated
         const xOffset = newXSpeed * deltaSec
         const newYSpeed = ySpeed + yAccelerated
         const yOffset = newYSpeed * deltaSec
 
         if (!Number.isNaN(xOffset) && !Number.isNaN(yOffset)) {
             this.attribute.x += xOffset
             this.attribute.y += yOffset
             this.attribute.xSpeed = newXSpeed
             this.attribute.ySpeed = newYSpeed
         } */



        // 颜色
        /* const colorHSL = this.attribute.colorHSL
        colorHSL[2] -= 0.005
        colorHSL[0] = current
        this.attribute.color = `hsl(${colorHSL[0] / 10}, 100%, ${colorHSL[2] * 100}%)`; */
        //
        /* this.attribute.size -= mainParams.particles.vanish.speed * delta / 1000 */
        /* if (this.attribute.size <= 0) return this.destroy() */


        /* if (world.rigids && world.rigids.size) {
            for (let rigid of world.rigids) {
                if (this.attribute.x > rigid.left && this.attribute.x < rigid.left + rigid.width && this.attribute.y > rigid.top && this.attribute.y < rigid.top + rigid.heigth) {
                    this.attribute.y = this.attribute.y - (this.attribute.y - rigid.top) * 2
                    this.attribute.ySpeed *= -0.9
                }
            }
        }



        
        
         */
        /* if (this.attribute.x < -this.attribute.size) this.attribute.x = sizes.width
        else if (this.attribute.x > sizes.width) this.attribute.x = 0 */
        /* if (this.attribute.y > sizes.height + this.attribute.size) {
            this.attribute.y = -this.attribute.size
            this.attribute.ySpeed = 0
        } else if (this.attribute.y < -this.attribute.size) {
            this.attribute.y = sizes.height + this.attribute.size
            this.attribute.ySpeed = 0
        }
        */
        if (this.animation)
            this.animation.tick(this.main.time.elapsed)
        this.render()
    }



    render() {
        // 渲染自己
        const { ctx, params } = this.main
        const fullRound = Math.PI * 2
        const { x, y, size } = this
        if (ctx.globalAlpha !== this.opacity)
            ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, fullRound);
        //ctx.closePath();
        if (this.stroke) {
            ctx.strokeStyle = this.stroke.color;
            ctx.lineWidth = this.stroke.width;
            ctx.stroke();
        }
        if (this.fill) {
            ctx.fillStyle = this.fill.color;
            ctx.fill();
        }
        // 渲染连线
        /*  if (params.particles.linked.enable) {
             for (let otherParticle of this.main.world.particlesList) {
                 if (this === otherParticle) continue;
                 const dx = this.attribute.x - otherParticle.attribute.x
                 const dy = this.attribute.y - otherParticle.attribute.y
                 const distance = Math.sqrt(dx * dx + dy * dy)
                 if (distance < 100) {
                     ctx.strokeStyle = this.attribute.color
                     ctx.lineWidth = this.attribute.size / 3
                     ctx.beginPath();
                     ctx.moveTo(this.attribute.x, this.attribute.y)
                     ctx.lineTo(otherParticle.attribute.x, otherParticle.attribute.y)
                     ctx.stroke()
                 }
             }
         } */
    }

    destroy() {
        this.main.emit(this.Event_Destroy)
    }
    onDestroy(fun: Function) {
        this.main.once(this.Event_Destroy, fun)
    }
}

class EmitterParticle extends Particle {
    constructor(main: Main, params: ParticleParams) {
        super(main, params)
        this.type = 'emit'
    }
}






































class ParticlesList<T> extends Set<T> {
    main: Main
    constructor(main: Main) {
        super()
        this.main = main
    }
    add(value: T): this {
        super.add(value)
        this.main.render()
        return this
    }
    delete(value: T): boolean {
        const result = super.delete(value)
        if (this.size === 0)
            this.main.paused()
        return result
    }
}

class World {
    main: Main

    constructor(main: Main) {
        this.main = main

        // Resize
        //  this.setControls()
        //  this.animate()


        this.particlesList = new ParticlesList(this.main)
        this.main.controler.onClick(this.emitClickEffect)


        //this.createBaseParticles()
        // this.createBaseRigids()
    }


    emitClickEffect = (x: number, y: number) => {
        //console.log(x,y)
        this.createEmitterParticles(x, y)
    }


    particlesList: ParticlesList<Particle>

    // 放入原始的粒子
    //createBaseParticles() {}

    // 放入触发的粒子
    createEmitterParticles(x: number, y: number) {
        // 计算位置距离最远的范围边角距离
        const calcPageFillRadius = (x: number, y: number, width: number, height: number) => {
            const l = Math.max(x - 0, width - x);
            const h = Math.max(y - 0, height - y);
            return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
        }

        // 准备
        const sizes = this.main.sizes
        const colorParams = this.main.params.particles.color
        const oldColor = colorParams.value
        const newColor = colorParams.next()
        const fillRadius = calcPageFillRadius(x, y, sizes.width, sizes.height);// 背景填充的半径
        const rippleRadius = Math.min(200, sizes.width * 0.4, sizes.height * 0.4);// 涟漪的半径


        // 添加背景爆炸
        const fillBackgroundParticle = (() => {
            const emitterParticle = new EmitterParticle(this.main, {
                x, y,
                size: 0,
                fill: {
                    color: newColor,
                },
            })
            emitterParticle.animate({
                size: fillRadius,
                duration: Math.max(fillRadius / 2, 750),
                easing: "easeOutQuart",
            })
            emitterParticle.onDestroy(() => {
                colorParams.backgroundFill = newColor
                this.particlesList.delete(emitterParticle)
            })
            this.particlesList.add(emitterParticle)
            return emitterParticle
        })()

        // 添加爆炸冲击波
        const rippleParticle = (() => {
            const emitterParticle = new EmitterParticle(this.main, {
                x, y,
                size: 0,
                fill: {
                    color: oldColor,
                },
                stroke: {
                    width: 3,
                    color: oldColor
                },
                opacity: 1,
            })
            emitterParticle.animate({
                size: rippleRadius,
                opacity: 0,
                duration: 900,
                easing: "easeOutExpo",
            })
            emitterParticle.onDestroy(() => {
                this.particlesList.delete(emitterParticle)
            })
            this.particlesList.add(emitterParticle)
            return emitterParticle
        })()

        // 添加爆炸小碎片
        for (var i = 0; i < 32; i++) {
            const emitterParticle = new EmitterParticle(this.main, {
                x, y,
                size: anime.random(24, 48),
                fill: {
                    color: oldColor,
                },
            })
            emitterParticle.animate({
                x: x + anime.random(rippleRadius, -rippleRadius),
                y: y + anime.random(rippleRadius * 1.15, -rippleRadius * 1.15),
                size: 0,
                easing: "easeOutExpo",
                duration: anime.random(1000, 1300),
            })
            emitterParticle.onDestroy(() => {
                this.particlesList.delete(emitterParticle)
            })
            this.particlesList.add(emitterParticle)
        }
    }


    /* rigids = new Set<Rigid>()
    createBaseRigids() {
        const rigid = new Rigid(this.main)
        this.rigids.add(rigid)
    } */



    /* static createForceMapPixels = (world: World) => {
        const forceMap = world.forceMap
        const height = forceMap.length
        const width = forceMap[0].length
        const imageData = world.main.ctx.createImageData(width, height);
        for (let y = 0; y < height; y++) {
            const list = forceMap[y]
            for (let x = 0; x < width; x++) {
                const index = (y * width + x) * 4
                const brightness = Math.round(list[x].brightness)
                imageData.data[index + 0] = brightness;  // R value
                imageData.data[index + 1] = brightness;    // G value
                imageData.data[index + 2] = brightness;  // B value
                imageData.data[index + 3] = 255;  // A value
            }
        }
        world.forceMapPixels = imageData
    }

    static calculateRelativeBrightness = (red: number, green: number, blue: number) => {
        return Math.sqrt(red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114)
    }

    forceMapPixels?: ImageData
    forceMap: { brightness: number, ratio: number, color: string }[][] = []
    //  https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
    createForceMap(image: HTMLImageElement) {
        const canvasDom = window.document.createElement('canvas')
        const width = image.naturalWidth
        const height = image.naturalWidth
        canvasDom.width = width
        canvasDom.height = height
        const ctx = canvasDom.getContext("2d") as CanvasRenderingContext2D
        ctx.drawImage(image, 0, 0)
        const pixels = ctx.getImageData(0, 0, width, height)
        this.forceMap = []
        const forceMap = this.forceMap
        let min = Infinity, max = -Infinity
        for (let y = 0, pixelsData = pixels.data; y < height; y++) {
            const list = []
            for (let x = 0; x < width; x++) {
                const index = (y * width + x) * 4
                const red = pixelsData[index]
                const green = pixelsData[index + 1]
                const blue = pixelsData[index + 2]
                //const alpha = pixelsData[index+3]
                const brightness = World.calculateRelativeBrightness(red, green, blue)
                list.push({ brightness, ratio: 0, color: `rgb(${red},${green},${blue})` })
                min = Math.min(brightness, min)
                max = Math.max(brightness, max)
            }
            forceMap.push(list)
        }
        // 建立立场系数
        for (let list of forceMap) {
            for (let item of list) {
                item.ratio = (item.brightness - min) / (max - min)
            }
        }
        // console.log(forceMap)
        // 测试用
        World.createForceMapPixels(this)
        this.forceMapPixels && this.main.ctx.putImageData(this.forceMapPixels, 0, 0);
    }


    bgImage?: HTMLImageElement
    setBackground(image: HTMLImageElement) {
        this.bgImage = image
        this.main.sizes.updateSize(this.bgImage.naturalWidth, this.bgImage.naturalHeight)
        this.createForceMap(image)
    } */




    render() {
        // 更新内容并渲染
        for (let particle of this.particlesList) {
            particle.update()
        }
    }

}

class Renderer {
    main: Main

    constructor(main: Main) {
        // Setup
        this.main = main
        this.main.time.onTick(this.render)
    }


    render = () => {
        const { ctx, sizes, world, params } = this.main
        //ctx.globalAlpha = 0.05
        ctx.fillStyle = params.particles.color.backgroundFill
        ctx.fillRect(0, 0, sizes.width, sizes.height)
        world.render()
    }
}








































class Main extends EventEmitter {
    params = {
        "helper": {
            "stats": {
                "enable": true
            },
            "gui": {
                "enable": true
            }
        },
        "particles": {
            "emitterNumber": {
                "value": 2,
            },
            "vanish": {
                "speed": 7,
            },
            "color": {
                "backgroundFill": "#FF6138",
                "value": "#FF6138",
                "index": 0,
                "randomIndex": false,
                "list": ["#FF6138", "#FFBE53", "#2980B9", "#282741"],
                next() {
                    const index = typeof this.index !== 'number' || Number.isNaN(this.index) ? 0 :
                        this.randomIndex ? ((result: number) => {
                            do { result = Math.floor(Math.random() * this.list.length) } while (result === this.index)
                            return result
                        })(this.index) : (this.index + 1) % this.list.length
                    this.index = index
                    this.value = this.list[index]
                    return this.value
                }
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
        },
    }
    //
    static Event_Tick = Symbol()
    static Event_Resize = Symbol()
    static Event_Destroyed = Symbol()

    //
    time: Time
    sizes: Sizes
    renderer: Renderer
    controler: Controler
    world: World
    viewContainerDom: HTMLElement
    canvasDom = window.document.createElement('canvas')
    ctx = this.canvasDom.getContext("2d") as CanvasRenderingContext2D
    //
    stats?: Stats
    particleHelper?: ParticleHelper
    //
    constructor(viewContainerDom: HTMLElement, params?: any) {
        super()
        // init
        this.viewContainerDom = viewContainerDom
        // 装载
        this.viewContainerDom.appendChild(this.canvasDom)
        // 装载控制器
        if (this.params.helper.stats.enable)
            this.stats = new Stats(viewContainerDom)
        if (this.params.helper.gui.enable)
            this.particleHelper = new ParticleHelper(this)
        // Setup
        this.time = new Time(this)
        this.sizes = new Sizes(this, { fit: Sizes.Fit_None })
        this.controler = new Controler(this)
        this.renderer = new Renderer(this)
        this.world = new World(this)
        // init
    }

    render() {
        this.time.tick()
    }
    paused() {
        this.time.paused()
    }

    onDestroyed(fun: Function) {
        return this.once(Main.Event_Destroyed, fun)
    }

    destroy() {
        this.emit(Main.Event_Destroyed); // Emit Destroyed Event
    }

}


export default Main