import * as THREE from "THREE";

import { Debug, Sizes, Time, Resources, Camera, Renderer, World, sources } from "./All"

export default class Main {
    canvas: HTMLElement
    viewArea: HTMLElement
    sizes: Sizes
    time: Time
    scene: THREE.Scene
    resources: Resources
    camera: Camera
    renderer: Renderer
    world: World
    //
    isPlayAnimation = true
    //
    debug: Debug

    constructor(canvas: HTMLElement, viewArea: HTMLElement) {
        // Options
        this.canvas = canvas;
        this.viewArea = viewArea;

        //Debug
        this.debug = new Debug(this)

        // Setuo
        this.sizes = new Sizes(viewArea)
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera(this)
        this.renderer = new Renderer(this)
        this.world = new World(this)

        // Sizes resize event
        this.sizes.onResize(() => this.resize())

        // Time tick event
        this.time.onTick(() => this.update())

    }

    resize() {
        this.camera.resize()
        this.world.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    render() {
        this.time.tick()
    }

    destroy() {
        // Important destroy
        this.sizes.destroy()
        this.time.destroy()
        this.renderer.destroy()
        this.camera.controls.dispose()

        // Debug destroy
        this.debug.destroy()

        // Traverse the whole scene
        this.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose()
                for (const key in child.material) {
                    const value = child.material[key]
                    if (value && typeof value.dispose === 'function') {
                        value.dispose()
                    }
                }
            }
        })
    }
}