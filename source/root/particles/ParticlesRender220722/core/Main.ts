import { EventEmitter } from "@src/utils/EventEmitter"
import { Stats } from '@src/utils/Stats'
import { DatGui } from "@src/utils/DatGui";


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















class GuiHelper {
    main: Main
    datGui: DatGui
    constructor(main: Main) {
        this.main = main
        this.datGui = new DatGui()
        this.datGui.appendGuiTo(this.main.viewContainerDom)
        this.main.onDestroyed(() => this.datGui.destroy())
        Promise.resolve().then(() => this.init())
    }

    init() {
        const main = this.main
        const datGui = this.datGui
        const { particles, renderer } = this.main.params
        //
        const RendererFolder = datGui.ui.addFolder('Renderer')
        RendererFolder.open()
        const RendererFolderParams = {
            isRendering: true
        }
        RendererFolder.add(RendererFolderParams, 'isRendering').onFinishChange((val) => {
            if (val) main.render()
            else main.paused()
        })


        const particlesFolder = datGui.ui.addFolder('Particles')
        particlesFolder.open()
        particlesFolder.add(main.params.particles.baseNumber, 'value', 200, 5000, 1).name('Particles Base Numbers').onFinishChange((val) => {
            main.world.createBaseParticles()
        })
        /* //     
        
        
        const cEmitterNumber = particlesFolder.add(particles.emitterNumber, 'value', 1, 100, 1).name('EmitterNumber')
        const cVanishSpeed = particlesFolder.add(particles.vanish, 'speed', 1, 100, 1).name('VanishSpeed')
        const cLinked = particlesFolder.add(particles.linked, 'enable').name('Linked')
        const cClearModes = particlesFolder.add({ clearModes: 'normal' }, 'clearModes', Object.keys(renderer.clearModes)).name('ClearModes')
            .onChange((val) => val in renderer.clearModes && (renderer.clearModes as any)[val].use())
  */
        const BackgroundFolder = datGui.ui.addFolder('Background')
        BackgroundFolder.open()
        const BackgroundFolderParams = {
            updateAndShowPointsRatio() {
                main.world.background.updatePointsRatio()
                main.world.background.showPointsRatioMap(true)
            },
            showPointsRatioMap() {
                main.world.background.showPointsRatioMap()
            },
            showPointsBrightnessMap() {
                main.world.background.showPointsBrightnessMap()
            },
            showPointsColorMap() {
                main.world.background.showPointsColorMap()
            }
        }
        BackgroundFolder.add(main.world.background, 'pointRatioConstant', 0.001, 1, 0.001).name('Point Ratio Constant')
            .onFinishChange(() => BackgroundFolderParams.updateAndShowPointsRatio())
        BackgroundFolder.add(main.world.background, 'pointRatioPower', 0.1, 4, 0.1).name('Point Ratio Power')
            .onFinishChange(() => BackgroundFolderParams.updateAndShowPointsRatio())
        BackgroundFolder.add(BackgroundFolderParams, 'showPointsRatioMap').name('Show Points Ratio')
        BackgroundFolder.add(BackgroundFolderParams, 'showPointsBrightnessMap').name('Show Points Brightness')
        BackgroundFolder.add(BackgroundFolderParams, 'showPointsColorMap').name('Show Points Color')
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
    xSpeed?: number
    ySpeed?: number
    xAccelerated?: number
    yAccelerated?: number
    size?: number
    fillStyle?: string
    strokeStyle?: string
    lineWidth?: number
    alpha?: number
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
    fillStyle?: string = '#fff'
    strokeStyle?: string
    lineWidth: number = 0
    alpha = 1
    color = '#fff'
    colorHSL = [1, 1, 1]
    angle = 0

    /* move = {
        outMode: null as 'out' | 'bounce' | null,
    }
    static modes = {
        bubble(particle: Particle) {
            const attribute = particle.attribute
            const main = particle.main
            const { target } = main.controler
            const { bubble } = main.params.interactivity.modes
            const distance = Math.sqrt(Math.pow(target.x - attribute.x, 2) + Math.pow(target.y - attribute.y, 2))
            if (distance < bubble.distance) {
                attribute.renderSize = Math.max(attribute.size, bubble.size * (1 - (distance / bubble.distance)))
            } else {
                attribute.renderSize = attribute.size
            }
        }
    } */


    constructor(main: Main, params: ParticleParams) {
        this.main = main
        Common.adapt(this, params)
    }

    update() {
        // 根据速度计算位置
        const sizes = this.main.sizes
        const mainParams = this.main.params
        const world = this.main.world
        const { current, delta } = this.main.time
        const { xSpeed, ySpeed, xAccelerated, yAccelerated } = this

        //  const deltaSec = delta / 1000 //把毫秒转化成秒
        let points = undefined
        if (world.background.points?.[Math.floor(this.y)]?.[Math.floor(this.x)])
            points = world.background.points[Math.floor(this.y)][Math.floor(this.x)]

        const forceCellRatio = points ? points.ratio : 0
        const forceCellBrightness = points ? points.brightness : 0
        this.fillStyle = points ? points.color : '#000'


        //this.angle +=1
        //this.angle%=360
        this.angle += forceCellBrightness / 100 / 20
        //const arc=this.angle*Math.PI/180


        const newXSpeed = xSpeed + xAccelerated
        //const xOffset = newXSpeed
        //const newYSpeed =  yAccelerated + (1 - forceCellRatio) * yAccelerated * 2
        const newYSpeed = (255 - forceCellBrightness) / 100 + yAccelerated
        //const newYSpeed =2.55*(1-forceCellRatio) +  yAccelerated 
        const xOffset = newYSpeed + Math.cos(this.angle)
        const yOffset = newYSpeed + Math.sin(this.angle)


        if (!Number.isNaN(xOffset) && !Number.isNaN(yOffset)) {
            this.x += xOffset
            this.y += yOffset
            this.xSpeed = newXSpeed
            this.ySpeed = newYSpeed
        }


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
        if (this.y > sizes.height + this.size) {
            this.y = -this.size
            this.ySpeed = 0
        } else if (this.y < -this.size) {
            this.y = sizes.height + this.size
            this.ySpeed = 0
        }
        if (this.x > sizes.width + this.size) {
            this.x = -this.size
            this.xSpeed = 0
        } else if (this.x < -this.size) {
            this.x = sizes.width + this.size
            this.xSpeed = 0
        }
        this.render(forceCellRatio, forceCellBrightness)
        //this.render()
    }

    render(ratio: number, forceCellBrightness: number) {
        // 渲染自己
        const { ctx, params } = this.main
        const fullRound = Math.PI * 2
        const { x, y, size } = this
        ctx.beginPath();
        ctx.arc(x, y, size, 0, fullRound);
        //ctx.globalAlpha = 0.5+ ratio
        ctx.globalAlpha = 0.2 + forceCellBrightness / 255 * 0.5
        if (this.fillStyle) {
            ctx.fillStyle = this.fillStyle;
            ctx.fill();
        }
        /* if (this.strokeStyle) {
            ctx.strokeStyle = this.strokeStyle;
            ctx.lineWidth = this.lineWidth;
            ctx.stroke();
        } */
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


type Point = {
    brightness: number
    ratio: number
    color: string
    //brightnessColor: string
}
class Background {
    image?: HTMLImageElement
    main: Main

    constructor(main: Main) {
        this.main = main
    }

    use(image: HTMLImageElement) {
        this.image = image
        this.main.sizes.update({ width: this.image.naturalWidth, height: this.image.naturalHeight })
        this.updatePoints()
    }

    points?: Point[][] //每次更新必须新建
    pointMinBrightness = Infinity
    pointMaxBrightness = -Infinity
    updatePoints() {
        if (!this.image) return;
        // 预设
        const image = this.image
        const canvasDom = window.document.createElement('canvas')
        const width = image.naturalWidth
        const height = image.naturalHeight
        canvasDom.width = width
        canvasDom.height = height
        const ctx = canvasDom.getContext("2d") as CanvasRenderingContext2D
        ctx.drawImage(image, 0, 0)
        const pixels = ctx.getImageData(0, 0, width, height)
        const points: Point[][] = this.points = [] //每次更新必须新建
        // 准备工具函数
        const calculateRelativeBrightness = (red: number, green: number, blue: number) => {
            return Math.sqrt(red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114)
        }
        const calculateHexColor = (red: number, green: number, blue: number) => {
            const fillHexZero = (n: number) => (n < 16 ? '0' : '') + n.toString(16)
            return `#${fillHexZero(red)}${fillHexZero(green)}${fillHexZero(blue)}`
        }
        // 计算
        let min = Infinity, max = -Infinity
        for (let y = 0, pixelsData = pixels.data; y < height; y++) {
            const list = []
            for (let x = 0; x < width; x++) {
                const index = (y * width + x) * 4
                const red = pixelsData[index]
                const green = pixelsData[index + 1]
                const blue = pixelsData[index + 2]
                //const alpha = pixelsData[index+3]
                const brightness = calculateRelativeBrightness(red, green, blue)
                const color = calculateHexColor(red, green, blue)
                //const brightnessColor = calculateHexColor(Math.round(brightness), Math.round(brightness), Math.round(brightness))
                list.push({ brightness, color, ratio: 0 })
                min = Math.min(brightness, min)
                max = Math.max(brightness, max)
            }
            points.push(list)
        }
        this.pointMinBrightness = min
        this.pointMaxBrightness = max
        this.updatePointsRatio()
    }

    pointRatioConstant = 0.25//0.5
    pointRatioPower = 0.5//1.5
    updatePointsRatio() {
        if (!this.points) return;
        const points = this.points
        const min = this.pointMinBrightness
        const max = this.pointMaxBrightness
        const constant = this.pointRatioConstant
        const power = this.pointRatioPower
        for (let list of points) {
            for (let item of list) {
                let ratio = (item.brightness - min) / (max - min)
                ratio = constant * ratio ** power / (1 - ratio)
                ratio = ratio > 1 ? 1 : ratio
                item.ratio = ratio
            }
        }
    }


    pointsRatioMapBook = new WeakMap()
    showPointsRatioMap(force?: boolean) {
        const points = this.points
        const book = this.pointsRatioMapBook
        if (!points) return;
        let pixels = book.get(points)
        // 如果存在直接放图，不存在则计算像素
        if (force || !pixels) {
            const height = points.length
            const width = points[0].length
            pixels = this.main.ctx.createImageData(width, height);
            for (let y = 0; y < height; y++) {
                const list = points[y]
                for (let x = 0; x < width; x++) {
                    const index = (y * width + x) * 4
                    const brightness = Math.floor(list[x].ratio * 256)
                    pixels.data[index + 0] = brightness;  // R value
                    pixels.data[index + 1] = brightness;    // G value
                    pixels.data[index + 2] = brightness;  // B value
                    pixels.data[index + 3] = 255;  // A value
                }
            }
            book.set(points, pixels)
        }
        this.main.ctx.putImageData(pixels, 0, 0);
    }

    pointsBrightnessMapBook = new WeakMap()
    showPointsBrightnessMap(force?: boolean) {
        const points = this.points
        const book = this.pointsBrightnessMapBook
        if (!points) return;
        let pixels = book.get(points)
        // 如果存在直接放图，不存在则计算像素
        if (force || !pixels) {
            const height = points.length
            const width = points[0].length
            pixels = this.main.ctx.createImageData(width, height);
            for (let y = 0; y < height; y++) {
                const list = points[y]
                for (let x = 0; x < width; x++) {
                    const index = (y * width + x) * 4
                    const brightness = Math.round(list[x].brightness)
                    pixels.data[index + 0] = brightness;  // R value
                    pixels.data[index + 1] = brightness;    // G value
                    pixels.data[index + 2] = brightness;  // B value
                    pixels.data[index + 3] = 255;  // A value 
                }
            }
            book.set(points, pixels)
        }
        this.main.ctx.putImageData(pixels, 0, 0);
    }

    pointsColorMapBook = new WeakMap()
    showPointsColorMap(force?: boolean) {
        const points = this.points
        const book = this.pointsColorMapBook
        if (!points) return;
        let pixels = book.get(points)
        // 如果存在直接放图，不存在则计算像素
        if (force || !pixels) {
            const height = points.length
            const width = points[0].length
            pixels = this.main.ctx.createImageData(width, height);
            for (let y = 0; y < height; y++) {
                const list = points[y]
                for (let x = 0; x < width; x++) {
                    const index = (y * width + x) * 4
                    const color = list[x].color
                    pixels.data[index + 0] = parseInt(color.slice(1, 3), 16);  // R value
                    pixels.data[index + 1] = parseInt(color.slice(3, 5), 16);    // G value
                    pixels.data[index + 2] = parseInt(color.slice(5, 7), 16);  // B value
                    pixels.data[index + 3] = 255;  // A value 
                }
            }
            book.set(points, pixels)
        }
        this.main.ctx.putImageData(pixels, 0, 0);
    }

}



class World {
    main: Main

    background: Background
    constructor(main: Main) {
        this.main = main

        // Resize
        //  this.setControls()
        //  this.animate()

        this.background = new Background(this.main)


        // this.main.controler.onChenged(this.controlerChenged)



        this.createBaseParticles()
        // this.createBaseRigids()

    }



    controlerChenged = (type: string, x: number, y: number) => {
        //console.log(type,x,y)
        if (type === 'move') {
            //this.createEmitterParticles(x, y)
        }
    }

    particlesList = new Set<Particle>()

    // 放入原始的粒子
    createBaseParticles() {
        // 删除当前的粒子
        for (let particle of this.particlesList) {
            if (particle.type === 'base') {
                this.particlesList.delete(particle)
            }
        }
        // 加入粒子
        const { params, sizes } = this.main
        const number = params.particles.baseNumber.value * (params.particles.baseNumber.density.enable ?
            Math.round(sizes.width * sizes.height / (params.particles.baseNumber.density.value ** 2)) : 1)
        console.log('当前粒子数',number)
        for (let i = 0; i < number; i++) {
            const size = 1.5
            const particle = new Particle(this.main, {
                size: size, //Math.random() * 5
                x: Math.random() * sizes.width,
                y: -size,
                xSpeed: 0,
                ySpeed: 0,
                xAccelerated: 0,
                yAccelerated: 0.1 + Math.random() * 0.5,
                fillStyle: '#fff',
                //particle.attribute.move.outMode = 'bounce'// 设置反弹
            })
            this.particlesList.add(particle)
            particle.onDestroy = () => this.particlesList.delete(particle)

        }
    }

    // 放入触发的粒子
    /* createEmitterParticles(x: number, y: number) {
        const { params, sizes } = this.main
        const number = params.particles.emitterNumber.value;
        for (let i = 0; i < number; i++) {
            const particle = new Particle(this.main, 'emit')
            this.particlesList.add(particle)
            particle.onDestroy = () => this.particlesList.delete(particle)
            const size = 20
            particle.size = 1 + Math.random() * size / 2
            particle.x = x
            particle.y = y
            //particle.vector = Math.random() * Math.PI * 2
            //particle.speed = 10 + 80 * Math.random()
            particle.color = '#fff'
        }
    } */


    /* rigids = new Set<Rigid>()
    createBaseRigids() {
        const rigid = new Rigid(this.main)
        this.rigids.add(rigid)
    } */



    //  https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas

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
        //this.main.world.forceMapPixels && this.main.ctx.putImageData(this.main.world.forceMapPixels, 0, 0);
        ctx.globalAlpha = 1
        ctx.fillStyle = 'rgba(0,0,0,0.05)'
        ctx.fillRect(0, 0, sizes.width, sizes.height)
        ctx.globalAlpha = 0.2
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
            "baseNumber": {
                "value": 500,
                "density": {
                    "enable": true,
                    "value": 500,// 面积
                }
            },
            "emitterNumber": {
                "value": 2,

            },
            "vanish": {
                "speed": 7,
            },
            "color": {
                "value": "#ffffff"
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
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 5,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "linked": {
                "enable": false,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "outMode": "out",// out | bounce
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "renderer": {
            "clearColor": '#fff',
            "clearModes": {
                "normal": {
                    "color": '#fff',
                    use: () => {
                        this.params.renderer.clearColor = this.params.renderer.clearModes.normal.color
                    }
                },
                "afterimage": {
                    "color": 'rgba(0,0,0,0.1)',
                    use: () => {
                        this.params.renderer.clearColor = this.params.renderer.clearModes.afterimage.color
                    }
                }
            },

        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 100,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true,
        "config_demo": {
            "hide_card": false,
            "background_color": "#b61924",
            "background_image": "",
            "background_position": "50% 50%",
            "background_repeat": "no-repeat",
            "background_size": "cover"
        }
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
    guiHelper?: GuiHelper
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
            this.guiHelper = new GuiHelper(this)
        // Setup
        this.time = new Time(this)
        this.sizes = new Sizes(this, { fit: Sizes.Fit_Contain })
        this.controler = new Controler(this)
        this.renderer = new Renderer(this)
        this.world = new World(this)
        // init

        this.params.renderer.clearModes.afterimage.use()
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