import { EventEmitter } from "@src/utils/EventEmitter"
import { Stats } from '@src/utils/Stats'
import { DatGui } from "@src/utils/DatGui";
import { HtmlAttributes } from "csstype";





class Common {
    static adapt(source: any, target: any) {

    }
}











class Sizes {
    main: Main
    width = 0;
    height = 0;
    //pixelRatio = 0;//可能有用，直接提高或降低分辨率

    constructor(main: Main) {
        // Setup
        this.main = main
        this.updateSize()

        // Resize event    
        Sizes.resizeObserve(this)
    }

    static resizeObserve(sizes: Sizes) {
        const main = sizes.main
        if (window.ResizeObserver) {
            const resizeObserver = new ResizeObserver((entries) => sizes.updateSize());
            resizeObserver.observe(main.viewContainerDom)
            main.onDestroyed(() => resizeObserver.disconnect())
        } else {
            const onresize = () => sizes.updateSize()
            window.addEventListener('resize', onresize)
            main.onDestroyed(() => window.removeEventListener('resize', onresize))
        }
    }

    updateSize() {
        const { viewContainerDom, canvasDom } = this.main
        if (!viewContainerDom || !canvasDom) return;
        const { offsetWidth: width, offsetHeight: height } = viewContainerDom
        this.width = width;
        this.height = height;
        //this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        // 更新画布
        canvasDom.width = width
        canvasDom.height = height
        canvasDom.style.width = width + 'px'
        canvasDom.style.height = height + 'px'
        //
        this.main.emit(Main.Event_Resize)
    }

    onResize(fun: Function) {
        return this.main.on(Main.Event_Resize, fun)
    }
}





























class Time {
    main: Main
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
        this.elapsed = 0
        this.delta = 16
    }

    requestAnimationFrameID = 0
    onTickLoopFunction = () => {
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start

        this.main.emit(Main.Event_Tick);

        if (this.currentTickLoopFunction)
            this.requestAnimationFrameID = window.requestAnimationFrame(this.currentTickLoopFunction as () => {})
    }

    // 当清除时，函数为空函数已终结 requestAnimationFrame
    currentTickLoopFunction?: Function


    // Tick 
    isTicking = false
    tick() {
        //避免重复启动 currentTickLoopFunction
        if (!this.currentTickLoopFunction) {
            this.currentTickLoopFunction = this.main.params.helper.stats.enable ? () => {
                this.main.stats?.begin()
                this.onTickLoopFunction()
                this.main.stats?.end()
            } : this.onTickLoopFunction;
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
            this.currentTickLoopFunction = undefined
            this.isTicking = false
        }
    }

    onTick(fun: Function) {
        return this.main.on(Main.Event_Tick, fun)
    }
}






















class Controler {
    main: Main
    target = {
        x: NaN,
        y: NaN,
    }

    constructor(main: Main) {
        // Setup
        this.main = main

        // Setup
        Controler.deployControls(this)
    }

    static deployControls(controler: Controler) {
        const { canvasDom } = controler.main
        const updateControler = (type: 'move' | 'click', x: number, y: number) => {
            controler.target.x = x
            controler.target.y = y
            controler.main.emit(Main.Event_Controler_Changed, type, x, y)
        }
        const onMove = (event: MouseEvent) => {
            updateControler('move', (event as any).layerX as number, (event as any).layerY as number)//稳定版需要通过转换得到数据，layerX,layerY不是标准方案
        }
        canvasDom.addEventListener('mousemove', onMove)
        controler.main.onDestroyed(() => canvasDom.removeEventListener('mousemove', onMove))
    }

    onChenged(fun: Function) {
        return this.main.on(Main.Event_Controler_Changed, fun)
    }

}











class ParticleHelper {
    main: Main
    datGui: DatGui
    constructor(main: Main) {
        this.main = main
        this.datGui = new DatGui(this.main.viewContainerDom)
        //
        const { particles, renderer } = this.main.params

        //     
        const particlesFolder = this.datGui.ui.addFolder('Particles')
        particlesFolder.open()
        const cEmitterNumber = particlesFolder.add(particles.emitterNumber, 'value').name('EmitterNumber').min(1).max(100).step(1)
        const cVanishSpeed = particlesFolder.add(particles.vanish, 'speed').name('VanishSpeed').min(1).max(100).step(1)
        const cLinked = particlesFolder.add(particles.linked, 'enable').name('Linked')
        const cAfterimage = particlesFolder.add(renderer.modes.afterimage, 'enable').name('Afterimage')
            .onChange(renderer.modes.afterimage.change)
        const funs = {
            Demo1() {
                cEmitterNumber.setValue(2)
                cVanishSpeed.setValue(7)
                cLinked.setValue(true)
                cAfterimage.setValue(false)
            },
            Demo2() {
                cEmitterNumber.setValue(15)
                cVanishSpeed.setValue(2)
                cLinked.setValue(false)
                cAfterimage.setValue(false)
            },
            Demo3() {
                cEmitterNumber.setValue(30)
                cVanishSpeed.setValue(8)
                cLinked.setValue(false)
                cAfterimage.setValue(true)
            }
        }
        particlesFolder.add(funs, 'Demo1').name('科幻网格')
        particlesFolder.add(funs, 'Demo2').name('浪漫')
        particlesFolder.add(funs, 'Demo3').name('花火')
    }
}






