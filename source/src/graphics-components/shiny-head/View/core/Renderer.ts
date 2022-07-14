import * as THREE from "THREE";

import { Main, AddDebug, GUI, Sizes, Camera, EventEmitter } from "./All"
import RendererEffect from "./RendererEffect"

export default class Renderer extends EventEmitter {
    main: Main
    finalRender!: Function

    coreRenderer: CoreRenderer
    rendererEffect?: RendererEffect

    constructor(main: Main) {
        super()
        this.main = main

        // 渲染器
        this.coreRenderer = new CoreRenderer(this)
        // 添加效果器
        this.rendererEffect = new RendererEffect(this)
    }

    /**
     * 对接外部
     */
    onDestroy(onDestroy: Function) {
        this.on('destroy', onDestroy)
    }

    destroy() {
        this.coreRenderer.instance.dispose()
        this.emit('destroy')
    }

    onResize(onResize: Function) {
        this.on('resize', onResize)
    }

    resize() {
        this.emit('resize')
    }

    update() {
        this.finalRender()
    }
}

export class CoreRenderer {
    renderer: Renderer
    main: Main
    canvas: HTMLElement
    sizes: Sizes
    scene: THREE.Scene
    camera: Camera

    constructor(renderer: Renderer) {
        this.renderer = renderer
        this.main = this.renderer.main
        this.canvas = this.main.canvas
        this.sizes = this.main.sizes
        this.scene = this.main.scene
        this.camera = this.main.camera
        // Debug
        this.renderToneMappingDebug = this.main.debug.addFolder('RenderToneMapping')
        //
        this.setInstance()
    }


    renderToneMappingDebug!: AddDebug/* , GUI */
    instance!: THREE.WebGLRenderer
    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true,
        })
        //this.instance.physicallyCorrectLights = true
        //this.instance.outputEncoding = THREE.sRGBEncoding
        //this.instance.toneMapping = THREE.ACESFilmicToneMapping// 调色输出
        this.instance.toneMappingExposure = 1 // 调色曝光强度
        //this.instance.shadowMap.enabled = true
        //this.instance.shadowMap.type = THREE.PCFShadowMap
        //this.instance.shadowMap.type = THREE.VSMShadowMap
        //this.instance.setClearColor(0xFFFFFF, 0.0)//不设置则透明
        this.resize()//代码复用

        // Debug
        this.renderToneMappingDebug((folder) => {
            folder.add(this.instance, 'toneMapping', {
                No: THREE.NoToneMapping,
                Linear: THREE.LinearToneMapping,
                Reinhard: THREE.ReinhardToneMapping,
                Cineon: THREE.CineonToneMapping,
                ACESFilmic: THREE.ACESFilmicToneMapping,
            }).onFinishChange(() => {
                this.instance.toneMapping = Number(this.instance.toneMapping)
            })
            folder.add(this.instance, 'toneMappingExposure').min(0).max(10).step(0.001)
        })

        // 植入
        this.renderer.onResize(this.resize)
        this.renderer.finalRender = this.render
    }

    resize = () => {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    render = () => {
        this.instance.render(this.scene, this.camera.instance)
    }
}
