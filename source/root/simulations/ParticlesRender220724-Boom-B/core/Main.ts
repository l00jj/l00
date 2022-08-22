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
        //const cEmitterNumber = particlesFolder.add(particles.color, 'randomIndex').name('RandomColorIndex')
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
    fillStyle?: string
    strokeStyle?: string
    lineWidth: number = 0
    alpha = 1
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
        animateInput.complete = () => {
            this.destroy()
        }
        this.animation = anime(animateInput)
    }


    update() {
        this.animation && this.animation.tick(this.main.time.elapsed)
        this.render()
    }



    render() {
        // 渲染自己
        const { ctx, params } = this.main
        const fullRound = Math.PI * 2
        const { x, y, size } = this
        if (ctx.globalAlpha !== this.alpha)
            ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, fullRound);
        //ctx.closePath();
        if (this.strokeStyle) {
            ctx.strokeStyle = this.strokeStyle;
            ctx.lineWidth = this.lineWidth;
            ctx.stroke();
        }
        if (this.fillStyle) {
            ctx.fillStyle = this.fillStyle;
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
        if (this.size === 0) this.main.paused()
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




        // 准备
        const sizes = this.main.sizes
        const colors = this.main.params.particles.colors
        const rippleRadius = Math.min(200, sizes.width * 0.4, sizes.height * 0.4);// 涟漪的半径
        //
        const randomColor = () => {
            return colors.list[Math.floor(Math.random() * colors.list.length)]
        }
        const setParticuleDirection = (x: number, y: number) => {
            var angle = anime.random(0, 360) * Math.PI / 180;
            var value = anime.random(50, 180);
            var radius = [-1, 1][anime.random(0, 1)] * value;
            return {
                x: x + radius * Math.cos(angle),
                y: y + radius * Math.sin(angle)
            }
        }

        // 添加爆炸冲击波
        const rippleParticle = (() => {
            const emitterParticle = new EmitterParticle(this.main, {
                x, y,
                size: 0,
                strokeStyle: randomColor(),
                lineWidth: 12,
                alpha: 0.5,
            })
            emitterParticle.animate({
                size: anime.random(80, 160),
                strokeStyle: '#fff',
                alpha: {
                    value: 0,
                    easing: "linear",
                },
                lineWidth: 0.001,// 为零会有计算出错的情况
                duration: anime.random(600, 800),
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
                size: anime.random(16, 32),
                fillStyle: randomColor(),
            })
            const p = setParticuleDirection(emitterParticle.x, emitterParticle.y)
            emitterParticle.animate({
                x: p.x,
                y: p.y,
                size: 0,
                easing: "easeOutExpo",
                duration: anime.random(1000, 1300),
            })
            emitterParticle.onDestroy(() => {
                this.particlesList.delete(emitterParticle)
            })
            this.particlesList.add(emitterParticle)
        }


        /* window.human = false;

var canvasEl = document.querySelector('.fireworks');
var ctx = canvasEl.getContext('2d');
var numberOfParticules = 30; */
        //var pointerX = 0;
        //var pointerY = 0;
        /* var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown'; */
        //var colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];
        /* 
        function setCanvasSize() {
          canvasEl.width = window.innerWidth * 2;
          canvasEl.height = window.innerHeight * 2;
          canvasEl.style.width = window.innerWidth + 'px';
          canvasEl.style.height = window.innerHeight + 'px';
          canvasEl.getContext('2d').scale(2, 2);
        }
        
        function updateCoords(e) {
          pointerX = e.clientX || e.touches[0].clientX;
          pointerY = e.clientY || e.touches[0].clientY;
        }
         */
        //canvasEl.getContext('2d').scale(2, 2);

        /* 
        
        function createParticule(x,y) {
          var p = {};
          p.x = x;
          p.y = y;
          p.color = colors[anime.random(0, colors.length - 1)];
          p.radius = anime.random(16, 32);
          p.endPos = setParticuleDirection(p);
          p.draw = function() {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
            ctx.fillStyle = p.color;
            ctx.fill();
          }
          return p;
        }
        
        function createCircle(x,y) {
          var p = {};
          p.x = x;
          p.y = y;
          p.color = '#FFF';
          p.radius = 0.1;
          p.alpha = .5;
          p.lineWidth = 6;
          p.draw = function() {
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
            ctx.lineWidth = p.lineWidth;
            ctx.strokeStyle = p.color;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
          return p;
        }
        
        function renderParticule(anim) {
          for (var i = 0; i < anim.animatables.length; i++) {
            anim.animatables[i].target.draw();
          }
        }
        
        function animateParticules(x, y) {
          var circle = createCircle(x, y);
          var particules = [];
          for (var i = 0; i < numberOfParticules; i++) {
            particules.push(createParticule(x, y));
          }
          anime.timeline().add({
            targets: particules,
            x: function(p) { return p.endPos.x; },
            y: function(p) { return p.endPos.y; },
            radius: 0.1,
            duration: anime.random(1200, 1800),
            easing: 'easeOutExpo',
            update: renderParticule
          })
            .add({
            targets: circle,
            radius: anime.random(80, 160),
            lineWidth: 0,
            alpha: {
              value: 0,
              easing: 'linear',
              duration: anime.random(600, 800),  
            },
            duration: anime.random(1200, 1800),
            easing: 'easeOutExpo',
            update: renderParticule,
            offset: 0
          });
        }
        
        var render = anime({
          duration: Infinity,
          update: function() {
            ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
          }
        });
         */
        /* document.addEventListener(tap, function(e) {
          window.human = true;
          render.play();
          updateCoords(e);
          animateParticules(pointerX, pointerY);
        }, false);
         */
        /* var centerX = window.innerWidth / 2;
        var centerY = window.innerHeight / 2; */
        /* 
        function autoClick() {
          if (window.human) return;
          animateParticules(
            anime.random(centerX-50, centerX+50), 
            anime.random(centerY-50, centerY+50)
          );
          anime({duration: 200}).finished.then(autoClick);
        } */
        /* 
        autoClick();
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize, false); */
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
        if (params.renderer.background.clear.enable) {
            ctx.clearRect(0, 0, sizes.width, sizes.height)
        } else {
            ctx.fillStyle = params.renderer.background.fill.color
            ctx.fillRect(0, 0, sizes.width, sizes.height)
        }
        //ctx.globalAlpha = 0.05
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
            "colors": {
                "backgroundFill": "#FF6138",
                "value": "#FF6138",
                "index": 0,
                "randomIndex": false,
                "list": ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'],
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
        "renderer": {
            "background": {
                "clear": {
                    "enable": true,
                },
                "fill": {
                    "color": "rgba(0,0,0,0)",
                },
            }
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