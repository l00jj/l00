import * as THREE from "THREE";

import { Main, Sizes, Camera } from "./All"

export default class Renderer {
    main: Main
    canvas: HTMLElement
    sizes: Sizes
    scene: THREE.Scene
    camera: Camera

    instance!: THREE.WebGLRenderer

    constructor(main: Main) {
        this.main = main
        this.canvas = this.main.canvas
        this.sizes = this.main.sizes
        this.scene = this.main.scene
        this.camera = this.main.camera

        this.setInstance()
    }
    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: false,
        })
        //this.instance.physicallyCorrectLights = true
        this.instance.outputEncoding = THREE.sRGBEncoding
        //this.instance.toneMapping = THREE.CineonToneMapping
        //this.instance.toneMappingExposure = 1.75
        //this.instance.shadowMap.enabled = true
        //this.instance.shadowMap.type = THREE.PCFShadowMap
        //this.instance.setClearColor('#211d20')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    update() {
        this.instance.render(this.scene, this.camera.instance)
    }
}