class Particle {
    main: Main
    type: 'base' | 'emit'
    attribute = {
        x: NaN,
        y: NaN,
        size: NaN,
        renderSize: NaN,
        vector: NaN,
        speed: NaN,
        color: '#fff',
        colorHSL: [1, 1, 1],
        move: {
            outMode: null as 'out' | 'bounce' | null,
        }
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
    }


    onDestroy: Function | undefined = undefined
    constructor(main: Main, type: 'base' | 'emit') {
        this.main = main
        this.type = type
    }

    update() {
        // 根据速度计算位置
        const sizes = this.main.sizes
        const mainParams = this.main.params
        const { current, delta } = this.main.time
        const { vector, speed } = this.attribute

        const length = speed * delta / 1000 //把毫秒转化成秒
        const outMode = this.attribute.move.outMode ? this.attribute.move.outMode : this.main.params.particles.move.outMode
        if (!Number.isNaN(vector) && !Number.isNaN(speed)) {
            this.attribute.x += Math.sin(vector) * length
            this.attribute.y += Math.cos(vector) * length
        }
        // 颜色
        const colorHSL = this.attribute.colorHSL
        colorHSL[2] -= 0.005
        colorHSL[0] = current
        this.attribute.color = `hsl(${colorHSL[0] / 10}, 100%, ${colorHSL[2] * 100}%)`;
        //
        this.attribute.size -= mainParams.particles.vanish.speed * delta / 1000
        if (this.attribute.size <= 0) return this.destroy()
        this.render()
    }

    render() {
        // 渲染自己
        const { ctx, params } = this.main
        const fullRound = Math.PI * 2
        const { x, y, size, color } = this.attribute
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, fullRound);
        ctx.fill();
        // 渲染连线
        if (params.particles.linked.enable) {
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
        }
    }

    destroy() {
        if (typeof this.onDestroy === 'function')
            this.onDestroy()
    }
}

class World {
    main: Main

    constructor(main: Main) {
        this.main = main

        // Resize
        //this.setControls()
        //this.animate()

        this.main.controler.onChenged(this.controlerChenged)


        //this.createBaseParticles()


    }

    controlerChenged = (type: string, x: number, y: number) => {
        //console.log(type,x,y)
        if (type === 'move') {
            this.createEmitterParticles(x, y)
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
        for (let i = 0; i < number; i++) {
            const particle = new Particle(this.main, 'base')
            this.particlesList.add(particle)
            particle.onDestroy = () => this.particlesList.delete(particle)
            const size = 10
            particle.attribute.size = 1 + Math.random() * 5
            particle.attribute.x = size + Math.random() * (sizes.width - size * 2)
            particle.attribute.y = size + Math.random() * (sizes.height - size * 2)
            particle.attribute.vector = Math.random() * Math.PI * 2
            particle.attribute.speed = 5 + Math.random() * Math.PI * 20
            particle.attribute.color = '#000'
            particle.attribute.move.outMode = 'bounce'// 设置反弹
        }
    }

    // 放入触发的粒子
    createEmitterParticles(x: number, y: number) {
        const { params, sizes } = this.main
        const number = params.particles.emitterNumber.value;
        for (let i = 0; i < number; i++) {
            const particle = new Particle(this.main, 'emit')
            this.particlesList.add(particle)
            particle.onDestroy = () => this.particlesList.delete(particle)
            const size = 20
            particle.attribute.size = 1 + Math.random() * size / 2
            particle.attribute.x = x
            particle.attribute.y = y
            particle.attribute.vector = Math.random() * Math.PI * 2
            particle.attribute.speed = 10 + 80 * Math.random()
            particle.attribute.color = '#fff'
        }
    }

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
        ctx.fillStyle = params.renderer.clearColor
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
            "baseNumber": {
                "value": 500,
                "density": {
                    "enable": true,
                    "value": 800,// 面积
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
                "enable": true,
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
            "modes": {
                "afterimage": {
                    "enable": false,
                    "change": (val: boolean) => {
                        this.params.renderer.modes.afterimage.enable = val
                        this.params.renderer.clearColor = val ? 'rgba(0,0,0,0.1)' : '#000'
                    }
                }
            },
            "clearColor": '#000',
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
    static Event_Controler_Changed = Symbol()
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
        this.sizes = new Sizes(this)
        this.controler = new Controler(this)
        this.renderer = new Renderer(this)
        this.world = new World(this)
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